
import styled, { css } from 'styled-components';


const StyledHome = styled.div`
  display: flex;
  height:950px;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  background:white;
  body {
    box-sizing: border-box;
    color: #220f5f;
    font-family: 'Arial', sans-serif;
  }
  
  /* styles.css */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
}

table th,
table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

`;
const StyledTitle = styled.div`
  margin-top:-950px;
  margin-left:320px;
  font-size:20px;
  }
`;
const StyledTableWrapper = styled.div`
overflow-x: auto;
max-width: 100%;
margin-top: 20px;
.StyledTableWrapper {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
  color: #000;
}

table, th, td {
  border: 1px solid #ccc;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #eee;
}

// table {
//   width: 100%;
//   border-collapse: collapse;
//   border-spacing: 0;
//   background-color: #ffffff;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
// }

// th, td {
//   padding: 12px 15px;
//   text-align: left;
// }

// th {
//   background-color: #f2f2f2;
//   font-weight: bold;
// }

// tr:nth-child(even) {
//   background-color: #f2f2f2;
// }

// tr:hover {
//   background-color: #ddd;
// }
`;
const StyledModal = styled.div`
position: fixed;
width:800px;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #ffffff;
padding: 20px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
z-index: 1000;

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-right: 8px;
}
subtitle {
  color:linear-gradient(63.29deg, #EBC0E1 0.45%, #272244 100%);
}
`;
const Styledtarifa = styled.div`
  margin-left:450px;
  height:900px;
  .modal {
    background-color:white;
  }
  }
`;
const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  background-color: #f8f8f8;
  
  .qr-code {
    margin-top: 10px;
  }
`;

export { StyledHome,StyledTitle,StyledModal,StyledTableWrapper,Styledtarifa,StyledCard };
