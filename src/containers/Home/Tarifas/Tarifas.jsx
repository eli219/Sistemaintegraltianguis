
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Title from '../../../components/Title';
import {
  StyledHome,
  StyledTitle,
  Styledtarifa,
  StyledModal,
  StyledTableWrapper,
} from './styles';
import Menu from '../Menu/Menu';
import Button from '../../../components/Button';

const Empresa = () => {
  const [tarifas, setTarifas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaTarifa, setNuevaTarifa] = useState({
    nombre: '', // Asegúrate de inicializar cada propiedad que uses en handleInputChange
    precio: '',
    basura: '',
  });

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setNuevaTarifa({
      nombre: '',
      precio: '',
      basura: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaTarifa((prevTarifa) => ({
      ...prevTarifa,
      [name]: value,
    }));
  };

 /*  const agregarTarifa = () => {
    Axios.post('http://localhost:3001/registrarTarifa', nuevaTarifa)
      .then(function (response) {
        console.log(response);
        alert('Se agregó la tarifa');
        cerrarModal();
        listarTarifa(); // Mover esta línea dentro de la promesa para asegurar que se ejecute después de la solicitud exitosa
      })
      .catch(function (error) {
        console.log(error);
        alert('No se pudo registrar la tarifa');
      });
  }; */

  //JG
  const agregarTarifa = () => {
    Axios.post('http://localhost:3001/registrarTarifa', nuevaTarifa)
    .then(handleSuccess)
    .catch(handleError);
  }
  
  const handleSuccess = (response) => {
    console.log(response);
    alert('Se agregó la tarifa');
    cerrarModal();
    listarTarifa(); 
  }

  const handleError = (error) => {    
    console.log(error);
    alert('No se pudo registrar la tarifa');
  }

  //END
  const listarTarifa = () => {
    Axios.get('http://localhost:3001/listarTarifa')
      .then(function (response) {
        setTarifas(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    listarTarifa();
  }, []);

  return (
    <StyledHome>
      <Menu />
      <StyledTitle>
        <Title text="Tarifas de tianguis" />
      </StyledTitle>
      <Styledtarifa>
        <Button onClick={abrirModal}>Agregar Tarifa</Button>
        <StyledTableWrapper>
          <table>
            <thead>
              <tr>
                <th>Nombre del tianguis</th>
                <th>Costo de Metros</th>
                <th>Tarifa Basura</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.map((tarifa, index) => (
                <tr key={index}>
                  <td>{tarifa.nombreTianguis}</td>
                  <td>{tarifa.costoMetros}</td>
                  <td>{tarifa.tarifaBasura}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledTableWrapper>
        {modalVisible && (
          <StyledModal className="modal">
            <div>
              <label>Nombre del tianguis:</label>
              <input
                type="text"
                name="nombre"
                value={nuevaTarifa.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Costo de Metros:</label>
              <input
                type="number"
                name="precio"
                value={nuevaTarifa.precio}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Costo de Basura:</label>
              <input
                type="number"
                name="basura"
                value={nuevaTarifa.basura}
                onChange={handleInputChange}
              />
            </div>
            <Button onClick={agregarTarifa}>Agregar</Button>
            <Button onClick={cerrarModal}>Cancelar</Button>
          </StyledModal>
        )}
      </Styledtarifa>
    </StyledHome>
  );
};

export default Empresa;
