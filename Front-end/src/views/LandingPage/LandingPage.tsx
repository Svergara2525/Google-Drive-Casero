import { useState } from "react";

import { MainPage } from "../MainPage";
import { Navbar } from "../Navbar";

import * as S from "./LandingPage.style";

export const LandingPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean | null>(false);
  const [showFileModal, setShowFileModal] = useState<boolean | null>(false);
  const [showFolderModal, setShowFolderModal] = useState<boolean | null>(false);

  return (
    <S.StyledLandingPageWrapper>
      <Navbar />
      <MainPage
        showModal={showModal}
        showFileModal={showFileModal}
        showFolderModal={showFolderModal}
        setShowModal={setShowModal}
        setShowFileModal={setShowFileModal}
        setShowFolderModal={setShowFolderModal}
      />
    </S.StyledLandingPageWrapper>
  );
};
