import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "#/pages/ProductPage.jsx";
import PaymentPage from "#/pages/PaymentPage.jsx";

/**
 * Componente raíz de la aplicación
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
