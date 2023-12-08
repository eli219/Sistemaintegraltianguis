
import React, { useState, useRef, useEffect } from 'react';
import Title from '../../../components/Title';
import { StyledTitle, StyledModal, StyledTableWrapper } from './styles';
import Button from '../../../components/Button';
import Menu from '../Menu/Menu';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import QRious from 'qrious';
import Axios from "axios";
import { Box, Flex } from '@chakra-ui/react'; 

const Comerciantes = () => {
  const [comerciantes, setComerciantes] = useState([]);
  const [tablaComerciantes, settablaComerciantes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaComerciante, setNuevoComerciante] = useState({});
  const [setCodigoQR] = useState('');
  const tableRef = useRef(null);

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setNuevoComerciante({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoComerciante((prevComerciante) => ({
      ...prevComerciante,
      [name]: value,
    }));
  };

  const agregarComerciante = () => {
    const nuevoComercianteConPago = {
      ...nuevaComerciante,
      pago: (
        (parseFloat(nuevaComerciante.metros) * 9) +
        parseFloat(nuevaComerciante.basura) +
        parseFloat(nuevaComerciante.piso)
      ).toFixed(2),
      pagoRealizado: false,
      fechaPago: '',
    };
    Axios.post('https://www.sistemaintegraldetianguis.com/registrarComerciante', {
      nuevoComerciante: nuevoComercianteConPago,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    setComerciantes((prevComerciante) => [...prevComerciante, nuevoComercianteConPago]);
    setCodigoQR(JSON.stringify(nuevoComercianteConPago));
    listarComerciantes();
    cerrarModal();
  };  

  const listarComerciantes = () => {
    Axios.get('https://www.sistemaintegraldetianguis.com/registrarComerciante')
    .then(function (response) {
      console.log(response.data);
      settablaComerciantes(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    listarComerciantes();
  }, []);

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minHeight="50vh">
    {/* Menú */}
    <Menu />
     {/* Contenido principal */}
     <Box flex="1" p={{ base: 4, md: 8 }}>
      <StyledTitle>
        <Title text="Comerciantes" />
      </StyledTitle>      
      <Button onClick={abrirModal}>Registrar Comerciante</Button>
        
        <StyledTableWrapper>
          <table ref={tableRef}>
            <thead>
              <tr>
                <th>Nombre del comerciante</th>
                <th>Tianguis</th>
                <th>Metros</th>
                <th>Giro</th>
                <th>Piso</th>
                <th>Basura</th>
              </tr>
            </thead>
            <tbody id="comerciantesTable">
              {tablaComerciantes.map((comerciante, index) => (
                <tr key={index}>
                  <td>{comerciante.nombre}</td>
                  <td>{comerciante.tianguis}</td>
                  <td>{comerciante.metros}</td>
                  <td>{comerciante.giro}</td>
                  <td>{comerciante.piso}</td>
                  <td>{comerciante.basura}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledTableWrapper>
        {modalVisible && (
          <StyledModal className='modal'>
            <div className='subtitle'>Datos del comerciante</div>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={nuevaComerciante.nombre || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Tianguis:</label>
              <input
                type="text"
                name="tianguis"
                value={nuevaComerciante.tianguis || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Metros:</label>
              <input
                type="text"
                name="metros"
                value={nuevaComerciante.metros || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Giro:</label>
              <input
                type="text"
                name="giro"
                value={nuevaComerciante.giro || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Piso:</label>
              <input
                type="text"
                name="piso"
                value={nuevaComerciante.piso || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Basura:</label>
              <input
                type="text"
                name="basura"
                value={nuevaComerciante.basura || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Telefono:</label>
              <input
                type="text"
                name="telefono"
                value={nuevaComerciante.telefono || ''}
                onChange={handleInputChange}
              />
            </div>
            <Button onClick={agregarComerciante}>Agregar</Button>
            <Button onClick={cerrarModal}>Cancelar</Button>
          </StyledModal>
        )}
 </Box>
    </Flex>
  );
};

export default Comerciantes;

