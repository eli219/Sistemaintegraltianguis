
import React,{useEffect,useState} from 'react';
import Title from '../../components/Title';
import { StyledHome, StyledTitle } from './styles';
import Menu from './Menu/Menu';
import Chatbot from '../../components/Chatbot';

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);
  useEffect(() => {
    setChatOpen(true);
  }, []);
  return (
    <div>
      <StyledHome>
        <Menu />
        <StyledTitle>
          <Title text="Inicio" />
        </StyledTitle>
        {chatOpen && <Chatbot />}
      </StyledHome>
    </div>
  );
};


export default Home
