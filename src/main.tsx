import React, { PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages";
import { Header } from "./components/header/Header";
import { getClasses } from "./utils/styleUtils";
import { mainStyles } from "./mainStyles";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Pages } from "./types/pages";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { Overview } from "./pages/Overview/Overview";
import { Provider } from "react-redux";
import { store, useAppSelector } from "./store/store";
import { getActivities } from "./store/activities/activitySelectors";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { getIsLoggedIn } from "./store/authentication/authSelectors";
import { is } from "immer/dist/internal";

const cssClasses = getClasses(mainStyles);

const App = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  return (
    <BrowserRouter>
      <Body>
        <Header />
        <Routes>
          <Route
            element={
              isLoggedIn ? <Navigate to={Pages.OVERVIEW} /> : <LandingPage />
            }
            path={Pages.HOME}
          />
          <Route element={<LoginPage />} path={Pages.LOGIN} />
          <Route element={<RegisterPage />} path={Pages.REGISTER} />
          <Route
            element={isLoggedIn ? <Overview /> : <Navigate to={Pages.LOGIN} />}
            path={Pages.OVERVIEW}
          />
          <Route element={<Dashboard />} path={Pages.DASHBOARD} />
        </Routes>
      </Body>
    </BrowserRouter>
  );
};

const Body = ({ children }: PropsWithChildren) => {
  return <div className={cssClasses.body}>{children}</div>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
