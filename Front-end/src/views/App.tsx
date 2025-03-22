import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from "./LandingPage/LandingPage";
import { routes } from "../infrastructure/routes";

export const App: React.FC = () => {
  const confRoutes = [
    { name: "Home", path: routes.LANDING_PAGE, element: <LandingPage /> },
  ];
  return (
    <Router>
      <Routes>
        {confRoutes.map((route) => (
          <Route element={route.element} key={route.name} path={route.path} />
        ))}
      </Routes>
    </Router>
  );
};
