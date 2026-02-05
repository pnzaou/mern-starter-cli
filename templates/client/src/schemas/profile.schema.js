import * as yup from 'yup';

export const profileSchema = yup.object({
  nom: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
});
