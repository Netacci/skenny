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
import { ROUTES } from '../../../utils/routes';
import { Toaster } from 'react-hot-toast';
import {
  showErrorMessage,
  showToastMessage,
} from '../../../components/toast/toast';
import SingleProperty from '../../../components/SingleProperty';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

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
         <div className='max-w-7xl mx-auto px-4 py-6'>
        <div className='flex justify-between items-center mb-6'>
          <Button
            variant='text'
            className='flex items-center gap-2 text-blue-900 hover:bg-blue-50 px-3 py-2'
            onClick={() => navigate(ROUTES.realtorsProperties)}
          >
            <ArrowLeft size={20} />
            <span className='hidden sm:inline'>Back to Properties</span>
          </Button>

          <div className='flex items-center gap-2'>
            <Button
              variant='outlined'
              className='flex items-center gap-2 border-blue-900 text-blue-900 hover:bg-blue-50'
              onClick={handleEditRedirect}
            >
              <Edit size={16} />
              <span className='hidden sm:inline'>Edit</span>
            </Button>
            
            <Button
              variant='outlined'
              className='flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-50'
              onClick={handleDeleteModal}
            >
              <Trash2 size={16} />
              <span className='hidden sm:inline'>Delete</span>
            </Button>
          </div>
        </div>
        <Card className='bg-white shadow-lg overflow-hidden'>
          <div className='p-6'>
          <SingleProperty property={property} />
             </div>
        </Card>
        </div>
      ) : (
     <div className='flex justify-center items-center py-16'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
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
