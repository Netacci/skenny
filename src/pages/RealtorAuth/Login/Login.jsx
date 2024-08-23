import { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import {
  Button,
  Card,
  Typography,
  Input,
  Spinner,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/realtor/authSlice';
import {
  showErrorMessage,
  showToastMessage,
} from '../../../components/toast/toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { Toaster } from 'react-hot-toast';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const handleLogin = (data) => {
    setLoading(true);
    const submitData = {
      email: data.email,
      password: data.password,
    };
    dispatch(login(submitData))
      .unwrap()
      .then(() => {
        setLoading(false);
        showToastMessage('Login Successful');
        setTimeout(() => {
          navigate(ROUTES.realtorsProperties);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        showErrorMessage(
          err?.response?.data?.message || err?.response?.data || 'Login Failed'
        );
      });
  };
  return (
    <>
      <Layout auth>
        <Toaster />
        <Card
          color='transparent'
          shadow={false}
          className='w-full lg:w-[50%] max-w-md p-8 lg:p-0 mx-auto  my-10'
        >
          <Typography variant='h4' color='blue-gray'>
            Login
          </Typography>
          <Typography color='gray' className='mt-1 font-normal'>
            Enter your details to log in.
          </Typography>
          <form
            className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className='mb-1 flex flex-col gap-6'>
              <Input
                size='lg'
                placeholder='name@mail.com'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                type='email'
                name='email'
                label='Email'
                {...register('email')}
              />

              <Input
                type={showPassword ? 'text' : 'password'}
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                label='Password'
                icon={
                  showPassword ? (
                    <Typography
                      className='text-gray-400 cursor-pointer absolute right-2'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      Hide
                    </Typography>
                  ) : (
                    <Typography
                      className='text-gray-400 cursor-pointer absolute right-2'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      Show
                    </Typography>
                  )
                }
                {...register('password')}
              />
            </div>

            <Button type='submit' className='mt-6' fullWidth>
              {loading ? <Spinner /> : 'Log in'}
            </Button>
            <Typography color='gray' className='mt-4 text-center font-normal'>
              Don&apos;t have an account?{' '}
              <a href='/register' className='font-medium text-gray-900'>
                Register
              </a>
            </Typography>
            <Typography color='gray' className=' text-center font-normal'>
              <a href='/forgot-password' className='font-medium text-gray-900'>
                Forgot Password?
              </a>
            </Typography>
          </form>
        </Card>
      </Layout>
    </>
  );
};

export default Login;
