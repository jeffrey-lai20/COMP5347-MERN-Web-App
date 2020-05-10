import styled from "styled-components";

export const NavContainer = styled.div`
  height: 100%;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  background: #0D65A5;
  text-align: center;
  color: #fafcff;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  a {
    color: white;
  }
`;

export const LogoutButton = styled.div` 
  width: 200px;
  margin-top: auto;
  margin-bottom: 20px;

  a:hover {
    background: #8BAAC1;
  }
`;
