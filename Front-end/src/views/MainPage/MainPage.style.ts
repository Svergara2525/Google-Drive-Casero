import styled from "styled-components";

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25vh;
  width: 100%;
  gap: 10px;
`;

export const StyledFolderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
  height: 4rem;
  width: 90%;
`;

export const StyledFolder = styled.div`
  background-color: lightgrey;
  user-select: none;
`;
