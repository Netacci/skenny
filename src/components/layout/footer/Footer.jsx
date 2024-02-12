// import { Container } from '../../container';
// import { Copyright } from './Copyright';
// import { FooterMenu } from './FooterMenu';
// import ctl from '@netlify/classnames-template-literals';

const Footer = () => {
  return (
    <>
      <footer>
        <img
          src='/homepage/footer-circle.png'
          // className={`${footerCircleStyle} -top-[86px] `}
          alt='cirlce on hero'
        />
        <img
          src='/homepage/footer-circle.png'
          // className={`${footerCircleStyle} -top-[21px]`}
          alt='cirlce on hero'
        />
        {/* <Container className='pt-20'>
          <FooterMenu />
          <hr />
          <Copyright />
        </Container> */}
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
