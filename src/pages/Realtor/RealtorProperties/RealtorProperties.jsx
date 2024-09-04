import { useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtorProperties } from '../../../redux/realtor/propertiesSlice';
import {
  Card,
  Input,
  Spinner,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  Checkbox,
} from '@material-tailwind/react';
import Properties from './components/Properties';
import { Icon } from '@iconify/react';
import { states } from '../../../utils/states';

const RealtorProperties = () => {
  const dispatch = useDispatch();
  const { properties, metadata, loading } = useSelector(
    (state) => state.properties
  );
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [propertyType, setPropertyType] = useState('');

  useEffect(() => {
    dispatch(
      getRealtorProperties({
        search,
        page,
        limit,
        state,
        country,
        propertyType,
      })
    );
  }, [dispatch, search, page, limit, state, country, propertyType]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const propertyTypeList = [
    'House',
    'Apartment',
    'TownHouse',
    'PentHouse',
    'Bungalow',
    'Duplex',
    'Flat',
    'Land',
    'Office',
  ];
  return (
    <Layout>
      <div className='flex justify-between mt-6 px-4 lg:px-14'>
        <div className='w-[60%]  '>
          <Input
            type='search'
            placeholder='Search for properties...'
            className='pr-12 rounded-full bg-gray/90 text-gray-900 border-gray-900 '
            labelProps={{
              className: 'hidden',
            }}
            containerProps={{
              className: 'min-w-0',
            }}
            onChange={handleSearch}
            value={search}
          />
        </div>
        {/* <div className='w-[30%] flex items-center gap-4'>
          <Typography>Filter by</Typography>
          <div className='flex gap-2'>
            <Popover placement='bottom'>
              <PopoverHandler>
                <div className='flex items-center cursor-pointer'>
                  <Icon icon='mdi:filter' />
                  <Typography>State</Typography>
                </div>
              </PopoverHandler>
              <PopoverContent>
                {states.map((stateV) => (
                  <div key={stateV} className='flex gap-2 items-center'>
                    <Checkbox
                      value={stateV}
                      onChange={() => setState(stateV)}
                      checked={state === stateV}
                    />
                    <Typography>{stateV}</Typography>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <Popover placement='bottom'>
              <PopoverHandler>
                <div className='flex items-center cursor-pointer'>
                  <Icon icon='mdi:filter' />
                  <Typography>Country</Typography>
                </div>
              </PopoverHandler>
              <PopoverContent>
                {states.map((stateV) => (
                  <div key={stateV} className='flex gap-2 items-center'>
                    <Checkbox
                      value={stateV}
                      onChange={() => setCountry(stateV)}
                      checked={state === stateV}
                    />
                    <Typography>{stateV}</Typography>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <Popover placement='bottom'>
              <PopoverHandler>
                <div className='flex items-center cursor-pointer'>
                  <Icon icon='mdi:filter' />
                  <Typography>Property Type</Typography>
                </div>
              </PopoverHandler>
              <PopoverContent>
                {propertyTypeList.map((prop) => (
                  <div key={prop} className='flex gap-2 items-center'>
                    <Checkbox
                      value={prop}
                      onChange={() => setPropertyType(prop)}
                      checked={propertyType === prop}
                    />
                    <Typography>{prop}</Typography>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>

        
        </div> */}
      </div>

      <Card className=''>
        {loading ? (
          <div className='flex flex-col items-center justify-center h-screen'>
            <Spinner />
          </div>
        ) : properties && properties?.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-screen'>
            <Spinner />
            <h1 className='text-xl font-bold'>No Properties added!</h1>
          </div>
        ) : (
          <Properties
            properties={properties}
            metadata={metadata}
            page={page}
            setPage={setPage}
          />
        )}
      </Card>
    </Layout>
  );
};

export default RealtorProperties;
