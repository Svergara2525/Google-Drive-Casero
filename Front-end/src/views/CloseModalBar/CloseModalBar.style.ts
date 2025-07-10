import { IoMdClose } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import styled from "styled-components";

export const StyledCloseButton = styled(IoMdClose)`
  cursor: pointer;
  font-size: 2rem;
`;

export const StyledDownloadButton = styled(MdOutlineFileDownload)`
  cursor: pointer;
  font-size: 2rem;
`;

export const StyledDownloadWrapper = styled.a`
  text-decoration: none;
  color: black;
`;
