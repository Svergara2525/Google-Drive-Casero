import styled from "styled-components";

export const StyledMainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
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
  align-items: center;
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
  justify-content: space-between;
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

export const StyledFilesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

export const StyledOptionsFileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const StyledImageWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 1px solid black;
  gap: 20px;
  justify-content: center;
`;

export const StyledImage = styled.img`
  widht: 100px;
  height: 100px;
  border-radius: 5px;
`;
