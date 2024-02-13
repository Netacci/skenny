// import { Container } from '../../container';
// import { Copyright } from './Copyright';
// import { FooterMenu } from './FooterMenu';
// import ctl from '@netlify/classnames-template-literals';
import { Typography } from '@material-tailwind/react';

const Footer = () => {
  return (
    <>
      <footer className='bg-[#0a2233] px-4 lg:px-14 py-10 flex justify-between'>
        <div>
          <Typography variant='h2' color='white' className='mb-2 '>
            SKENNY HEIGHTS
          </Typography>
          <Typography variant='p' color='white' className='mb-2 text-[16px] '>
            SKENNY HEIGHTS is a real estate located in UK
          </Typography>
        </div>
        <div>
          <Typography variant='h4' color='white' className='mb-2 '>
            Contact Us
          </Typography>
          <div className='mt-4 '>
            <Typography variant='p' color='white' className='mb-2 text-[16px] '>
              123 Uk lane, UK 123 Uk lane, UK 123 Uk lane, UK
            </Typography>
            <Typography
              as='a'
              href='tel:234567889990'
              color='white'
              className='mb-2 text-[16px] '
            >
              {' '}
              234567889990
            </Typography>
            <Typography
              as='a'
              href='mailto:info@skenny.org'
              color='white'
              className='mb-2 text-[16px] '
            >
              {' '}
              info@skenny.org
            </Typography>
          </div>
        </div>
        <div>
          <Typography variant='h4' color='white' className='mb-2 '>
            Follow Us
          </Typography>
          <div className='mt-4'>
            <Typography variant='p' color='white' className='mb-2 text-[16px] '>
              {' '}
              123 Uk lane, UK
            </Typography>
          </div>
        </div>
      </footer>
    </>
  );
};

// const footerWrapperStyle = ctl(`
// bg-primary-300
// pb-10
// relative
// overflow-hidden
// `);
// const footerCircleStyle = ctl(`
// absolute
// opacity-[0.04]
// right-0

// `);
export default Footer;
