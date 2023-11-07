
import React, { useState, useEffect } from 'react';
import Title from '../../../componets/Title';
import { StyledHome, StyledTitle, Styledtarifa, StyledModal, StyledTableWrapper } from './styles';
import Menu from '../Menu/Menu';
import Button from '../../../componets/Button';

const Empresa = () => {
  const [tarifas, setTarifas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaTarifa, setNuevaTarifa] = useState({});

  useEffect(() => {
    const storedTarifas = JSON.parse(localStorage.getItem('tarifas'));
    if (storedTarifas) {
      setTarifas(storedTarifas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tarifas', JSON.stringify(tarifas));
  }, [tarifas]);

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setNuevaTarifa({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaTarifa((prevTarifa) => ({
      ...prevTarifa,
      [name]: value,
    }));
  };

  const agregarTarifa = () => {
    setTarifas((prevTarifas) => [...prevTarifas, nuevaTarifa]);
    cerrarModal();
  };

  return (
    <StyledHome>
      <Menu />
      <StyledTitle>
        <Title text="Empresa" />
      </StyledTitle>
      <Styledtarifa>
        <Button onClick={abrirModal}>Agregar Tarifa</Button>
        <StyledTableWrapper>
          <table>
            <thead>
              <tr>
                <th>Nombre del tianguis</th>
                <th>Costo de Metros</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.map((tarifa, index) => (
                <tr key={index}>
                  <td>{tarifa.nombre}</td>
                  <td>{tarifa.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledTableWrapper>
        {modalVisible && (
          <StyledModal className='modal'>
            <div>
              <label>Nombre del tianguis:</label>
              <input
                type="text"
                name="nombre"
                value={nuevaTarifa.nombre || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Costo de metros:</label>
              <input
                type="number"
                name="precio"
                value={nuevaTarifa.precio || ''}
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
