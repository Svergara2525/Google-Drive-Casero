import styled from "styled-components";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";

export const ModalWrapper = styled.div`
  width: 40%;
  height: 50%;
  background: white;
  color: white;
  z-index: 10;
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonsWrapper = styled.div`
  gap: 10px;
  display: flex;
`;

export const StyledButton = styled.button`
  width: 100px;
`;

export const StyledFileUploader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #1475cf;
  height: 50%;
  width: 60%;
  cursor: pointer;
  border-radius: 5px;
`;

export const ModalOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width; 100%;
  height: 100%;
`;

export const SelectedFileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const FileSelectText = styled.div`
  color: #1475cf;
  font-size: 16px;
`;

export const FileIcon = styled(IoDocumentTextOutline)`
  color: #1475cf;
  font-size: 60px;
`;

export const CloudUploadIcon = styled(MdCloudUpload)`
  color: #1475cf;
  font-size: 60px;
`;

export const BackgroundDark = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

export const StyledInputFolderName = styled.input`
  border: 2px solid transparent;
  width: 25em;
  height: 2.5em;
  padding-left: 0.8em;
  outline: none;
  overflow: hidden;
  background-color: #f3f3f3;
  border-radius: 10px;
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 2px solid #4a9dec;
    box-shadow: 0px 0px 0px 7px rgba(74, 157, 236, 0.2);
    background-color: white;
  }
`;
