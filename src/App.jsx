import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Product from "./pages/Product";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <BrowserRouter>
      <ReactNotifications />
      <Header />
      <Routes>
        <Route path="/" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
