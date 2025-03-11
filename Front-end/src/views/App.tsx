import { MainPage } from "./MainPage/MainPage";
import { Navbar } from "./Navbar";

export const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <MainPage />
    </div>
  );
};
