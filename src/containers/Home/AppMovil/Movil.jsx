import React from 'react';
import Title from '../../../components/Title';
import { StyledContainer, StyledHome, StyledTitle } from './styles';
import Menu from '../Menu/Menu';
import Button from '../../../components/Button';
import lector from '../../../Images/lector.png';

const Movil = () => {
  const handleDownload = () => {
    // Aquí deberías proporcionar la URL de descarga del archivo APK
    const apkDownloadUrl = 'URL_DEL_ARCHIVO_APK';

    // Crea un enlace temporal
    const downloadLink = document.createElement('a');
    downloadLink.href = apkDownloadUrl;

    // Asigna el nombre del archivo que se descargará
    downloadLink.download = 'nombre_del_archivo.apk';

    // Agrega el enlace al documento
    document.body.appendChild(downloadLink);

    // Simula un clic en el enlace para iniciar la descarga
    downloadLink.click();

    // Elimina el enlace del documento
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
