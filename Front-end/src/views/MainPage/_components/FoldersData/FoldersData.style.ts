import styled from "styled-components";

export const StyledFolderWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-auto-rows: minmax(52px, auto);
  cursor: pointer;
  align-items: stretch;
  gap: 20px;
  overflow-y: auto;
  width: 90%;
  height: 30%;
  border: 10px solid black;
  align-content: start;
`;

export const StyledFolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  min-height: 52px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: lightgrey;
  user-select: none;
  gap: 10px;
`;

export const StyledFolderName = styled.span`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
