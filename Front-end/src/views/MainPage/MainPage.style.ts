import styled from "styled-components";

export const StyledMainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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
  cursor: pointer;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  max-width: 90%;
`;

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: lightblue;
  height: 4rem;
  width: 90%;
`;

export const StyledFolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  min-width: 50px;
  min-height: 30px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: lightgrey;
  user-select: none;
  gap: 10px;
`;
