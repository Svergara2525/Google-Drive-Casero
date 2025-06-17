import { useState } from "react";

import { MainPage } from "../MainPage";
import { Navbar } from "../Navbar";
import { Modal } from "../Modal";

export const LandingPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean | null>(false);
  const [showFileModal, setShowFileModal] = useState<boolean | null>(false);
  const [showFolderModal, setShowFolderModal] = useState<boolean | null>(false);

  return (
    <div>
      <Navbar />
      <MainPage
        setShowModal={setShowModal}
        setShowFileModal={setShowFileModal}
        setShowFolderModal={setShowFolderModal}
      />
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setShowFileModal={setShowFileModal}
          setShowFolderModal={setShowFolderModal}
          showFileModal={showFileModal}
          showFolderModal={showFolderModal}
        ></Modal>
      )}
    </div>
  );
};
