import * as yup from 'yup';

export const passwordSchema = yup.object({
  currentPassword: yup.string().required('Mot de passe actuel requis'),
  newPassword: yup
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Nouveau mot de passe requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Les mots de passe ne correspondent pas')
    .required('Confirmation requise'),
});