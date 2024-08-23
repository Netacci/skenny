import Layout from '../../components/layout/Layout';
import Banner from './Banner';
import Gallery from './Gallery';
import Hero from './Hero';
import Properties from './Properties';

const About = () => {
  return (
    <div className=' max-h-[768px] '>
      <Layout>
        <Hero />
        {/* <Properties /> */}
        <Banner />
        <Gallery />
      </Layout>
    </div>
  );
};

export default About;
