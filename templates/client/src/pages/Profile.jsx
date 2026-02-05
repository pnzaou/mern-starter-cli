import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { logout, loginSuccess } from '@/slices/authSlice';
import { authAPI } from '@/api/auth';
import { passwordSchema, profileSchema } from '@/schemas';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    setValue,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('nom', user.nom);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const onSubmitProfile = async (data) => {
    try {
      setLoadingProfile(true);
      const response = await authAPI.updateProfile(data);
      dispatch(loginSuccess({ ...response, token: localStorage.getItem('token') }));
      toast.success('Profil mis à jour avec succès !');
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la mise à jour';
      toast.error(message);
    } finally {
      setLoadingProfile(false);
    }
  };

  const onSubmitPassword = async (data) => {
    try {
      setLoadingPassword(true);
      await authAPI.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Mot de passe modifié avec succès !');
      resetPassword();
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la modification';
      toast.error(message);
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Informations du profil */}
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations de profil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom complet</Label>
                  <Input
                    id="nom"
                    type="text"
                    error={errorsProfile.nom}
                    {...registerProfile('nom')}
                  />
                  {errorsProfile.nom && (
                    <p className="text-sm text-destructive">{errorsProfile.nom.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    error={errorsProfile.email}
                    {...registerProfile('email')}
                  />
                  {errorsProfile.email && (
                    <p className="text-sm text-destructive">{errorsProfile.email.message}</p>
                  )}
                </div>

                <Button type="submit" disabled={loadingProfile}>
                  {loadingProfile ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Mise à jour...</span>
                    </div>
                  ) : (
                    'Mettre à jour le profil'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Changement de mot de passe */}
          <Card>
            <CardHeader>
              <CardTitle>Changer le mot de passe</CardTitle>
              <CardDescription>
                Modifiez votre mot de passe pour sécuriser votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    error={errorsPassword.currentPassword}
                    {...registerPassword('currentPassword')}
                  />
                  {errorsPassword.currentPassword && (
                    <p className="text-sm text-destructive">
                      {errorsPassword.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    error={errorsPassword.newPassword}
                    {...registerPassword('newPassword')}
                  />
                  {errorsPassword.newPassword && (
                    <p className="text-sm text-destructive">
                      {errorsPassword.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    error={errorsPassword.confirmPassword}
                    {...registerPassword('confirmPassword')}
                  />
                  {errorsPassword.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errorsPassword.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={loadingPassword}>
                  {loadingPassword ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Modification...</span>
                    </div>
                  ) : (
                    'Changer le mot de passe'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations du compte */}
          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">ID utilisateur :</span>
                  <span className="font-medium">{user?.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Compte créé le :</span>
                  <span className="font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;