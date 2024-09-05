/* eslint-disable react/prop-types */
import { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import {
  Avatar,
  Button,
  Card,
  Typography,
  Input,
  Select,
  Option,
  Spinner,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import countries from '../../../utils/countries.json';
import { states } from '../../../utils/states';
import { editProfile } from '../../../redux/realtor/authSlice';
import {
  showErrorMessage,
  showToastMessage,
} from '../../../components/toast/toast';
import { Toaster } from 'react-hot-toast';

const EditProfileForm = ({ setEditProfile, user }) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState(user?.country || 'Nigeria');
  const [state, setState] = useState(user?.state || '');
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      phone: user?.phone_number || '',
      address: user?.address || '',
      state: user?.state || '',
      country: user?.country || '',
    },
  });
  const handleEditProfile = (data) => {
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phone,
      address: data.address,
      state,
      country,
    };
    setLoading(true);

    dispatch(editProfile(payload))
      .unwrap()
      .then(() => {
        setEditProfile(false);
        setLoading(false);
        showToastMessage('Profile Updated');
      })
      .catch((err) => {
        setLoading(false);
        showErrorMessage(err.message || 'Failed to update profile, Try again!');
      });
  };
  return (
    <Card
      color='transparent'
      shadow={false}
      className='w-[90%] max-w-lg mx-auto px-10 py-8 my-10'
    >
      <Typography variant='h4' color='blue-gray'>
        Edit Profile
      </Typography>

      <form
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
        onSubmit={handleSubmit(handleEditProfile)}
      >
        <div className='mb-1 flex flex-col gap-6'>
          <Input
            size='lg'
            placeholder='name@mail.com'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            type='email'
            name='email'
            label='Email'
            disabled
          />
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
            type='text'
            name='phone'
            label='Phone Number'
            {...register('phone')}
          />

          <Input
            size='lg'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            type='text'
            name='address'
            label='Address'
            {...register('address')}
          />

          <Select
            {...register('country')}
            size='lg'
            label='Country'
            name='country'
            onChange={(country) => setCountry(country)}
            value={country}
          >
            {countries &&
              countries.map((item) => (
                <Option value={item.name} key={item.name} sx={{ py: '8px' }}>
                  {item.name}
                </Option>
              ))}
          </Select>

          {country === 'Nigeria' ? (
            <Select
              label='State'
              name='state'
              {...register('state')}
              onChange={(state) => setState(state)}
              value={state}
            >
              {states.map((item) => (
                <Option value={item} key={item} sx={{ py: '8px' }}>
                  {item}
                </Option>
              ))}
            </Select>
          ) : (
            <Input
              size='lg'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              type='text'
              name='state'
              label='State'
              {...register('state')}
            />
          )}
        </div>
        <div className='flex gap-2'>
          <Button
            className='mt-6'
            fullWidth
            onClick={() => setEditProfile(false)}
            variant='outlined'
          >
            Cancel
          </Button>
          <Button className='mt-6' fullWidth type='submit'>
            {loading ? <Spinner size='sm' color='white' /> : ' Update'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
const NormalRow = ({ setEditProfile, user }) => {
  return (
    <Card className='w-[90%] max-w-lg mx-auto px-10 py-8 my-10'>
      <div className='flex justify-between'>
        <Avatar
          variant='circular'
          size='md'
          alt='tania andrew'
          color='blue-gray'
          className=' p-0.5'
          src='https://docs.material-tailwind.com/img/face-2.jpg'
        />
        <Typography
          onClick={() => setEditProfile(true)}
          className='cursor-pointer'
        >
          Edit
        </Typography>
      </div>
      <div>
        <div className='bg-gray-100 px-4 py-1 border border-gray-300 mt-4 '>
          <Typography className='font-bold mt-2 '>Email</Typography>
          <Typography className='mt-1 '>{user?.email}</Typography>
        </div>
        <div className='bg-gray-100 px-4 py-1 border border-gray-300 mt-4 '>
          <Typography className='font-bold mt-2 '>First name</Typography>
          <Typography className='mt-1 '>{user?.first_name}</Typography>
        </div>
        <div className='bg-gray-100 px-4 py-1 border border-gray-300 mt-4 '>
          <Typography className='font-bold mt-2 '>Last name</Typography>
          <Typography className='mt-1 '>{user?.last_name}</Typography>
        </div>

        <div className='bg-gray-100 px-4 py-1 border border-gray-300 mt-4 '>
          <Typography className='font-bold mt-2 '>Phone Number</Typography>
          <Typography className='mt-1 '>{user?.phone_number}</Typography>
        </div>

        <div className='bg-gray-100 px-4 py-1 border border-gray-300 mt-4 '>
          <Typography className='font-bold mt-2 '>Location</Typography>
          <Typography className='mt-1 '>
            {user?.address}, {user?.state}, {user?.country}
          </Typography>
        </div>
      </div>
    </Card>
  );
};
const RealtorProfile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <Toaster />
      <div>
        {editProfile ? (
          <EditProfileForm setEditProfile={setEditProfile} user={user} />
        ) : (
          <NormalRow setEditProfile={setEditProfile} user={user} />
        )}
      </div>
    </Layout>
  );
};

export default RealtorProfile;
