import * as yup from "yup";

export const paymentSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("El número de tarjeta es requerido")
    .matches(/^[0-9]{13,19}$/, "El número de tarjeta no es válido"),
  cardType: yup
    .string()
    .required("El tipo de tarjeta es requerido")
    .oneOf(["VISA", "MASTERCARD"], "Tipo de tarjeta no válido"),
  expiry: yup
    .string()
    .required("Expiry es requerido")
    .matches(/^\d{2}\/\d{2}$/, "Expiry debe tener formato MM/YY")
    .test("expiry-valid", "Mes/Año inválido", (value) => {
      if (!value) return false;
      const [month, year] = value.split("/").map(Number);
      return month >= 1 && month <= 12 && year >= 26 && year <= 50;
    }),
  cvc: yup
    .string()
    .required("CVC es requerido")
    .matches(/^\d{3}$/, "CVC debe ser de 3 dígitos"),
  customer: yup.object({
    cedula: yup
      .string()
      .required("La cédula del cliente es requerida")
      .matches(/^\d+$/, "La cédula solo puede contener números")
      .min(6, "La cédula es muy corta")
      .max(10, "La cédula es muy larga"),
    name: yup
      .string()
      .required("El nombre del cliente es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre debe tener máximo 100 caracteres"),
    email: yup
      .string()
      .required("El email del cliente es requerido")
      .email("El email no es válido"),
    address: yup
      .string()
      .required("La dirección del cliente es requerida")
      .min(5, "La dirección es muy corta")
      .max(200, "La dirección es muy larga"),
    city: yup
      .string()
      .required("La ciudad del cliente es requerida")
      .min(2, "La ciudad es muy corta")
      .max(100, "La ciudad es muy larga"),
    phone: yup
      .string()
      .required("El teléfono del cliente es requerido")
      .matches(/^\d{10,13}$/, "El teléfono debe tener entre 10 y 13 dígitos"),
  }),
  productId: yup
    .string()
    .required("El productId del cliente es requerido")
    .min(17)
    .max(20),
  quantity: yup
    .number()
    .required("El quantity del cliente es requerido")
    .integer()
    .min(1)
    .max(99),
});
