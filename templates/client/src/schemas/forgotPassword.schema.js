import * as yup from 'yup';

export const forgotPasswordSchema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
});