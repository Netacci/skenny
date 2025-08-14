import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Card } from '@material-tailwind/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { ROUTES } from '../../utils/routes';
import { getSingleProperty } from '../../redux/realtor/propertiesSlice';
import SingleProperty from '../../components/SingleProperty';
import { ArrowLeft } from 'lucide-react';

const Property = () => {
  const { singleProperty, loading } = useSelector((state) => state.properties);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {!loading ? (
          <div className='max-w-7xl mx-auto px-4 py-6'>
             <div className='flex justify-between items-center mb-6'>
              <Button
            variant='text'
            className='flex items-center gap-2 text-blue-900 hover:bg-blue-50 px-3 py-2'
            onClick={() => navigate(ROUTES.home)}
          >
            <ArrowLeft size={20} />
            <span className='hidden sm:inline'>Back to Properties</span>
          </Button>
          </div>
  <Card className='bg-white shadow-lg overflow-hidden'>
          <div className='p-6'>
          <SingleProperty property={singleProperty} />
               </div>
        </Card>
        </div>
      ) : (
        <div className='flex justify-center items-center py-16'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          </div>
      )}
    </Layout>
  );
};

export default Property;
