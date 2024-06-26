import React from 'react';
import { useForm } from 'react-hook-form';
import './RegisterForm.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import createUser from '../../services/register-services';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import userValidationSchema from '../../validations/userValidationSchema';
import Swal from 'sweetalert2';

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(userValidationSchema)});
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useUserContext();

  const onSubmit = async (data) => {
    try {
        const response = await createUser(data);
        console.log(response)
        localStorage.setItem('token', response.token);
        Swal.fire(`Te has registrado correctamente!, bienvenid@, ${response.newUser.name}!`);
        setUser(response.newUser.role)
        setIsAuthenticated(true)
        navigate('/home')// Redirige al usuario 
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }

    console.log(onSubmit)
  };
  return (
    <>
    <div className="container-form">
      <div className="image-container">
        <div className="logo"></div>
        <div className='title-container'>
          <p>Las noticias más interesantes del mundo Tech</p>
          <h1>TECHTODAY</h1>
        </div>
        <div className="image-side"></div>
      </div>

      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <h5>Registrate con</h5>
        <div className="social-login">
          <a href=""><GitHubIcon className='github-icon'/></a>
          <a href=""><AppleIcon className='apple-icon'/></a>
          <a href=""><GoogleIcon className='google-icon'/></a>
        </div>

        <h5 className='or-subtitle'></h5>

        <label>
          Nombre
          <input {...register('name')} required type="name" />
          {errors.name && <div className="text-error">{errors.title.name}</div>} 
        </label>

        <label>
          Email
          <input {...register('email')} required type="email" />
          {errors.email && <div className="text-error">{errors.email.message}</div>} 
        </label>

        <label>
          Contraseña
          <input {...register('password')} required type="password" />
          {errors.password && <div className="text-error">{errors.password.message}</div>}
          <p className='password-requirements'>Asegurate que tenga 8 caracteres o mas.<br/>
          Debe tener al menos un caracter especial y al menos un numero.
          </p>
        </label>
        
        <button type="submit">Registrarse</button>

        <div className='login-button'>
          ¿Tienes una cuenta? <a href="/"> Entra aquí</a>
        </div>
      </form>
    </div>
    </>
  );
};

export default RegisterForm;