import styled from "styled-components";
import { IoDocumentTextOutline } from "react-icons/io5";

export const StyledMainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
`;

export const StyledDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  gap: 15px;
  width: 98%;
`;

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

export const StyledOptionsFileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
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

export const StyledImagePreview = styled.img`
  widht: 100px;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
`;

export const StyledOpenImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
`;

export const BackgroundDark = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

export const StyledFilePreview = styled(IoDocumentTextOutline)`
  cursor: pointer;
  font-size: 4rem;
`;

export const FileNameContainer = styled.div`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;
