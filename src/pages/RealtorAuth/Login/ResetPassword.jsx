import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import Layout from '../../../components/layout/Layout';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../../redux/realtor/authSlice';
import {
  showErrorMessage,
  showToastMessage,
} from '../../../components/toast/toast';
import { Toaster } from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      password: '',
    },
  });
  const handleResetPassword = (data) => {
    // send password and token
    const submitData = {
      password: data.password,
      token,
    };
    setLoading(true);
    dispatch(resetPassword(submitData))
      .unwrap()
      .then(() => {
        setLoading(false);
        showToastMessage('Password Reset Successful');
        navigate('/login');
      })
      .catch((err) => {
        setLoading(false);
        showErrorMessage(err.message || 'Password Reset Failed');
      });
  };
  return (
    <Layout auth>
      <Toaster />
      <Card
        color='transparent'
        shadow={false}
        className='w-full lg:w-[50%] max-w-md p-8 lg:p-0 mx-auto  my-10'
      >
        <Typography variant='h4' className='my-4'>
          Reset Password
        </Typography>
        <Typography className='text-sm text-blue-gray-500 mb-4'>
          {' '}
          Enter a new password
        </Typography>
        <form onSubmit={handleSubmit(handleResetPassword)}>
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
          <Button className='mt-6 w-full' type='submit'>
            {loading ? <Spinner color='white' size='sm' /> : 'Submit'}
          </Button>
        </form>
      </Card>
    </Layout>
  );
};

export default ResetPassword;
