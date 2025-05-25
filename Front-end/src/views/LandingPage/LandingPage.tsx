import { useState } from "react";

import { MainPage } from "../MainPage";
import { Navbar } from "../Navbar";
import { Modal } from "../Modal";

export const LandingPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean | null>(false);

  return (
    <div>
      <Navbar />
      <MainPage setShowModal={setShowModal} />
      {showModal && <Modal setShowModal={setShowModal}></Modal>}
    </div>
  );
};
