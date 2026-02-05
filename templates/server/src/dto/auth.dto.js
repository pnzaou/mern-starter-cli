class RegisterDTO {
  constructor(data) {
    this.nom = data.nom?.trim();
    this.email = data.email?.toLowerCase().trim();
    this.password = data.password;
  }

  static validate(data) {
    const errors = [];
    
    if (!data.nom || data.nom.trim().length === 0) {
      errors.push({ field: 'nom', message: 'Le nom est requis' });
    }
    
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push({ field: 'email', message: 'Email invalide' });
    }
    
    if (!data.password || data.password.length < 6) {
      errors.push({ field: 'password', message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }
    
    return errors;
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

class LoginDTO {
  constructor(data) {
    this.email = data.email?.toLowerCase().trim();
    this.password = data.password;
  }
}

class UpdateProfileDTO {
  constructor(data) {
    this.nom = data.nom?.trim();
    this.email = data.email?.toLowerCase().trim();
  }
}

class ChangePasswordDTO {
  constructor(data) {
    this.currentPassword = data.currentPassword;
    this.newPassword = data.newPassword;
  }
}

class ForgotPasswordDTO {
  constructor(data) {
    this.email = data.email?.toLowerCase().trim();
  }
}

class ResetPasswordDTO {
  constructor(data) {
    this.token = data.token;
    this.password = data.password;
  }
}

module.exports = {
  RegisterDTO,
  LoginDTO,
  UpdateProfileDTO,
  ChangePasswordDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
};