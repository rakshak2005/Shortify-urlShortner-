
import * as React from 'react';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Body from './components/Container/container';



interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
  <>
  <Header/>
  <Body/>
  <Footer/> 
  </>
  );
};

export default App;

