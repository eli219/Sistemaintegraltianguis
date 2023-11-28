// Pagos.js
import React, { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import Menu from '../Menu/Menu';
import { StyledHome, StyledTitle, StyledModal, StyledModalPago, 
  StyledTableWrapper, Styledtarifa, SpinnerWrapper, ImgCodigoQR } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faClosedCaptioning, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";

const Pagos = () => {
  const [comerciantes, setComerciantes] = useState([]);

  const [historialVisible, setHistorialVisible] = useState(false);
  const [historialPagos, setHistorialPagos] = useState('');
  const [qrPago, setqrPago] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComercianteIndex, setSelectedComercianteIndex] = useState(null);
  const [nuevoComerciante, setNuevoComerciante] = useState({});
  const [showSpinner, setshowSpinner] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [showButtonBuscar, setShowButtonBuscar] = useState(true);
  const [imagen, setImagen] = useState('');
  const [folioComerciante, setFolioComerciante] = useState({});

  const listarPagosComerciantes = () => {
    Axios.get('http://localhost:3001/listarPagosComerciante')
    .then(function (response) {
      setComerciantes(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  useEffect(() => {
    listarPagosComerciantes();
  }, []);
  
  const abrirModal = () => {
    setModalVisible(true);
  };

  const mostrarCodigoQR = (codigoqr) => {
    if (codigoqr !== undefined && codigoqr !== null && codigoqr !== '') {
      setHistorialPagos(codigoqr);
      setHistorialVisible(true);
      Axios.post('http://localhost:3001/mostrarImagen', {
        codigoqr: codigoqr,
      },
      {
        responseType: "arraybuffer"
      }
      )
      .then(function (response) {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
        const url = `data:image/png;base64,${base64}`;
        setqrPago(url);
      })
      .catch(function (error) {
        alert(`Ocurrio un erro al mostrar la imagen: ${error}`)
      });
    } else {
      console.error('Índice de comerciante inválido');
    }
  };

  const cerrarImgQR = () => {
    setSelectedComercianteIndex(null);
    setHistorialPagos('');
    setHistorialVisible(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoComerciante((prevComerciante) => ({
      ...prevComerciante,
      [name]: value,
    }));
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setNuevoComerciante({});
  };

  const handleFileChange = (event) => {
    setImagen(event.target.files[0]);
  }

  const cargarIMG = () => {
    if (!imagen) {
      console.log('No se ha seleccionado ninguna imagen');
      return;
    }
    const formData = new FormData();
    formData.append('file', imagen);
    formData.append('folioComerciante', JSON.stringify(folioComerciante));
    Axios.post('http://localhost:3001/subirimagen', 
    formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
    })
    .then(function (response) {
      console.log(response);    
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  const buscarComerciante = () => {
    setshowSpinner(true);
    Axios.post('http://localhost:3001/buscarComerciante', {
      nombre: nuevoComerciante.nombre,
    })
    .then(function (response) {
      if(response.data.length === 0){
        alert('usuario no encontrado!');
      }
      else{
        setNuevoComerciante(response.data[0]);
        setFolioComerciante(response.data[0]);
        setShowInputs(true);
        setshowSpinner(false);
        setShowButtonBuscar(false);
      }      
    })
    .catch(function (error) {
      console.log(error);
      setShowInputs(false);
      setShowButtonBuscar(true);
    });    
    setshowSpinner(false);
  }

  return (
    <StyledHome>
      <Menu />
      <StyledTitle>
        <Title text="Pagos Comerciantes" />
      </StyledTitle>
      <Styledtarifa>
      <Button onClick={abrirModal}>Registrar Nuevo Pago</Button>
      <StyledTableWrapper>
        <table>
          <thead>
            <tr>
              <th>Nombre del comerciante</th>
              <th>Nombre Tianguis</th>
              <th>Fecha</th>
              <th>Ver codigo QR</th>
            </tr>
          </thead>
          <tbody id="comerciantesTable">
            {comerciantes.map((comerciante, index) => (
              <tr key={index}>
                <td>{comerciante.nombre}</td>
                <td>{comerciante.tianguis}</td>
                <td>{comerciante.fecha}</td>
                <td>
                  <Button onClick={() => mostrarCodigoQR(comerciante.codigoqr)}>Ver codigo QR</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTableWrapper>
      {historialVisible && (
        <StyledModal className="modal">
          <div className="subtitle">Codigo QR</div>
          <FontAwesomeIcon icon={faWindowClose} className='close' onClick={cerrarImgQR}></FontAwesomeIcon>
          <ImgCodigoQR src={qrPago} alt='Codigo QR para hacer el pago' ></ImgCodigoQR>
        </StyledModal>
      )}

      {/*
        Modal agregar pago        
      */}

        {modalVisible && (
          <StyledModalPago className='modal'>
            <div className='subtitle'>Datos del comerciante</div>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={nuevoComerciante.nombre || ''}
                onChange={handleInputChange}
              />
            </div>
            {showInputs && (
              <div>
                <label>Tianguis:</label>
                <input
                  type="text"
                  name="tianguis"
                  value={nuevoComerciante.tianguis}
                />
              </div>
            )}
            {showInputs && (
              <div>
                <label>Codigo QR:</label>
                <input
                  type="file"
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </div>
            )}
            { showSpinner && 
              ( 
                <SpinnerWrapper />
              )
            }
            { showButtonBuscar &&
              (
                <Button onClick={buscarComerciante}>Buscar</Button>
              )
            }
            { !showButtonBuscar &&
              (
                <Button onClick={cargarIMG}>Cargar QR</Button>
              )
            }            
            <Button onClick={cerrarModal}>Cancelar</Button>
          </StyledModalPago>
        )}
      </Styledtarifa> 
      
    </StyledHome>
  );
};

export default Pagos;
