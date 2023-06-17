import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import { useSelector } from "react-redux";

function App() {

  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>);
}

export default App;
