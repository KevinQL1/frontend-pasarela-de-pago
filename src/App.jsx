import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "#/pages/ProductPage.jsx";
import PaymentPage from "#/pages/PaymentPage.jsx";
import SummaryPage from "#/pages/SummaryPage.jsx";
import TransationStatus from "#/pages/TransationStatus.jsx";

/**
 * Componente raíz de la aplicación
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/transactionStatus" element={<TransationStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
