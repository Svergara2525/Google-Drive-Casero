import styled from "styled-components";
import { IoDocumentTextOutline } from "react-icons/io5";

export const StyledFilesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 90%;
  height: 70%;
  overflow-y: auto;
  border: 10px solid red;
`;

export const StyledFileBox = styled.div`
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

export const StyledOptionsFileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const FileNameContainer = styled.div`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const StyledImagePreview = styled.img`
  widht: 100px;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
`;

export const StyledFilePreview = styled(IoDocumentTextOutline)`
  cursor: pointer;
  font-size: 4rem;
`;
