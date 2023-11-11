import React from 'react';
import Title from '../../../components/Title';
import { StyledHome,StyledTitle } from './styles';
import Menu from '../Menu/Menu';

const Configuracion = () => (
  <StyledHome>
    <Menu/>
      <StyledTitle>
        <Title text="Configuracion" />
        <p>Para contactar cualquier error envie un mensaje a nuestro correo</p>
      </StyledTitle>
        
  </StyledHome>
);
export default Configuracion;
