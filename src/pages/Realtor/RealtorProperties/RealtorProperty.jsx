import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  deleteRealtorProperty,
  editProperty,
  getSingleRealtorProperty,
} from '../../../redux/realtor/propertiesSlice';
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from '@material-tailwind/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Icon } from '@iconify/react';
import { ROUTES } from '../../../utils/routes';
import { Toaster } from 'react-hot-toast';
import {
  showErrorMessage,
  showToastMessage,
} from '../../../components/toast/toast';
import SingleProperty from '../../../components/SingleProperty';

const RealtorProperty = () => {
  const { property, loading } = useSelector((state) => state.properties);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const [openDeleteProperty, setDeleteProperty] = useState(false);

  const handleEditRedirect = () => {
    dispatch(editProperty(property));
    navigate(ROUTES.addNewListing);
  };
  const handleDeleteModal = () => {
    setDeleteProperty(true);
  };
  const handleDeleteProperty = () => {
    setIsDeleting(true);
    dispatch(deleteRealtorProperty(id))
      .unwrap()
      .then(() => {
        setIsDeleting(false);
        setDeleteProperty(false);
        navigate(ROUTES.realtorsProperties);
        showToastMessage('Property deleted successfully');
      })
      .catch((err) => {
        setIsDeleting(false);
        showErrorMessage(
          err?.response?.data?.message || 'Failed to delete property'
        );
        setDeleteProperty(false);
      });
  };

  useEffect(() => {
    dispatch(getSingleRealtorProperty(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {!loading ? (
        <Card className='  bg-opacity-20  px-4 py-2 lg:px-14 lg:py-4'>
          <div className='flex justify-between items-center'>
            <Icon
              icon='material-symbols:arrow-back'
              fontSize={24}
              className='cursor-pointer text-blue-900'
              onClick={() => navigate(ROUTES.realtorsProperties)}
            />
            <div className='flex items-center gap-4 justify-end'>
              <Icon
                icon='ic:baseline-edit'
                fontSize={24}
                className='cursor-pointer text-blue-900'
                onClick={handleEditRedirect}
              />
              <Icon
                icon='ic:baseline-delete'
                fontSize={24}
                className='cursor-pointer text-blue-900'
                onClick={handleDeleteModal}
              />
            </div>
          </div>
          <SingleProperty property={property} />
        </Card>
      ) : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <Spinner />
        </div>
      )}
      <Dialog size='xs' open={openDeleteProperty} handler={setDeleteProperty}>
        <Toaster />

        <DialogHeader>Delete Property</DialogHeader>
        <DialogBody className='grid gap-4'>
          Are you sure you want to delete property? This action cannot be
          undone!
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={() => setDeleteProperty(false)}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='red' onClick={handleDeleteProperty}>
            {isDeleting ? <Spinner size='sm' /> : 'Delete'}
          </Button>
        </DialogFooter>
      </Dialog>
    </Layout>
  );
};

export default RealtorProperty;
