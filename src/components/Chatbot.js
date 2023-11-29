import React, { useState } from 'react';
import Button from './Button';
const containerStyle = {
    maxWidth: '600px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    marginTop:'230px',
    marginLeft:'1300px',
    textAlign: 'center',
  };
  const chatBoxStyle = {
    height: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflowY: 'scroll',
    padding: '10px',
    marginBottom: '10px',
  };
  
  const inputStyle = {
    width: '80%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '5px',
    marginTop: '10px',
  };
  
  const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  };
  
  const messageStyle = {
    marginBottom: '8px',
  };
  

const Chatbot = () => {
  const [chatContent, setChatContent] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = () => {
    const message = userInput.trim();
    if (message !== "") {
      setChatContent([...chatContent, { sender: 'user', text: message }]);
      setChatContent([...chatContent, { sender: 'Chat', text: getConceptInfo(message) }]);
      setUserInput('');
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const getConceptInfo = (keyword) => {
    switch (keyword) {
      case'hola':
      return "Hola soy un asistente virtual que te enseñare todas las secciones de este sistema 😊"
      case 'Inicio':
        return "En la sección de 'Inicio' podrás observar un chatbot que te explicará cómo funciona todo el proyecto.";
      case 'Tarifas de tianguis':
        return "En la sección de 'Tarifas' encontrarás todas las tarifas, donde podrás editarlas y vincularlas con la tabla de comerciantes.";
      case ' Registro de comerciantes':
        return "En la sección de 'Registro de comerciantes' encontrarás el listado de y los datos de los  comerciantes.";
        case ' Pagos de comerciantes':
        return "En la sección de 'Pagos de Comerciantes' encontrarás el historial de los pagos de los comerciantes reflejados en una tabla y generador de tarjetas QR ";
        case ' Aplicación Móvil':
          return "En la sección de 'Aplicación Móvil'al dar clic en el boton podras descargar la app móvil";
          case ' Configuracion':
          return "En la sección de 'Configuracion'encontrarás el correo de soporte";
            default:
        return "Lo siento, no tengo información sobre '" + keyword + "'.";
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Bienvenido al Sistema Integral de tianguis</h1>
      <p>Este es un chatbot para ayudarte a conocer mejor el sistema integral de tianguis.</p>
      <div style={chatBoxStyle}>
        {chatContent.map((message, index) => (
          <div key={index} className={`message ${message.sender}`} style={messageStyle}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onClick={handleKeyPress}
        placeholder="Escribe que sección quieres conocer (inicio,empresa,comerciantes)"
        style={inputStyle}
      />
      <Button onClick={sendMessage} style={buttonStyle}>Enviar</Button>
    </div>
  );
};

export default Chatbot;



