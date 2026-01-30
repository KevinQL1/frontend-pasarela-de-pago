import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransaction,
  resetTransactionState,
} from "#/features/webhookStatus/webhookSlice.js";

export default function FinalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { transaction, loading, error } = useSelector(
    (state) => state.webhook || {}
  );

  const transactionId = location.state?.transactionId;

  useEffect(() => {
    if (!transactionId) {
      navigate("/"); // Si no hay ID, volvemos al inicio
      return;
    }

    dispatch(fetchTransaction(transactionId));

    return () => dispatch(resetTransactionState());
  }, [dispatch, transactionId, navigate]);

  if (loading) return <p>Cargando resultado de pago...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>
        {typeof error === "string" ? error : JSON.stringify(error)}
      </p>
    );
  if (!transaction) return null;

  const isSuccess = transaction.status === "APPROVED";

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{isSuccess ? "Pago Exitoso ✅" : "Pago Rechazado ❌"}</h1>
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
        <strong>Total:</strong> ${transaction.quantity * transaction.product?.price}
      </p>

      <h2>Cliente</h2>
      <p>{transaction.customer?.name}</p>
      <p>{transaction.customer?.email}</p>

      {isSuccess && (
        <>
          <h2>Delivery</h2>
          <p>{transaction.delivery?.address}</p>
          <p>{transaction.customer?.city}</p>
          <p>{transaction.delivery?.status}</p>
          <p>{transaction.delivery?.estimatedDelivery}</p>
        </>
      )}
    </div>
  );
}
