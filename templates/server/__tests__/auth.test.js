/**
 * Tests d’intégration – Authentification
 * -------------------------------------
 * Ce fichier teste les endpoints d’authentification de l’API :
 * - Inscription d’un utilisateur
 * - Connexion d’un utilisateur
 *
 * Outils utilisés :
 * - Jest pour les tests
 * - Supertest pour les requêtes HTTP
 * - MongoDB (via Mongoose) pour la persistance
 */

const request = require('supertest');
const app = require('../src/server');
const User = require('../src/models/User');

/**
 * Groupe de tests principal pour les routes d’authentification
 */
describe('Auth Endpoints', () => {

  /**
   * Nettoyage de la collection User avant chaque test
   * afin de garantir l’indépendance des scénarios
   */
  beforeEach(async () => {
    await User.deleteMany({});
  });

  /**
   * Tests liés à l’inscription d’un utilisateur
   */
  describe('POST /api/auth/register', () => {

    /**
     * Cas nominal :
     * - Création d’un nouvel utilisateur
     * - Retour d’un token JWT
     */
    it('devrait créer un nouvel utilisateur', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          nom: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });

    /**
     * Cas d’erreur :
     * - Tentative d’inscription avec un email déjà existant
     */
    it('ne devrait pas créer un utilisateur avec un email existant', async () => {
      await User.create({
        nom: 'Existing User',
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          nom: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toBe(400);
    });
  });

  /**
   * Tests liés à la connexion d’un utilisateur
   */
  describe('POST /api/auth/login', () => {

    /**
     * Cas nominal :
     * - Connexion avec des identifiants valides
     * - Retour d’un token JWT
     */
    it('devrait connecter un utilisateur', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          nom: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });
});