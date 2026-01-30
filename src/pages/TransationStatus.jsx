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

  // REDIRECCIÓN AUTOMÁTICA DESPUÉS DE 5 SEGUNDOS
  useEffect(() => {
    if (transaction) {
      const timer = setTimeout(() => {
        navigate("/"); // vuelve a la página principal
      }, 7000);
      return () => clearTimeout(timer); // limpiar timer si se desmonta antes
    }
  }, [transaction, navigate]);

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
        <strong>Total:</strong> $
        {transaction.quantity * transaction.product?.price}
      </p>

      <h2>Cliente</h2>
      <p>
        <strong>Nombre:</strong> {transaction.customer?.name}
      </p>
      <p>
        <strong>Email:</strong> {transaction.customer?.email}
      </p>

      {isSuccess && (
        <>
          <h2>Delivery</h2>
          <p>
            <strong>Dirección:</strong> {transaction.delivery?.address}
          </p>
          <p>
            <strong>Ciudad:</strong> {transaction.customer?.city}
          </p>
          <p>
            <strong>Estado:</strong> {transaction.delivery?.status}
          </p>
          <p>
            <strong>Entrega estimada:</strong>{" "}
            {new Date(transaction.delivery?.estimatedDelivery).toLocaleDateString("es-CO", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
          </p>
        </>
      )}

      <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
        Redirigiendo a la página principal en 7 segundos...
      </p>
    </div>
  );
}
