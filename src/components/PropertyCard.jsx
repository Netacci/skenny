/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  IconButton,
} from '@material-tailwind/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, link, realtor }) => {
  const {
    feature_image,
    property_name,
    // property_description,
    property_details,
    state,
    country,
    city,
    // address,
    status,

    id,
  } = property;
  const location = `${city}, ${state}, ${country}`;
  const navigate = useNavigate();

  return (
    <Card
      className='w-full max-w-[20rem] shadow-lg bg-[#ffffff] cursor-pointer'
      onClick={() => navigate(`${link}/${id}`)}
    >
      <CardHeader floated={false}>
        {/* TODO add a fallback image for when realtor doesnt have an image */}
        <img src={feature_image} alt='property image' />

        <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
        <IconButton
          size='sm'
          color='red'
          variant='text'
          className='!absolute top-4 right-4 rounded-full'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-6 w-6'
          >
            <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody>
        <Typography variant='h5' color='blue-gray' className='font-bold mb-3 '>
          {property_name}
        </Typography>

        {/* <Typography color='white'>{property_description}</Typography> */}
        {/* {property_details?.property_type ? (
          <Typography color='white' className='font-bold mt-2'>
            Property Type:{' '}
            <span className='font-medium'>
              {property_details?.property_type}
            </span>
          </Typography>
        ) : null} */}
        {property_details?.property_status ? (
          <Typography color='blue-gray' className='font-bold mt-2'>
            Property Availabilty:{' '}
            <span className='font-medium'>
              {property_details?.property_status}
            </span>
          </Typography>
        ) : null}
        <div className='flex flex-row mt-6 justify-between'>
          <Typography color='blue-gray' className='text-[15px] font-small mt-2'>
            {location}
          </Typography>
          <Typography
            color='blue-gray'
            className='text-[15px]  mt-2 font-small'
          >
            {property_details?.property_price}
          </Typography>
        </div>

        <div className=' mt-5 flex  flex-wrap items-center gap-6'>
          {/* <Tooltip content={location}>
            <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
              <Icon icon='carbon:location-filled' className='text-white' />
            </span>
          </Tooltip> */}
          {property_details?.property_beds ? (
            <Tooltip content={`${property_details?.property_beds} bedroom(s)`}>
              <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5  text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
                <Icon icon='material-symbols:bed' className='blue-gray' />
              </span>
            </Tooltip>
          ) : null}
          {property_details?.property_toilets ? (
            <Tooltip
              content={`${property_details?.property_toilets} toilet(s)`}
            >
              <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5  text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
                <Icon icon='ph:toilet-fill' className='blue-gray' />
              </span>
            </Tooltip>
          ) : null}
          {property_details?.property_baths ? (
            <Tooltip
              content={`${property_details?.property_baths} bathroom(s)`}
            >
              <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
                <Icon icon='fa:bath' className='blue-gray' />
              </span>
            </Tooltip>
          ) : null}
          {property_details?.property_area ? (
            <Tooltip content={property_details?.property_area}>
              <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
                <Icon icon='carbon:area' className='blue-gray' />
              </span>
            </Tooltip>
          ) : null}
        </div>
        {realtor ? (
          <div
            className={`mt-3 rounded-full px-4 py-1 w-fit ${
              status === 'pending'
                ? 'bg-yellow-800'
                : status === 'approved'
                ? 'bg-green-400'
                : 'bg-red-400'
            }`}
          >
            <Typography color='blue-gray' className='capitalize '>
              {status}
            </Typography>
          </div>
        ) : null}
      </CardBody>
      {/* <CardFooter className='pt-3'>
        <a href={`${link}/${id}`}>
          <Button size='lg' fullWidth={true}>
            See Details
          </Button>
        </a>
      </CardFooter> */}
    </Card>
  );
};

export default PropertyCard;
