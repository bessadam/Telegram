import React from 'react';
import "./assets/styles/main.scss";
//components
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import Authentication from "./components/Authentication/";
import ModalWindow from './components/ModalWindow';

const App: React.FC = () => {
  const mainDivRef = React.useRef<HTMLDivElement>(null);
  const userIsActive = localStorage.getItem('email');

  return (
    <div 
      className="main" 
      ref={mainDivRef} 
      style={{resize: !!userIsActive ? "both" : "none"}} 
    >
      { !!userIsActive
        ?  <>
            <Header />
            <Content mainDivRef={mainDivRef} />
            <Footer />
          </>
        : <Authentication/>
      } 
      <ModalWindow />
    </div>
  );
}

export default App;
