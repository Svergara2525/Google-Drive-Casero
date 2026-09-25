import { apiClient } from "../../infrastructure/apiClient";
import { useState, useEffect, useRef } from "react";

import { Data } from "../../Models/data";
import { file_atributes } from "../../Models/file_atributes";
import { Modal } from "../Modal";
import { Buttons } from "./_components/Buttons";
import { FoldersData } from "./_components/FoldersData";
import { FilesData } from "./_components/FilesData";
import { OpenFileModal } from "./_components/OpenFileModal";

import {
  FiChevronRight,
  FiCloud,
  FiFolder,
  FiGrid,
  FiAlertCircle,
} from "react-icons/fi";
import "./MainPage.css";

interface Props {
  showModal: boolean | null;
  showFileModal: boolean | null;
  showFolderModal: boolean | null;
  setShowModal: (valor: boolean | null) => void;
  setShowFileModal: (valor: boolean | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
}

export const MainPage: React.FC<Props> = ({
  showModal,
  showFileModal,
  showFolderModal,
  setShowModal,
  setShowFileModal,
  setShowFolderModal,
}) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);
  const [imagen, setImage] = useState<file_atributes | null>(null);
  const [openImage, setOpenImage] = useState<boolean | null>(false);
  const [rechargePage, setRechargePage] = useState<string | null>(null);
  const [isCreateFolder, setIsCreateFolder] = useState<boolean | null>(false);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);
  const optionMenu = useRef(false);
  const clickFile = useRef(false);
  const isRefreshAfterDelete = useRef(false);

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".heic",
    ".bmp",
    ".webp",
    ".svg",
  ];

  const fileExtensions = [".pdf", ".docx", ".txt"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentPath = window.location.pathname;
        const response = await apiClient.folderSelect(currentPath);
        // Usar replaceState si se refresca después de borrar, pushState para navegación normal
        if (isRefreshAfterDelete.current) {
          history.replaceState({ data: response }, "", currentPath);
          isRefreshAfterDelete.current = false;
        } else {
          history.pushState({ data: response }, "", currentPath);
        }
        setData(response);
      } catch (error) {
        console.log(error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [rechargePage]);

  window.onpopstate = (event) => {
    if (event.state && event.state.data) {
      setData(event.state.data);
    }
  };

  return (
    <main className="main-page">
      <header className="main-topbar">
        <div className="main-breadcrumb">
          <FiCloud aria-hidden="true" />
          <span>Mi espacio</span>
          <FiChevronRight aria-hidden="true" />
          <strong>Mis archivos</strong>
        </div>
        <span className="main-local-label">Almacenamiento personal</span>
      </header>
      <div className="main-content">
        <div className="main-heading">
          <div>
            <p className="main-eyebrow">TODO EN UN MISMO LUGAR</p>
            <h1>Mis archivos</h1>
            <p className="main-description">
              Tus documentos, fotos y recuerdos. Siempre a mano.
            </p>
          </div>
          <Buttons
            setIsCreateFolder={setIsCreateFolder}
            setShowFolderModal={setShowFolderModal}
            setShowFileModal={setShowFileModal}
            setShowModal={setShowModal}
          />
        </div>
        <div className="main-location">
          <div>
            <FiFolder aria-hidden="true" />
            <span>
              {window.location.pathname === "/"
                ? "Todos los archivos"
                : window.location.pathname}
            </span>
          </div>
          <span className="main-view-label">
            <FiGrid aria-hidden="true" /> Vista de cuadrícula
          </span>
        </div>
        {loading && (
          <div className="main-state" role="status">
            <span className="loading-spinner" />
            <h2>Cargando tus archivos</h2>
            <p>Preparando tu espacio…</p>
          </div>
        )}
        {error && (
          <div className="main-state main-state--error" role="alert">
            <FiAlertCircle />
            <h2>{error}</h2>
            <p>No se ha podido conectar con tu almacenamiento.</p>
          </div>
        )}
        {data && (
          <>
            {data.subcarpetas.length !== 0 && (
              <section
                className="library-section"
                aria-labelledby="folders-heading"
              >
                <div className="section-heading">
                  <h2 id="folders-heading">
                    Carpetas <span>{data.subcarpetas.length}</span>
                  </h2>
                </div>
                <FoldersData
                  setData={setData}
                  setError={setError}
                  data={data}
                  optionMenu={optionMenu}
                  setRechargePage={setRechargePage}
                  setShowFolderModal={setShowFolderModal}
                  setShowFileModal={setShowFileModal}
                  setShowModal={setShowModal}
                  setFilePath={setFilePath}
                  isRefreshAfterDelete={isRefreshAfterDelete}
                  setFileExtension={setFileExtension}
                />
              </section>
            )}
            <section
              className="library-section"
              aria-labelledby="files-heading"
            >
              <div className="section-heading">
                <h2 id="files-heading">
                  Archivos <span>{data.archivos.length}</span>
                </h2>
                <span>Tu biblioteca personal</span>
              </div>
              {data.archivos.length === 0 && (
                <div className="main-state main-state--empty">
                  <span className="empty-state-icon">
                    <FiCloud aria-hidden="true" />
                  </span>
                  <h2>Un espacio para tus archivos</h2>
                  <p>Sube tu primer archivo con el botón «Subir archivo».</p>
                </div>
              )}
              <FilesData
                data={data}
                setImage={setImage}
                setOpenImage={setOpenImage}
                imageExtensions={imageExtensions}
                fileExtensions={fileExtensions}
                optionMenu={optionMenu}
                setRechargePage={setRechargePage}
                setShowFolderModal={setShowFolderModal}
                setShowFileModal={setShowFileModal}
                setShowModal={setShowModal}
                setFilePath={setFilePath}
                isRefreshAfterDelete={isRefreshAfterDelete}
                setFileExtension={setFileExtension}
              />
            </section>
            {openImage && !optionMenu.current && (
              <OpenFileModal
                clickFile={clickFile}
                setOpenImage={setOpenImage}
                imagen={imagen}
                imageExtensions={imageExtensions}
                fileExtensions={fileExtensions}
              />
            )}
          </>
        )}
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setShowFileModal={setShowFileModal}
          setShowFolderModal={setShowFolderModal}
          showFileModal={showFileModal}
          showFolderModal={showFolderModal}
          setRechargePage={setRechargePage}
          isCreateFolder={isCreateFolder}
          setIsCreateFolder={setIsCreateFolder}
          filePath={filePath}
          fileExtension={fileExtension}
        ></Modal>
      )}
    </main>
  );
};
