import React, { useState } from "react";
import Axios from "axios";
import { StyledHome, StyledLogin, StyledTitle, StyledInput, StyledButton } from './styles';
import Button from '../../../componets/Button';
import logo from '../../../Images/logo.png'
import TitleLogin from "../../../componets/TitleLogin";
import Input from '../../../componets/Input';
import { useNavigate } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password
    }).then((response) => {
      if (response.data.length > 0) {
        // Inicio de sesión exitoso
        setErrorMessage(""); // Limpia el mensaje de error
        navigate("/home"); // Redirecciona al home
      } else {
        setErrorMessage("Credenciales incorrectas");
      }
    }).catch((error) => {
      setErrorMessage("Error al iniciar sesión");
      console.error('Error al iniciar sesión:', error);
    });
  };

  return (
    <div className="App">
      <StyledHome>
        <StyledLogin>
          <img src={logo} className='logo'/>
          <StyledTitle>
            <TitleLogin className='Title' text="Iniciar Sesion" />
          </StyledTitle>
          <StyledInput> 
            <Input
              label={"Correo Electronico"}
              name="email"
              id="email"
              value={email}
              setValue={setEmail}
              placeholder={"a@a.com"}
              onChange={handleEmailChange}
            />
            <Input
              label={"Contraseña"}
              placeholder={"******"}
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <StyledButton> 
              <Button
                width="200px"
                height="40px"
                onClick={handleLogin}
              >
                Ingresar
              </Button>
            </StyledButton>
            {errorMessage && <p>{errorMessage}</p>}
          </StyledInput>
        </StyledLogin>
      </StyledHome>
    </div>
  );
};

export default App;
