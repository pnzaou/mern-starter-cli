#!/usr/bin/env node

/**
 * CLI MERN Generator
 * ------------------
 * Outil en ligne de commande permettant de générer automatiquement
 * un projet MERN complet (Backend Express + Frontend React/Vite).
 *
 * - Initialisation du projet
 * - Création du backend
 * - Création du frontend
 * - Mise à jour des dépendances
 */


const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const program = new Command();

program
  .version('1.0.0')
  .description('CLI pour créer un projet MERN stack complet');

/**
 * Commande `create`
 * -----------------
 * Point d’entrée principal du CLI.
 *
 * Responsabilités :
 * - Vérifier les dépendances globales nécessaires
 * - Demander le nom du projet
 * - Créer l’arborescence du projet
 * - Initialiser le backend et le frontend
 */
program
  .command('create')
  .description('Créer un nouveau projet MERN')
  .action(async () => {
    try {
      // Vérifier si ncu est installé
      try {
        execSync('ncu --version', { stdio: 'ignore' });
      } catch (error) {
        console.log(chalk.yellow('\n⚠️  npm-check-updates n\'est pas installé.'));
        console.log(chalk.cyan('Installation en cours...\n'));
        execSync('npm install -g npm-check-updates', { stdio: 'inherit' });
      }

      // Demander le nom du projet
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Quel est le nom de votre projet ?',
          validate: (input) => {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Le nom du projet ne peut contenir que des lettres, chiffres, tirets et underscores';
          }
        }
      ]);

      const projectName = answers.projectName;
      const projectPath = path.join(process.cwd(), projectName);

      // Vérifier si le dossier existe déjà
      if (fs.existsSync(projectPath)) {
        console.log(chalk.red(`❌ Le dossier ${projectName} existe déjà!`));
        return;
      }

      console.log(chalk.cyan(`\n🚀 Création du projet ${projectName}...\n`));

      // Créer la structure de base
      fs.mkdirSync(projectPath);
      fs.mkdirSync(path.join(projectPath, 'client'));
      fs.mkdirSync(path.join(projectPath, 'server'));

      // Créer le backend
      await createBackend(projectPath, projectName);

      // Créer le frontend
      await createFrontend(projectPath, projectName);

      console.log(chalk.green(`\n✅ Projet ${projectName} créé avec succès!\n`));
      console.log(chalk.cyan('Pour démarrer:'));
      console.log(chalk.white(`  cd ${projectName}/server && npm install && npm run dev`));
      console.log(chalk.white(`  cd ${projectName}/client && npm install && npm run dev`));

    } catch (error) {
      console.error(chalk.red('Erreur:', error.message));
    }
  });


  /**
 * Crée et configure la partie backend du projet MERN.
 *
 * - Copie les templates serveur
 * - Génère le package.json backend
 * - Configure les scripts et dépendances
 * - Met à jour les packages via npm-check-updates
 *
 * @param {string} projectPath Chemin racine du projet
 * @param {string} projectName Nom du projet
 */
async function createBackend(projectPath, projectName) {
  const spinner = ora('Création du backend...').start();
  
  const serverPath = path.join(projectPath, 'server');
  const templatesPath = path.join(__dirname, '..', 'templates', 'server');

  fs.copySync(templatesPath, serverPath);

  if (fs.existsSync(path.join(serverPath, 'gitignore.txt'))) {
    fs.renameSync(
      path.join(serverPath, 'gitignore.txt'),
      path.join(serverPath, '.gitignore')
    );
  }

  const packageJson = {
    name: `${projectName}-server`,
    version: '1.0.0',
    description: 'Backend MERN',
    main: 'src/server.js',
    scripts: {
      start: 'node src/server.js',
      dev: 'nodemon src/server.js',
      test: 'jest --watchAll --verbose',
      'test:coverage': 'jest --coverage'
    },
    dependencies: {
      express: '^4.18.2',
      mongoose: '^8.0.0',
      dotenv: '^16.3.1',
      cors: '^2.8.5',
      helmet: '^7.1.0',
      bcryptjs: '^2.4.3',
      jsonwebtoken: '^9.0.2',
      'express-validator': '^7.0.1',
      morgan: '^1.10.0',
      compression: '^1.7.4',
      'swagger-jsdoc': '^6.2.8',
      'swagger-ui-express': '^5.0.0',
      csurf: '^1.11.0',
      'cookie-parser': '^1.4.6',
      resend: '^3.0.0',
      crypto: '^1.0.1'
    },
    devDependencies: {
      nodemon: '^3.0.1',
      jest: '^29.7.0',
      supertest: '^6.3.3',
      '@types/jest': '^29.5.5'
    },
    jest: {
      testEnvironment: 'node',
      coveragePathIgnorePatterns: ['/node_modules/']
    }
  };

  fs.writeJsonSync(path.join(serverPath, 'package.json'), packageJson, { spaces: 2 });

  spinner.text = 'Mise à jour des packages backend vers les dernières versions...';
  try {
    process.chdir(serverPath);
    execSync('ncu -u', { stdio: 'inherit' });
    spinner.succeed('Backend créé avec les packages à jour!');
  } catch (error) {
    spinner.warn('Backend créé (erreur lors de la mise à jour des packages)');
  }
}

/**
 * Crée et configure la partie frontend du projet MERN.
 *
 * - Génère un projet React avec Vite
 * - Installe Tailwind CSS et dépendances courantes
 * - Configure Vite et les alias
 * - Initialise shadcn/ui et ses composants
 *
 * @param {string} projectPath Chemin racine du projet
 * @param {string} projectName Nom du projet
 */
async function createFrontend(projectPath, projectName) {
  const spinner = ora('Création du frontend avec Vite...').start();
  
  const clientPath = path.join(projectPath, 'client');

  try {
    process.chdir(projectPath);
    
    spinner.text = 'Création du projet Vite...';
    execSync(`npm create vite@latest client -- --template react`, {
      stdio: 'pipe',
      input: 'n\nn\n'
    });
    
    process.chdir(clientPath);

    spinner.text = 'Configuration de .npmrc...';
    fs.writeFileSync(path.join(clientPath, '.npmrc'), 'legacy-peer-deps=true\n');

    spinner.text = 'Installation des dépendances de base...';
    execSync('npm install', { stdio: 'inherit' });

    spinner.text = 'Installation de Tailwind CSS...';
    execSync('npm install tailwindcss @tailwindcss/vite', { stdio: 'inherit' });

    spinner.text = 'Installation des packages additionnels...';
    execSync('npm install react-router-dom react-hook-form @hookform/resolvers yup react-hot-toast @reduxjs/toolkit react-redux axios', {
      stdio: 'inherit'
    });

    spinner.text = 'Mise à jour des packages vers les dernières versions...';
    try {
      execSync('ncu -u', { stdio: 'inherit' });
    } catch (error) {
      spinner.warn('Packages installés (certaines mises à jour ont échoué)');
    }

    spinner.text = 'Configuration de jsconfig.json...';
    const jsconfigContent = {
      files: [],
      references: [],
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@/*': ['./src/*']
        }
      }
    };
    fs.writeJsonSync(path.join(clientPath, 'jsconfig.json'), jsconfigContent, { spaces: 2 });

    spinner.text = 'Configuration de Vite...';
    const viteConfig = `import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
`;
    fs.writeFileSync(path.join(clientPath, 'vite.config.js'), viteConfig);

    spinner.text = 'Configuration de Tailwind CSS...';
    const indexCss = `@import "tailwindcss";
`;
    fs.writeFileSync(path.join(clientPath, 'src/index.css'), indexCss);

    console.log(chalk.cyan('\n📦 Initialisation de shadcn/ui...'));
    console.log(chalk.yellow('⚠️  Vous allez être invité à choisir une couleur de base.'));
    console.log(chalk.white('   Recommandation: choisissez "Neutral" ou "Slate"\n'));
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    spinner.text = 'Initialisation de shadcn/ui...';
    try {
      execSync('npx shadcn@latest init -y', { 
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' }
      });
    } catch (error) {
      console.log(chalk.yellow('\n⚠️  Erreur lors de l\'initialisation automatique de shadcn'));
      console.log(chalk.cyan('Vous devrez peut-être exécuter manuellement: npx shadcn@latest init\n'));
    }

    spinner.text = 'Installation des composants shadcn/ui...';
    try {
      execSync('npx shadcn@latest add button input label card -y', { 
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' }
      });
    } catch (error) {
      console.log(chalk.yellow('\n⚠️  Erreur lors de l\'ajout des composants shadcn'));
      console.log(chalk.cyan('Vous devrez peut-être exécuter manuellement: npx shadcn@latest add button input label card\n'));
    }

    spinner.text = 'Copie des templates frontend...';
    const frontendTemplatesPath = path.join(__dirname, '..', 'templates', 'client');
    if (fs.existsSync(frontendTemplatesPath)) {
      const srcPath = path.join(frontendTemplatesPath, 'src');
      if (fs.existsSync(srcPath)) {
        const foldersToCreate = ['api', 'pages', 'store', 'slices', 'schemas', 'lib'];
        foldersToCreate.forEach(folder => {
          const sourcePath = path.join(srcPath, folder);
          const destPath = path.join(clientPath, 'src', folder);
          if (fs.existsSync(sourcePath)) {
            fs.copySync(sourcePath, destPath, { overwrite: true });
          }
        });

        ['App.jsx', 'main.jsx'].forEach(file => {
          const sourceFile = path.join(srcPath, file);
          const destFile = path.join(clientPath, 'src', file);
          if (fs.existsSync(sourceFile)) {
            fs.copySync(sourceFile, destFile, { overwrite: true });
          }
        });
      }

      const envExample = path.join(frontendTemplatesPath, '.env.example');
      if (fs.existsSync(envExample)) {
        fs.copySync(envExample, path.join(clientPath, '.env.example'));
      }

      if (fs.existsSync(path.join(clientPath, 'npmrc.txt'))) {
        fs.renameSync(
          path.join(clientPath, 'npmrc.txt'),
          path.join(clientPath, '.npmrc')
        );
      }
    }

    spinner.succeed('Frontend créé avec shadcn/ui!');
  } catch (error) {
    spinner.fail('Erreur lors de la création du frontend');
    throw error;
  }
}


/**
 * Lance l’exécution du CLI
 * Analyse les arguments passés en ligne de commande
 */
program.parse(process.argv);