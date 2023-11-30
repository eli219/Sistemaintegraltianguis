import React from 'react';
import Title from '../../../components/Title';
import { StyledTableWrapper, StyledHome,StyledTitle } from './styles';
import Menu from '../Menu/Menu';
import { Box, Flex } from '@chakra-ui/react';

const Configuracion = () => (
  <Flex direction={{ base: 'column', md: 'row' }} minHeight="50vh">
  {/* Menú */}
  <Menu />
   {/* Contenido principal */}
   <Box flex="1" p={{ base: 4, md: 8 }}>
    <StyledTitle>
      <Title text="Configuracion" />
    </StyledTitle> 

    <StyledTableWrapper>
        <p>Para contactar cualquier error envie un mensaje a nuestro correo</p>
        <p>soportesistemaintegral@gmail.com</p>
        </StyledTableWrapper>
      </Box>
    </Flex>
);
export default Configuracion;
