import { useLocation } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "#/schemas/paymentSchema.js";
import { useEffect } from "react";

export default function PaymentPage() {
  const location = useLocation();
  const { product, quantity } = location.state || {};

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
    console.log("Payment info:", data);
    alert("Datos enviados correctamente 💳");
  };

  if (!product) return <p>No hay producto seleccionado</p>;

  // Mapeo de labels en español para los campos del cliente
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("productId")} />
        <input type="hidden" {...register("quantity")} />

        <h2>Información de la tarjeta</h2>
        <div>
          <label>Número de la Tarjeta: </label>
          <input {...register("cardNumber")} />
          <p style={{ color: "red" }}>{errors.cardNumber?.message}</p>
        </div>

        <div>
          <label>Tipo de Tarjeta: </label>
          <select {...register("cardType")}>
            <option value="VISA">VISA</option>
            <option value="MASTERCARD">MASTERCARD</option>
          </select>
          <p style={{ color: "red" }}>{errors.cardType?.message}</p>
        </div>

        <div>
          <label>Expira en (MM/YY): </label>
          <input {...register("expiry")} />
          <p style={{ color: "red" }}>{errors.expiry?.message}</p>
        </div>

        <div>
          <label>CVC: </label>
          <input {...register("cvc")} />
          <p style={{ color: "red" }}>{errors.cvc?.message}</p>
        </div>

        <h2>Información del cliente</h2>
        {Object.entries(customerLabels).map(([field, label]) => (
          <div key={field}>
            <label>{label}: </label>
            <input {...register(`customer.${field}`)} />
            <p style={{ color: "red" }}>{errors.customer?.[field]?.message}</p>
          </div>
        ))}

        <button
          type="submit"
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
      </form>
    </div>
  );
}
