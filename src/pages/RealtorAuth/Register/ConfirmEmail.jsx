import { useDispatch } from 'react-redux';
import Layout from '../../../components/layout/Layout';
import { Button, Spinner } from '@material-tailwind/react';
import { confirmEmail } from '../../../redux/realtor/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ROUTES } from '../../../utils/routes';
import {
  showErrorMessage,
  showToastMessage,
} from '../../../components/toast/toast';
import { Toaster } from 'react-hot-toast';

const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEmailVerification = () => {
    setLoading(true);
    dispatch(confirmEmail(token))
      .unwrap()
      .then(() => {
        setLoading(false);
        showToastMessage('Email Verified');
        setTimeout(() => {
          navigate(ROUTES.login);
        }, 300);
      })
      .catch((err) => {
        setLoading(false);
        showErrorMessage(
          err?.response?.data?.message || 'Failed to verify email'
        );
      });
  };
  return (
    <Layout auth>
      <Toaster />
      <div className='flex flex-col items-center justify-center py-20'>
        <h1 className='text-3xl font-bold mb-5'>
          Click button to verify email
        </h1>
        <Button onClick={handleEmailVerification}>
          {loading ? <Spinner color='white' size='sm' /> : 'Verify Email'}
        </Button>
      </div>
    </Layout>
  );
};

export default ConfirmEmail;
