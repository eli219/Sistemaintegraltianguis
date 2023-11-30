import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { Box, Flex } from '@chakra-ui/react'; // Importa los componentes de Chakra UI que necesitas
import Menu from './Menu/Menu';
import Chatbot from '../../components/Chatbot';

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    setChatOpen(true);
  }, []);

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minHeight="10vh">
     
      <Menu />

     
      <Box flex="1" p={{ base: 4, md: 7 }}>
        <Title text="Inicio" />
        {chatOpen && <Chatbot />}
      </Box>
    </Flex>
  );
};

export default Home;
