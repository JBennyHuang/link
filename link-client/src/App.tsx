import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthenticationProvider } from "./context/AuthenticationContext";

import Login from "./components/login";
import Register from "./components/register";
import MainMenu from "./page/main_menu";
import MessagePage from "./page/message_page";

function App() {
  return (
    <AuthenticationProvider>
      <Routes>
        <Route path="/" element={<MainMenu />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/message_page" element={<MessagePage />}></Route>
      </Routes>
    </AuthenticationProvider>
  );
}

export default App;
