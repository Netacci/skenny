import { Typography } from '@material-tailwind/react';
import PropertyCard from '../../components/PropertyCard';

const Properties = () => {
  const properties = [
    {
      title: 'RM Plaza in Anambra',
      description:
        'RM Plaza is a business hub in Anambra state under one of our property management portfolios',
      image: (
        <img
          className='h-[288px] w-full'
          src='src/assets/anambra.jpeg'
          alt='house in anambra'
        />
      ),
    },
    {
      title: 'Property in Abuja',
      description:
        'Clusters of our property development investment under build and sale.',
      image: <img src='src/assets/uncompleted.jpeg' alt='house in abuja' />,
    },
    {
      title: 'Property in Abuja',
      description: 'Located in Abuja',
      image: <img src='src/assets/maralago.jpeg' alt='house in anambra' />,
    },
  ];
  return (
    <div className='px-4 lg:px-14 mt-10'>
      {' '}
      <Typography variant='h2' color='blue-gray' className='mb-2 text-center'>
        Available Properties
      </Typography>
      <div className='flex flex-wrap gap-4'>
        {properties.map((property, index) => (
          <PropertyCard
            key={`property_${index}`}
            title={property.title}
            description={property.description}
            image={property.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Properties;
