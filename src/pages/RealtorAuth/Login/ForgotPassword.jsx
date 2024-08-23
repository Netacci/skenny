import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import Layout from '../../../components/layout/Layout';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { showToastMessage } from '../../../components/toast/toast';
import { forgotPassword } from '../../../redux/realtor/authSlice';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const handleForgotPassword = (data) => {
    const submitData = {
      email: data.email,
    };
    setLoading(true);
    dispatch(forgotPassword(submitData))
      .unwrap()
      .then(() => {
        setLoading(false);
        showToastMessage('Password Reset Email Sent');
        setIsEmailSent(true);
      })
      .catch(() => {
        setLoading(false);
        showToastMessage('Password Reset Email Sent');
      });
  };
  const handleRedirect = () => {
    navigate('/login');
    setIsEmailSent(false);
  };
  return (
    <Layout auth>
      <Toaster />
      {isEmailSent ? (
        <Card
          color='transparent'
          shadow={false}
          className='w-full lg:w-[50%] max-w-md p-8 lg:p-0 mx-auto  my-10'
        >
          <Typography variant='h4' className='my-4'>
            Password Reset
          </Typography>
          <Typography className='text-sm text-blue-gray-500 mb-4'>
            {' '}
            We have sent a password reset link to your email. Please check your
            inbox.
          </Typography>
          <Button className='mt-6 w-full' onClick={handleRedirect}>
            Back to Login
          </Button>
        </Card>
      ) : (
        <Card
          color='transparent'
          shadow={false}
          className='w-full lg:w-[50%] max-w-md p-8 lg:p-0 mx-auto  my-10'
        >
          <Typography variant='h4' className='my-4'>
            Forgot Password
          </Typography>
          <Typography className='text-sm text-blue-gray-500 mb-4'>
            {' '}
            Enter the email address you registered with and we will send you a
            link to create a new password.
          </Typography>
          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <Input
              size='lg'
              placeholder='name@mail.com'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900 w-full'
              type='email'
              name='email'
              label='Email'
              {...register('email')}
            />
            <Button className='mt-6 w-full' type='submit'>
              {loading ? <Spinner size='sm' color='white' /> : 'Submit'}
            </Button>
          </form>
        </Card>
      )}
    </Layout>
  );
};

export default ForgotPassword;
