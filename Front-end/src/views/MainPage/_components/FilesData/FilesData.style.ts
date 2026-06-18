import styled from "styled-components";
import { IoDocumentTextOutline } from "react-icons/io5";

export const StyledFilesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  align-items: stretch;
  gap: 20px;
  width: 90%;
  align-content: start;
  margin-top: 10px;
`;

export const StyledFileBox = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  border: 1px solid black;
  gap: 20px;
`;

export const StyledOptionsFileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  gap: 10px;
`;

export const FileNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
  max-width: calc(100% - 30px);
  flex-shrink: 1;
`;

export const StyledImagePreview = styled.img`
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
`;

export const StyledFilePreview = styled(IoDocumentTextOutline)`
  cursor: pointer;
  font-size: 4rem;
`;
