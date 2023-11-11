
import React from 'react';
import { StyledMenu, StyledUl, StyledLi } from './styles'; 
import MenuItem from '../../../components/MenuItem'; 
import {
  faHome,
  faHandHoldingDollar,
  faShapes,
  faCogs,
  faAddressCard,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../../Images/logo.png'; 

const menuDefault = [
  {
    displayName: 'Inicio',
    path: '/home',
    icon: faHome,
  },
  {
    displayName: 'Tarifas de tianguis',
    path: '/tarifas',
    icon: faCoins,
  },
  {
    displayName: 'Registro Comerciantes',
    path: '/comerciantes',
    icon: faAddressCard,
  },
  {
    displayName: 'Pagos Comerciantes',
    path: '/pagos',
    icon: faHandHoldingDollar,
  },
  {
    displayName: 'Aplicacion movil',
    path: '/apps',
    icon: faShapes,
  },
  {
    displayName: 'Configuración',
    path: '/configuracion',
    icon: faCogs,
  },
];

const Menu = () => (
  <StyledMenu>
    <StyledUl>
      <img src={logo} className='logo' alt='logo' />
      {menuDefault.map((item, index) => (
        <StyledLi key={index}>
          <MenuItem
            displayName={item.displayName}
            path={item.path}
            icon={item.icon}
          />
        </StyledLi>
      ))}
    </StyledUl>
  </StyledMenu>
);

export default Menu;
