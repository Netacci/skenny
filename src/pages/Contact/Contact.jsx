import { Typography, Card, CardBody } from '@material-tailwind/react';
import Layout from '../../components/layout/Layout';

const Contact = () => {
  return (
    <div className=' max-h-[768px] '>
      <Layout>
        <div className='px-4 lg:px-14 py-12'>
          <Typography
            variant='h2'
            color='blue-gray'
            className='text-center text-2xl lg:text-4xl'
          >
            Contact Us
          </Typography>
          <Card className='w-full max-w-[48rem] mx-auto'>
            <CardBody>
              <Typography
                variant='h4'
                color='gray'
                className='mb-4  text-[21px] lg:text-3xl'
              >
                Let&apos;s talk
              </Typography>
              <Typography variant='h6' color='blue-gray' className='mb-2'>
                Our Location
              </Typography>
              <Typography color='gray' className='mb-8 font-normal'>
                334 Uk lane Uk lane Uk lane
              </Typography>
              <Typography variant='h6' color='blue-gray' className='mb-2'>
                Email address
              </Typography>
              <Typography
                as='a'
                href='mailto:info@skenny.org'
                color='gray'
                className='mb-8 font-normal'
              >
                info@skenny.org
              </Typography>
              <Typography variant='h6' color='blue-gray' className='mb-2'>
                Phone Number
              </Typography>
              <Typography
                as='a'
                href='tel:+447436354692'
                color='gray'
                className='mb-8 font-normal'
              >
                +447436354692
              </Typography>
              <Typography
                as='a'
                href='tel:+234803389926'
                color='gray'
                className='mb-8 font-normal'
              >
                +234803389926
              </Typography>
            </CardBody>
          </Card>
        </div>
      </Layout>
    </div>
  );
};

export default Contact;
