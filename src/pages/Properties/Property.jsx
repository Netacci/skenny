/* eslint-disable react/prop-types */
import Layout from '../../components/layout/Layout';
import { Typography } from '@material-tailwind/react';
import { properties } from '../../config/properties';
import { useParams } from 'react-router-dom';

const Property = () => {
  const id = useParams().propertyId;

  const property = properties.find((property) => property.id === Number(id));

  const { title, description, image, location, purpose } = property;
  console.log(property);
  return (
    <div className=' max-h-[768px] '>
      <Layout>
        <div className='px-4 lg:px-14 py-12 '>
          <div className='w-[50%]'>{image}</div>

          <Typography variant='h2' color='blue-gray' className='mb-2 mt-6'>
            {title}
          </Typography>
          <Typography
            variant='p'
            color='blue-gray'
            className='mb-2 text-[16px] '
          >
            {description}
          </Typography>
          <Typography
            variant='p'
            color='blue-gray'
            className='mb-2 text-[16px] '
          >
            {location}
          </Typography>
          <Typography
            variant='p'
            color='blue-gray'
            className='mb-2 text-[16px] '
          >
            {purpose}
          </Typography>
        </div>
      </Layout>
    </div>
  );
};

export default Property;
