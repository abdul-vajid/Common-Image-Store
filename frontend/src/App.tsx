import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./router/Router";
import { ThemeProvider } from "@material-tailwind/react";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <ToastContainer />
          <Routes>
            <Route path="/*" element={<Router />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
