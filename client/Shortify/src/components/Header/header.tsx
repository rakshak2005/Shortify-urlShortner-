import * as React from 'react';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <div className="bg-bg bg-cover bg-top h-full w-full" >
         <div className=" p-5  flex flex-col ml-32">
            <nav className='text-6xl font-extrabold font-logocursive text-white [text-shadow:_3px_3px_10px_rgba(0,0,0,0.10)] ' >Shortify... </nav>
         </div>
    </div>
  ) ;
};

export default Header;
