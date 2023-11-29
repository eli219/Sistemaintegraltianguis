import React from 'react';
import Title from '../../../components/Title';
import { StyledContainer, StyledHome, StyledTitle } from './styles';
import Menu from '../Menu/Menu';
import Button from '../../../components/Button';
import lector from '../../../Images/lector.png';
import SistemaIntegralMovilAPK from '../../../APK/SistemaIntegralmovil.apk'; 

const Movil = () => {
  const handleDownload = () => {
    const apkDownloadUrl = SistemaIntegralMovilAPK;

    const downloadLink = document.createElement('a');
    downloadLink.href = apkDownloadUrl;
    downloadLink.download = 'SistemaIntegralmovil.apk';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <StyledHome>
      <Menu />
      <StyledTitle>
        <Title text="App Móvil" />
      </StyledTitle>
      <StyledContainer>
        <img src={lector} className='lector' alt="Lector" />
        <p>En este apartado podrás descargar la aplicación para el Recaudador</p>
        <p>Dale clic en el botón para descargar la aplicación móvil</p>
        <Button width='500px' onClick={handleDownload}>
          Descargar Aplicación Móvil
        </Button>
      </StyledContainer>
    </StyledHome>
  );
};

export default Movil;
