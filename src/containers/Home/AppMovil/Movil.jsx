import React from 'react';
import Title from '../../../components/Title';
import { StyledHome,StyledTitle } from './styles';
import Menu from '../Menu/Menu';
import Button from '../../../components/Button';

const Movil = () => (
  <StyledHome>
    <Menu/>
      <StyledTitle>
        <Title text="App Movil" />
        <p>En este apartado podras descargar la aplicacion para el Recaudador</p>
        <p>Da clic en el boton para poder la aplicacion movil</p>
      </StyledTitle>
        <Button width='900px'>Descargar Aplicacion</Button>
  </StyledHome>
);
export default Movil;