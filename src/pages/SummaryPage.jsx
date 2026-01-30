import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction, resetTransactionState } from "#/features/transaction/transactionSlice.js";

export default function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { transaction, loading, error } = useSelector((state) => state.transaction || {});
  const transactionId = location.state?.transactionId;

  useEffect(() => {
    if (!transactionId) {
      // Si no hay ID, volvemos al inicio
      navigate("/");
      return;
    }

    // Traemos la transacción completa (con producto, cliente y delivery)
    dispatch(fetchTransaction(transactionId));

    // Limpiar estado al salir
    return () => dispatch(resetTransactionState());
  }, [dispatch, transactionId, navigate]);

  const handlePay = () => {
    navigate("/transactionStatus", { state: { transactionId } });
  };


  if (loading) return <p>Cargando resumen...</p>;
 if (error)
  return (
    <p style={{ color: "red" }}>
      {typeof error === "string" ? error : JSON.stringify(error)}
    </p>
  );
  if (!transaction) return null;

  const total = transaction.quantity * transaction.product?.price;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Resumen de la Transacción</h1>
      <p>
        <strong>Producto:</strong> {transaction.product?.name}
      </p>
      <p>
        <strong>Descripción:</strong> {transaction.product?.description}
      </p>
      <p>
        <strong>Cantidad:</strong> {transaction.quantity}
      </p>
      <p>
        <strong>Precio unitario:</strong> ${transaction.product?.price}
      </p>
      <p>
        <strong>Total:</strong> ${total}
      </p>

      <h2>Cliente</h2>
      <p>{transaction.customer?.name}</p>
      <p>{transaction.customer?.email}</p>
      <p>{transaction.customer?.phone}</p>

      <h2>Delivery</h2>
      <p>{transaction.customer?.address}</p>
      <p>{transaction.customer?.city}</p>

      <button
        onClick={handlePay}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Pagar
      </button>
    </div>
  );
}
