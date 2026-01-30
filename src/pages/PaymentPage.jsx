import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "#/schemas/paymentSchema.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processPayment, resetPaymentState } from "#/features/payment/paymentSlice.js";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity } = location.state || {};

  const dispatch = useDispatch();
  const { loading, success, error, paymentResponse } = useSelector(
    (state) => state.payment || {}
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      productId: product?.id || "",
      quantity: quantity || 1,
      customer: { cedula: "", name: "", email: "", address: "", city: "", phone: "" },
      cardNumber: "",
      cardType: "VISA",
      expiry: "",
      cvc: "",
    },
  });

  // Detecta automáticamente el tipo de tarjeta
  const cardNumber = useWatch({ control, name: "cardNumber" });

  useEffect(() => {
    if (!cardNumber) return;
    if (cardNumber.startsWith("4")) setValue("cardType", "VISA");
    else if (cardNumber.startsWith("5")) setValue("cardType", "MASTERCARD");
  }, [cardNumber, setValue]);

  const onSubmit = (data) => {
    const body = {
      paymentInfo: {
        cardNumber: data.cardNumber,
        cardType: data.cardType,
        expiry: data.expiry,
        cvc: data.cvc,
        customer: data.customer,
        productId: data.productId,
        quantity: data.quantity,
      },
    };

    dispatch(processPayment(body));
  };

  // Resetear estado al desmontar
  useEffect(() => {
    return () => dispatch(resetPaymentState());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && success && paymentResponse) {
      navigate("/summary", { state: { transactionId: paymentResponse.id } });
    }
  }, [loading, success, paymentResponse, navigate]);

  if (!product) return <p>No hay producto seleccionado</p>;

  const customerLabels = {
    cedula: "Cédula",
    name: "Nombre completo",
    email: "Correo electrónico",
    address: "Dirección",
    city: "Ciudad",
    phone: "Teléfono",
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Pagar: {product.name}</h1>

      {loading && <p>Cargando...</p>}
      {success && <p style={{ color: "green" }}>Pago realizado con éxito 💳</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("productId")} />
        <input type="hidden" {...register("quantity")} />

        <h2>Información de la tarjeta</h2>
        <div>
          <label>Número de la Tarjeta:</label>
          <input {...register("cardNumber")} />
          <p style={{ color: "red" }}>{errors.cardNumber?.message}</p>
        </div>

        <div>
          <label>Tipo de Tarjeta:</label>
          <select {...register("cardType")}>
            <option value="VISA">VISA</option>
            <option value="MASTERCARD">MASTERCARD</option>
          </select>
          <p style={{ color: "red" }}>{errors.cardType?.message}</p>
        </div>

        <div>
          <label>Expira en (MM/YY):</label>
          <input
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            {...register("expiry")}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // solo números
              if (value.length > 4) value = value.slice(0, 4); // máximo 4 dígitos
              if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2); // pone /
              setValue("expiry", value); // actualiza react-hook-form
            }}
          />
          <p style={{ color: "red" }}>{errors.expiry?.message}</p>
        </div>

        <div>
          <label>CVC:</label>
          <input {...register("cvc")} />
          <p style={{ color: "red" }}>{errors.cvc?.message}</p>
        </div>

        <h2>Información del cliente</h2>
        {Object.entries(customerLabels).map(([field, label]) => (
          <div key={field}>
            <label>{label}:</label>
            <input {...register(`customer.${field}`)} />
            <p style={{ color: "red" }}>{errors.customer?.[field]?.message}</p>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="payment-button"
        >
          {loading ? (
            <>
              <span className="spinner"></span>Procesando...
            </>
          ) : (
            "Continuar con el Pago"
          )}
        </button>
            </form>
          </div>
        );
}
