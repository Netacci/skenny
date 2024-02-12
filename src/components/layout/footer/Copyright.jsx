import { Text } from '../../text';
import ctl from '@netlify/classnames-template-literals';

const Copyright = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <Text variant='p14' className={copyrightStyle} color='primary-1300'>
      Copyright &copy; {year} | Parivest.com is the property of Parivest
      Technologies Limited, a company duly registered with the Corporate Affairs
      Commission with RC Number 1776756.
    </Text>
  );
};

const copyrightStyle = ctl(`
md:mt-6
mt-16
text-center
font-semibold
`);
export { Copyright };
