// import Link from 'next/link';
// import footerData from '../../../config/footer.json';
// import { Text } from '../../text';
// import ctl from '@netlify/classnames-template-literals';

const FooterMenu = () => {
  const footerMenuHeader = Object.keys(footerData);
  return (
    <>
      <nav className={footerMenuStyle}>
        {footerMenuHeader.map((footMenu) => (
          <FootList
            key={footMenu}
            header={footMenu}
            list={footerData[footMenu]}
          />
        ))}
      </nav>
    </>
  );
};

const FootList = ({ header, list }) => {
  return (
    <div>
      <Text variant='p18' color='primary-1200' weight='bold'>
        {header}
      </Text>
      <ul>
        {list.map((footerItems, index) => (
          <li
            key={`footer_list_${index}`}
            className='mt-3 text-primary-1300 font-semibold'
          >
            <Link href={footerItems.link}>
              <a>{footerItems.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const footerMenuStyle = ctl(`
grid
lg:grid-cols-4
md:grid-cols-3
grid-cols-1
gap-8
mb-16
`);
export { FooterMenu };
