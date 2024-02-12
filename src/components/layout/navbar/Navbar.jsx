// import { useState } from 'react';

// import logo from '/public/logo.jpg';
// import { Icon } from '@iconify/react';
// import ctl from '@netlify/classnames-template-literals';
// import { Container } from '../../container';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/router';

// const variants = {
//   open: { opacity: 1, x: 0 },
//   closed: { opacity: 0, x: "-100%" },
// }

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const path = useRouter();

  // console.log(path);

  const navList = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/#about' },
    { name: 'Features', link: '/#features' },
    { name: 'Products', link: '/#products' },
    { name: 'F.A.Q', link: '/faq' },
    { name: 'Contact Us', link: '/contact' },
    { name: 'Blog', link: '/blog' },
  ];
  return (
    <>
      <nav>
        {/* <div>
            <Link href='/'>
              <a>
                <Image
                  src={logo}
                  alt='parivest logo'
                  className='w-full'
                  width={140}
                  height={30}
                />
              </a>
            </Link>
          </div> */}
        <div
          // className={navIconContainerStyle}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {/* <Icon
              icon={isOpen ? 'ci:close-big' : 'charm:menu-hamburger'}
              className={navIconStyle}
            /> */}
        </div>
        <ul
        // className={`${navListWrapperStyle} ${
        //   isOpen ? 'right-0 ' : '-right-[490px]'
        // } `}
        >
          {navList.map((nav) => (
            <li
              key={nav.name}
              // className={navListStyle}
              // className={` ${navListStyle} ${
              //   nav.link === path.asPath
              //     ? 'font-bold text-primary-100'
              //     : 'text-primary font-medium'
              // }`}
              onClick={() => setIsOpen(false)}
            >
              {/* <motion.div whileHover={{ scale: 1.1 }}>
                  <Link href={nav.link}>{nav.name}</Link>
                </motion.div> */}
              <p>{nav.name}</p>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

// const navWrapperStyle = ctl(`
//    bg-primary-400
//    py-6
//    fixed
// inset-x-0
// z-50
// `);

// const navContainerStyle = ctl(`
// flex
// justify-between
// items-center
// transition-all
// duration-500
// ease-in

// `);
// const navIconContainerStyle = ctl(`
// block
// lg:hidden
// cursor-pointer
// `);
// const navIconStyle = ctl(`
// text-primary-100
// text-3xl
// `);
// const navListStyle = ctl(`
// lg:mr-6
// mt-6
// lg:mt-0

// hover:text-primary-100

// cursor-pointer
// `);
// const navListWrapperStyle = ctl(`
// lg:flex
// px-32
// min-h-[100vh]
// lg:min-h-0
// shadow-2xl
// top-[5rem]
// lg:h-auto
// bg-primary-400
// lg:px-0
// lg:bg-inherit
// lg:static
// absolute
// items-center
// transition-all
// duration-500
// ease-in
// lg:mt-0
// `);
export default Navbar;
