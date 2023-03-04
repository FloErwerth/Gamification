import React, { PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages";
import { Header } from "./components/header/Header";
import { getClasses } from "./utils/styleUtils";
import { mainStyles } from "./mainStyles";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Pages } from "./types/pages";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { Overview } from "./pages/Overview/Overview";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { getActivities } from "./store/activities/activitySelectors";

const cssClasses = getClasses(mainStyles);

const Body = ({ children }: PropsWithChildren) => {
  return <div className={cssClasses.body}>{children}</div>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Body>
          <Header />
          <Routes>
            <Route element={<LandingPage />} path={Pages.HOME} />
            <Route element={<LoginPage />} path={Pages.LOGIN} />
            <Route element={<RegisterPage />} path={Pages.REGISTER} />
            <Route element={<Overview />} path={Pages.OVERVIEW} />
          </Routes>
        </Body>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
