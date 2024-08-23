import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';

import Hero from './Hero';
import Properties from './Properties';
import { useEffect, useState } from 'react';
import { getAllProperties } from '../../redux/realtor/propertiesSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { allProperties, loading, allMetadata } = useSelector(
    (state) => state.properties
  );
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [propertyType, setPropertyType] = useState('');

  useEffect(() => {
    dispatch(
      getAllProperties({ search, page, limit, state, country, propertyType })
    );
  }, [dispatch, search, limit, page, state, country, propertyType]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className=' max-h-[768px] '>
      <Layout>
        <Hero handleSearch={handleSearch} />
        <Properties
          allProperties={allProperties}
          loading={loading}
          allMetadata={allMetadata}
          page={page}
          setPage={setPage}
        />
        {/* <Banner /> */}
        {/* <Gallery /> */}
      </Layout>
    </div>
  );
};

export default HomePage;
