
import styled from 'styled-components';

export const StyledHome = styled.div`
  display: flex;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  background: white;

  @media (min-width: 768px) {
    height: 600px; /* Altura ajustada para laptops y dispositivos más grandes */
    
  }

  @media (min-width: 1024px) {
    height: 800px; /* Altura ajustada para computadoras */
  
  }
`;

export const StyledTitle = styled.div`
  margin-top: 20px;
  margin-left: 20px;

  @media (min-width: 768px) {
    margin-left: 100px; /* Ajuste de margen para laptops y dispositivos más grandes */
  }

  @media (min-width: 1024px) {
    margin-left: 400px; /* Ajuste de margen para computadoras */
    margin-top:-900px;
  }
`;
export const StyledContainer = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  font-family:Arial;
  @media (min-width: 768px) {
    margin-left: 100px; /* Ajuste de margen para laptops y dispositivos más grandes */
  }

  @media (min-width: 1024px) {
    margin-left: 400px; /* Ajuste de margen para computadoras */
    
  }
`;
