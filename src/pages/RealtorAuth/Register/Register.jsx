import { Controller, useForm } from 'react-hook-form';
import Layout from '../../../components/layout/Layout';
import {
  Button,
  Card,
  Checkbox,
  Typography,
  Input,
  Select,
  Option,
  Spinner,
} from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { registerRealtor } from '../../../redux/realtor/authSlice';
import { useState } from 'react';
import {
  showErrorMessage,
  showToastMessage,
} from '../../../components/toast/toast';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      accountType: 'individual',
      phone: '',
    },
  });
  const dispatch = useDispatch();
  const handleRegister = (data) => {
    setLoading(true);
    const submitData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      account_type: data.accountType,
      phone_number: data.phone,
    };
    dispatch(registerRealtor(submitData))
      .unwrap()
      .then(() => {
        setLoading(false);
        showToastMessage('Registration Successful');
        setIsRegistered(true);
      })
      .catch((err) => {
        console.log(err);
        showErrorMessage(err?.response?.data?.message || 'Registration Failed');
        setLoading(false);
      });
  };
  const handleRedirect = () => {
    navigate('/login');
    setIsRegistered(false);
  };
  return (
    <>
      <Layout auth>
        <Toaster />
        {isRegistered ? (
          <Card
            color='transparent'
            shadow={false}
            className='text-center w-[50%] max-w-md p-0 mx-auto  my-20'
          >
            <Typography variant='h4' color='blue-gray'>
              Registration Successful!
            </Typography>
            <Typography color='gray' className='mt-2 font-normal text-[18px]'>
              Check your email for verification.
            </Typography>

            <Button
              variant='gradient'
              className='w-[50%] mx-auto mt-6'
              onClick={handleRedirect}
            >
              Login
            </Button>
            <Typography color='gray' className='mt-2 font-normal text-[16px]'>
              Did not receive email?{' '}
              <a href='#' className='font-small text-gray-900'>
                Resend Verification
              </a>
            </Typography>
          </Card>
        ) : (
          <Card
            color='transparent'
            shadow={false}
            className='w-full lg:w-[50%] max-w-md p-8 lg:p-0 mx-auto  my-10'
          >
            <Typography variant='h4' color='blue-gray'>
              Register
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              Nice to meet you! Enter your details to register.
            </Typography>
            <form
              className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
              onSubmit={handleSubmit(handleRegister)}
            >
              <div className='mb-1 flex flex-col gap-6'>
                <Input
                  size='lg'
                  className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                  label='First Name'
                  name='firstName'
                  type='text'
                  {...register('firstName')}
                />
                <Input
                  size='lg'
                  className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                  label='Last Name'
                  name='lastName'
                  type='text'
                  {...register('lastName')}
                />

                <Input
                  size='lg'
                  className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                  type='email'
                  name='email'
                  label='Email'
                  {...register('email')}
                />
                <Input
                  size='lg'
                  className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                  label='Phone Number'
                  name='phone'
                  type='text'
                  {...register('phone')}
                />
                <Controller
                  name='accountType'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label='Account Type'>
                      {/* <Option value='individual'>Individual</Option> */}
                      <Option value='realtor'>Realtor</Option>
                    </Select>
                  )}
                />
                {/* <Select
                name='accountType'
                label='Account Type'
                {...register('accountType')}
              >
                <Option value='individual'>Individual</Option>
                <Option value='realtor'>Realtor</Option>
              </Select> */}
                <Input
                  type={showPassword ? 'text' : 'password'}
                  size='lg'
                  className=' !border-t-blue-gray-200 focus:!border-t-gray-900 '
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
              <Checkbox
                label={
                  <Typography
                    variant='small'
                    color='gray'
                    className='flex items-center font-normal'
                  >
                    I agree the
                    <a
                      href='#'
                      className='font-medium transition-colors hover:text-gray-900'
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: '-ml-2.5' }}
              />
              <Button className='mt-6' fullWidth type='submit'>
                {loading ? <Spinner /> : 'Register'}
              </Button>
              <Typography color='gray' className='mt-4 text-center font-normal'>
                Already have an account?{' '}
                <a href='login' className='font-medium text-gray-900'>
                  Log In
                </a>
              </Typography>
            </form>
          </Card>
        )}
      </Layout>
    </>
  );
};

export default Register;
