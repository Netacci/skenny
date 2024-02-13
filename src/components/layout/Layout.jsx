// import { Footer } from './footer/Footer';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
// import Meta from '../Meta';
import { AnimatePresence, motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <AnimatePresence>
      <div className=' '>
        {/* <Meta /> */}
        <Navbar />
        <motion.main
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
          className='bg-primary-400'
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default Layout;
