import { Typography } from '@material-tailwind/react';

const Gallery = () => {
  const data = [
    {
      imageLink: '/assets/uncompleted.jpeg',
    },
    {
      imageLink: '/assets/anambra.jpeg',
    },
    {
      imageLink: '/assets/bath.jpeg',
    },
    {
      imageLink: '/assets/sitting.jpeg',
    },
    {
      imageLink: '/assets/outdoor.jpeg',
    },
    {
      imageLink: '/assets/bathroom.jpeg',
    },
    {
      imageLink: '/assets/maralago.jpeg',
    },
    {
      imageLink: '/assets/outdoor-overview.jpeg',
    },
    {
      imageLink: '/assets/out.jpeg',
    },
    {
      imageLink: '/assets/exteriorhouse.jpeg',
    },
    {
      imageLink: '/assets/bathrooom.jpeg',
    },
    {
      imageLink: '/assets/space.jpeg',
    },
    {
      imageLink: '/assets/wardrobe.jpeg',
    },
    {
      imageLink: '/assets/room.jpeg',
    },
  ];
  return (
    <div className='bg-[#f4f6f8] px-4 lg:px-14 py-12'>
      <Typography
        variant='h2'
        color='blue-gray'
        className='mb-2 text-center text-2xl lg:text-4xl'
      >
        Gallery
      </Typography>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6'>
        {data.map(({ imageLink }, index) => (
          <div key={index}>
            <img
              className='h-40 w-full max-w-full rounded-lg object-cover object-center'
              src={imageLink}
              alt='gallery-photo'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
