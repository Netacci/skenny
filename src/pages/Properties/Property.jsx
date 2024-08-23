import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Card, Spinner } from '@material-tailwind/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Icon } from '@iconify/react';
import { ROUTES } from '../../utils/routes';
import { getSingleProperty } from '../../redux/realtor/propertiesSlice';
import SingleProperty from '../../components/SingleProperty';

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
        <Card className='  bg-opacity-20  px-4 py-2 lg:px-14 lg:py-4'>
          <div className='flex justify-between items-center'>
            <Icon
              icon='material-symbols:arrow-back'
              fontSize={24}
              className='cursor-pointer text-blue-900'
              onClick={() => navigate(ROUTES.home)}
            />
          </div>

          <SingleProperty property={singleProperty} />
        </Card>
      ) : (
        <div className=' flex flex-col items-center justify-center h-screen'>
          <Spinner />
        </div>
      )}
    </Layout>
  );
};

export default Property;
