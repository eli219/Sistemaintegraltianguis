import React from 'react';
import Title from '../../../components/Title';
import { StyledHome,StyledTitle } from './styles';
import Menuprin from '../Menu/Menuprinc';

const Areas = () => (
  <StyledHome>
    <Menuprin/>
      <StyledTitle>
        <Title text="Areas" />
      </StyledTitle>
        
  </StyledHome>
);
export default Areas;
