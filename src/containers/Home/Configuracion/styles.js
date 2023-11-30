import styled from 'styled-components';

const StyledHome = styled.div`
  display: flex;
  height:950px;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  background:white;
  }
`;
const StyledTitle = styled.div`
  margin-top:-950px;
  margin-left:320px;
  }
`;

const StyledTableWrapper = styled.div`
  overflow-x: auto;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  max-width: 100%;
  margin: 20px auto;

  table {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    background-color: #fff;
    color: #000;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #eee;
  }
`;

export { StyledHome,StyledTitle, StyledTableWrapper };
