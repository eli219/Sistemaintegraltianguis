import React from 'react';
import Title from '../../../componets/Title';
import { StyledHome,StyledTitle } from './styles';
import Menu from '../Menu/Menu';

const Configuracion = () => (
  <StyledHome>
    <Menu/>
      <StyledTitle>
        <Title text="Configuracion" />
        
      </StyledTitle>
        
  </StyledHome>
);
export default Configuracion;
