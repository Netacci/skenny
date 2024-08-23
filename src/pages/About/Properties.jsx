import { Button, Typography } from '@material-tailwind/react';
import PropertyCard from '../../components/PropertyCard';
import { properties } from '../../config/properties';

const Properties = () => {
  return (
    <div className='px-4 lg:px-14 mt-10'>
      {' '}
      <Typography variant='h2' color='blue-gray' className='mb-2 text-center'>
        Management portfolio
      </Typography>
      <div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
        {properties.map((property, index) => (
          <PropertyCard
            key={`property_${index}`}
            title={property.title}
            description={property.description}
            image={property?.image}
            location={property.location}
            purpose={property.purpose}
            id={property.id}
          />
        ))}
      </div>
      <div className='text-center mx-auto my-6 w-max'>
        <a href='/properties'>
          <Button size='lg' color='deep-orange'>
            See All
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Properties;
