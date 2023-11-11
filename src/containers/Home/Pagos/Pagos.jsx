// Pagos.js
import React, { useState } from 'react';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import Menu from '../Menu/Menu';
import { StyledHome, StyledTitle, StyledModal, StyledTableWrapper } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faClosedCaptioning, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const Pagos = () => {
  const [comerciantes, setComerciantes] = useState([
    {
      nombre: 'Comerciante 1',
      tianguis: ['Tianguis A', 'Tianguis B', 'Tianguis C'],
      fecha: '2023-11-10',
      pago: 150.0,
      historialPagos: [
        { monto: 50.0, fecha: '2023-10-01' },
        { monto: 100.0, fecha: '2023-11-01' },
      ],
    },
    {
      nombre: 'Comerciante 2',
      tianguis: ['Tianguis B'],
      fecha: '2023-11-09',
      pago: 200.0,
      historialPagos: [
        { monto: 50.0, fecha: '2023-09-01' },
        { monto: 150.0, fecha: '2023-11-01' },
      ],
    },
    // Agrega más comerciantes según tus necesidades
  ]);

  const [historialVisible, setHistorialVisible] = useState(false);
  const [historialPagos, setHistorialPagos] = useState([]);
  const [selectedComercianteIndex, setSelectedComercianteIndex] = useState(null);

  const abrirHistorial = (index) => {
    if (index >= 0 && index < comerciantes.length) {
      const historial = comerciantes[index].historialPagos || [];
      const historialExtendido = comerciantes[index].tianguis.reduce((acumulador, tianguis) => {
        return acumulador.concat(
          historial.map((pago) => ({
            ...pago,
            tianguis,
          }))
        );
      }, []);

      setHistorialPagos(historialExtendido);
      setHistorialVisible(true);
      setSelectedComercianteIndex(index);
    } else {
      console.error('Índice de comerciante inválido');
    }
  };

  const cerrarHistorial = () => {
    setSelectedComercianteIndex(null);
    setHistorialPagos([]);
    setHistorialVisible(false);
  };

  return (
    <StyledHome>
      <Menu />
      <StyledTitle>
        <Title text="Pagos Comerciantes" />
      </StyledTitle>

      <StyledTableWrapper>
        <table>
          <thead>
            <tr>
              <th>Nombre del comerciante</th>
              <th>Nombre Tianguis</th>
              <th>Fecha</th>
              <th>Pago</th>
              <th>Historial de Pagos</th>
            </tr>
          </thead>
          <tbody id="comerciantesTable">
            {comerciantes.map((comerciante, index) => (
              <tr key={index}>
                <td>{comerciante.nombre}</td>
                <td>{comerciante.tianguis.join(', ')}</td>
                <td>{comerciante.fecha}</td>
                <td>{comerciante.pago}</td>
                <td>
                  <Button onClick={() => abrirHistorial(index)}>Historial de Pagos</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTableWrapper>
      {historialVisible && (
        <StyledModal className="modal">
          <div className="subtitle">Historial de Pagos</div>
          <FontAwesomeIcon icon={faWindowClose} className='close' onClick={cerrarHistorial}></FontAwesomeIcon>
          <table>
            {historialPagos.map((pago, index) => (
              <tr key={index}>
                <td>Comerciante: {comerciantes[selectedComercianteIndex].nombre}</td>
                <td>Tianguis: {pago.tianguis}</td>
                <td>Monto: {pago.monto}</td>
                <td>Fecha: {pago.fecha}</td>
              </tr>
            ))}
          </table>
        </StyledModal>
      )}
    </StyledHome>
  );
};

export default Pagos;
