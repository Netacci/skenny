// import { Container } from '../../container';
// import { Copyright } from './Copyright';
// import { FooterMenu } from './FooterMenu';
// import ctl from '@netlify/classnames-template-literals';
import { Typography } from '@material-tailwind/react';
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <>
      <footer className='bg-gray-800 text-white py-8'>
        <div className='px-4 lg:px-14 mx-auto '>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>About Us</h3>
              <p>
                SKENNY HEIGHTS is a real estate company located in UK, dedicated
                to finding your dream home.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Links</h3>
              <ul>
                <li>
                  <a href='#' className='hover:text-blue-400'>
                    Pivacy policy
                  </a>
                </li>

                <li>
                  <a href='/about' className='hover:text-blue-400'>
                    Careers
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-blue-400'>
                    Terms and condition
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Contact</h3>
              <Typography>123 UK lane, UK 123 UK lane, UK</Typography>
              <Typography>+447436354692</Typography>
              <Typography>+234803389926</Typography>
              <Typography>info@skenny.org</Typography>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Newsletter</h3>
              <form>
                <input
                  type='email'
                  placeholder='Your email'
                  className='w-full p-2 rounded mb-2 text-gray-800'
                />
                <button
                  type='submit'
                  className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className='mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center'>
            <p>&copy; 2024 SKENNY HEIGHTS. All rights reserved.</p>
            <div className='flex space-x-4 mt-4 md:mt-0'>
              <a href='#' className='text-2xl hover:text-blue-400'>
                <Icon icon='logos:facebook' />
              </a>
              <a href='#' className='text-2xl hover:text-blue-400'>
                <Icon icon='skill-icons:instagram' />
              </a>
              <a href='#' className='text-2xl hover:text-blue-400'>
                <Icon icon='skill-icons:twitter' />
              </a>
              <a href='#' className='text-2xl hover:text-blue-400'>
                <Icon icon='skill-icons:linkedin' />
              </a>
            </div>
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
