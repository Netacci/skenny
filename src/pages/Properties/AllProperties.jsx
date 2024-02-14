import Layout from '../../components/layout/Layout';
import { properties } from '../../config/properties';
import PropertyCard from '../../components/PropertyCard';

const AllProperties = () => {
  return (
    <div className=' max-h-[768px] '>
      <Layout>
        <div className='flex flex-wrap gap-4 px-4 lg:px-14 py-12 justify-center lg:justify-start'>
          {properties.map((property, index) => (
            <PropertyCard
              key={`property_${index}`}
              title={property.title}
              description={property.description}
              image={property.image}
              location={property.location}
              purpose={property.purpose}
              id={property.id}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default AllProperties;
