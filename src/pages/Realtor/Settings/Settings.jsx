import { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import {
  changePassword,
  deleteProfile,
} from '../../../redux/realtor/authSlice';
import {
  showErrorMessage,
  showToastMessage,
} from '../../../components/toast/toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';

const Settings = () => {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });
  const handlePasswordChange = (data) => {
    const submitData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    setLoading(true);
    dispatch(changePassword(submitData))
      .unwrap()
      .then(() => {
        setLoading(false);
        showToastMessage('Password changed successfully');
        setOpenPasswordModal(false);
      })
      .catch((err) => {
        setLoading(false);
        showErrorMessage(
          err?.response?.data?.message || 'Failed to change password'
        );
      });
  };
  const handleProfileDelete = () => {
    setLoading(true);
    dispatch(deleteProfile())
      .unwrap()
      .then(() => {
        setLoading(false);
        showToastMessage('Account deleted successfully');
        localStorage.clear();
        window.location.reload();
        setTimeout(() => {
          navigate(ROUTES.login);
        }, 400);
      })
      .catch((err) => {
        setLoading(false);
        showErrorMessage(
          err?.response?.data?.message || 'Failed to delete account'
        );
      });
  };
  return (
    <Layout>
      <Card className='w-[90%] max-w-lg mx-auto px-10 py-8 my-10'>
        <Typography>Settings</Typography>
        <div>
          <div
            onClick={() => setOpenPasswordModal(true)}
            className='mt-4 bg-[#f1f1f1] px-4 py-2 cursor-pointer'
          >
            <Typography>Change password</Typography>
          </div>
          <div
            onClick={() => setOpenDeleteModal(true)}
            className='mt-4 bg-red-500 text-white px-4 py-2 cursor-pointer'
          >
            <Typography>Delete Account</Typography>
          </div>
        </div>
      </Card>
      <Dialog size='xs' open={openPasswordModal} handler={setOpenPasswordModal}>
        <Toaster />
        <form
          onSubmit={handleSubmit(handlePasswordChange)}
          className='w-[80%] mx-auto'
        >
          <DialogHeader>Change Password</DialogHeader>
          <DialogBody className='grid gap-4'>
            <Input
              type='text'
              size='lg'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              label='CurrentPassword'
              {...register('oldPassword')}
            />
            <Input
              type='text'
              size='lg'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900 '
              label='New Password'
              {...register('newPassword')}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant='text'
              color='red'
              onClick={() => setOpenPasswordModal(false)}
              className='mr-1'
            >
              <span>Cancel</span>
            </Button>
            <Button variant='gradient' type='submit'>
              {loading ? <Spinner size='sm' /> : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      <Dialog size='xs' open={openDeleteModal} handler={setOpenDeleteModal}>
        <Toaster />

        <DialogHeader>Delete Profile</DialogHeader>
        <DialogBody className='grid gap-4'>
          Are you sure you want to delete profile? You will lose all uploaded
          properties and there&apos;s no recovery!
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={() => setOpenDeleteModal(false)}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='red' onClick={handleProfileDelete}>
            {loading ? <Spinner size='sm' /> : 'Delete'}
          </Button>
        </DialogFooter>
      </Dialog>
    </Layout>
  );
};

export default Settings;
