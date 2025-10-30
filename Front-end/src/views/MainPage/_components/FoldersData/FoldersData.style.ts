import styled from "styled-components";

export const StyledFolderWrapper = styled.div`
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  overflow-y: auto;
  width: 90%;
  height: 30%;
  border: 10px solid black;
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
