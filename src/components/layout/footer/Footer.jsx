// import { Container } from '../../container';
// import { Copyright } from './Copyright';
// import { FooterMenu } from './FooterMenu';
// import ctl from '@netlify/classnames-template-literals';
import { Typography } from '@material-tailwind/react';
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <>
      <footer className='bg-[#4D4D4D] px-4 lg:px-14 pt-4 flex justify-between flex-col'>
        <div>
          {/* <Typography
            variant='h2'
            color='gray'
            className='mb-2 text-xl lg:text-2xl '
          >
            SKENNY HEIGHTS
          </Typography> */}
          <Typography
            variant='paragraph'
            color='white'
            className='lg:text-[15px] text-[14px] '
          >
            SKENNY HEIGHTS is a real estate located in UK
          </Typography>
        </div>

        <div className='mt-4 lg:mt-0 flex flex-col lg:flex-row gap-4'>
          <div className='flex items-center mb-2  gap-2'>
            {' '}
            <Icon icon='ion:location-outline' className='text-white' />{' '}
            <Typography
              variant='paragraph'
              color='white'
              className=' lg:text-[16px] text-[14px]'
            >
              123 Uk lane, UK 123 Uk lane, UK 123 Uk lane, UK
            </Typography>
          </div>
          <div className='flex items-center mb-2  gap-2'>
            {' '}
            <Icon icon='ph:phone-light' className='text-white' />
            <Typography
              as='a'
              href='tel:+447436354692'
              color='white'
              className='lg:text-[16px] text-[14px] '
            >
              {' '}
              +447436354692
            </Typography>
          </div>
          <div className='flex items-center mb-2  gap-2'>
            {' '}
            <Icon icon='ph:phone-light' className='text-white' />
            <Typography
              as='a'
              href='tel:+234803389926'
              color='white'
              className='lg:text-[16px] text-[14px] '
            >
              {' '}
              +234803389926
            </Typography>
          </div>
          <div className='flex items-center mb-2  gap-2'>
            <Icon
              icon='material-symbols-light:mail-outline'
              className='text-white'
            />
            <Typography
              as='a'
              href='mailto:info@skenny.org'
              color='white'
              className='lg:text-[16px] text-[14px] '
            >
              {' '}
              info@skenny.org
            </Typography>
          </div>

          <div className='mt-0 lg:mt-4 pb-6 flex flex-row gap-4'>
            <Icon icon='logos:facebook' />
            <Icon icon='skill-icons:instagram' />
            <Icon icon='skill-icons:twitter' />
            <Icon icon='skill-icons:linkedin' />
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
