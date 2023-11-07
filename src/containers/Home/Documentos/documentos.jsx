import React from 'react';
import Title from '../../../componets/Title';
import { StyledHome,StyledTitle } from './styles';
import Menuprin from '../Menu/Menuprinc';

const Documentos = () => (
  <StyledHome>
    <Menuprin/>
      <StyledTitle>
        <Title text="Documentos" />
      </StyledTitle>
        
  </StyledHome>
);
export default Documentos;
