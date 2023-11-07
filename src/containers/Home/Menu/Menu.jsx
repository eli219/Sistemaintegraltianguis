
import React from 'react';
import { StyledMenu, StyledUl, StyledLi } from './styles'; 
import MenuItem from '../../../componets/MenuItem'; 
import {
  faHome,
  faFile,
  faGraduationCap,
  faLayerGroup,
  faSitemap, 
  faShapes,
  faCogs,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../../Images/logo.png'; 

const menuDefault = [
  {
    displayName: 'Inicio',
    path: '/home',
    icon: faHome,
  },
  {
    displayName: 'Empresa',
    path: '/empresa',
    icon: faSitemap,
  },
  {
    displayName: 'Comerciantes',
    path: '/comerciantes',
    icon: faLayerGroup,
  },
  {
    displayName: 'Documentacion',
    path: '/documentos',
    icon: faFile,
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
