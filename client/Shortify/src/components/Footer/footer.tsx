import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className='bg-bg bg-cover bg-bottom h-[6vh] w-full text-center font-inter text-base text-white pt-[2vh]' >
        Copyright &#169; Shortify | Rakshak 
    </div>
  );
};

export default Footer;
