import React, {PropsWithChildren} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Header} from "./components/header/Header";
import {getClasses} from "./utils/styleUtils";
import {mainStyles} from "./mainStyles";
import {Pages} from "./types/pages";
import {Overview} from "./pages/Overview/Overview";
import {Provider} from "react-redux";
import {store, useAppSelector} from "./store/store";
import {Dashboard} from "./pages/Dashboard/Dashboard";
import {getIsLoggedIn} from "./store/authentication/authSelectors";
import {ActivityPage} from "./pages/ActivityPage/ActivityPage";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {LandingPage} from "./pages/LandingPage/LandingPage";

const cssClasses = getClasses(mainStyles);

const App = () => {
   const isLoggedIn = useAppSelector(getIsLoggedIn);

   return (
      <>
         <BrowserRouter>
            <Body>
               <Header/>
               <Routes>
                  <Route element={isLoggedIn ? <Navigate to={Pages.OVERVIEW}/> : <LandingPage/>} path={Pages.HOME}/>
                  <Route
                     element={isLoggedIn ? <Overview/> : <Navigate to={Pages.HOME}/>}
                     path={Pages.OVERVIEW}
                  />
                  <Route element={<Dashboard/>} path={Pages.DASHBOARD}/>
                  <Route element={<ActivityPage/>} path={Pages.ACTIVITY}/>
               </Routes>
            </Body>
         </BrowserRouter>
         <ToastContainer autoClose={2000} hideProgressBar={true}/>
      </>
   );
};
const Body = ({children}: PropsWithChildren) => {
   return <div className={cssClasses.body}>{children}</div>;
};

createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <Provider store={store}>
         <App/>
      </Provider>
   </React.StrictMode>
);
