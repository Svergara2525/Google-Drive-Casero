import styled from "styled-components";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";

export const ModalWrapper = styled.div`
  width: 500px;
  height: 300px;
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
  display: flex;
`;

export const StyledButton = styled.button`
  height: 20px;
  width: 100px;
`;

export const StyledFileUploader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #1475cf;
  height: 200px;
  width: 400px;
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
  width: 400px;
  height: 20px;
  border-radius: 4px;
  background-color: #f0f0f0;
`;
