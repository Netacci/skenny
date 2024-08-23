/* eslint-disable react/prop-types */
// import { Footer } from './footer/Footer';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
// import Meta from '../Meta';
import { AnimatePresence, motion } from 'framer-motion';

const Layout = ({ children, auth }) => {
  return (
    <AnimatePresence>
      <div className='flex flex-col min-h-screen'>
        {/* <Meta /> */}
        <Navbar />
        <motion.main
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
          className='bg-primary-400 flex-grow'
        >
          {children}
        </motion.main>
        {auth ? null : (
          <div className=''>
            <Footer />
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Layout;
