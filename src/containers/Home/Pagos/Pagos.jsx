// Pagos.js
import React, { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import Menu from '../Menu/Menu';
import { StyledHome, StyledTitle, StyledModal, StyledModalPago, 
  StyledTableWrapper, Styledtarifa, SpinnerWrapper, divSpinner } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faClosedCaptioning, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";

const Pagos = () => {
  const [comerciantes, setComerciantes] = useState([]);

  const [historialVisible, setHistorialVisible] = useState(false);
  const [historialPagos, setHistorialPagos] = useState('');
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
      console.log(response.data);
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

  const abrirHistorial = (codigoqr) => {
    if (codigoqr !== undefined && codigoqr !== null && codigoqr !== '') {
      setHistorialPagos(codigoqr);
      setHistorialVisible(true);
      // setSelectedComercianteIndex(index);
    } else {
      console.error('Índice de comerciante inválido');
    }
  };

  const cerrarHistorial = () => {
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
    console.log(folioComerciante);
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
                  <Button onClick={() => abrirHistorial(comerciante.codigoqr)}>Ver codigo QR</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTableWrapper>
      {historialVisible && (
        <StyledModal className="modal">
          <div className="subtitle">Codigo QR</div>
          <FontAwesomeIcon icon={faWindowClose} className='close' onClick={cerrarHistorial}></FontAwesomeIcon>
          <label>{historialPagos}</label>
          {/* <table>
            {historialPagos.map((pago, index) => (
              <tr key={index}>
                <td>Comerciante: {comerciantes[selectedComercianteIndex].nombre}</td>
                <td>Tianguis: {pago.tianguis}</td>
                <td>Monto: {pago.monto}</td>
                <td>Fecha: {pago.fecha}</td>
              </tr>
            ))}
          </table> */}
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
            {/* <div>
              <label>Metros:</label>
              <input
                type="text"
                name="metros"
                value={nuevoComerciante.metros || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Giro:</label>
              <input
                type="text"
                name="giro"
                value={nuevoComerciante.giro || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Piso:</label>
              <input
                type="text"
                name="piso"
                value={nuevoComerciante.piso || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Basura:</label>
              <input
                type="text"
                name="basura"
                value={nuevoComerciante.basura || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Telefono:</label>
              <input
                type="text"
                name="telefono"
                value={nuevoComerciante.telefono || ''}
                onChange={handleInputChange}
              />
            </div>
            <Button onClick={agregarComerciante}>Agregar</Button>  */}
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
