import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "#/features/product/productSlice.js";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.product);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  // Muestra productos con stock > 0
  const availableProducts = products.filter((p) => p.stock > 0);

  // Manejador de cambios en el input
  const handleQuantityChange = (productId, value, max) => {
    // Permite campo vacío temporal
    if (value === "") {
      setQuantities({ ...quantities, [productId]: "" });
      return;
    }

    // Solo números del 0 al 9
    const cleanedValue = value.replace(/[^0-9]/g, "");

    let qty = parseInt(cleanedValue);
    if (isNaN(qty) || qty < 1) qty = 1;
    if (qty > max) qty = max;

    setQuantities({ ...quantities, [productId]: qty });
  };

  // Compra del producto
  const handleBuy = (product) => {
    let quantity = quantities[product.id];

    // El input está vacío o inválido, pone 1
    if (!quantity || quantity < 1) quantity = 1;

    navigate("/payment", { state: { product, quantity } });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Productos disponibles</h1>
      {availableProducts.length === 0 && <p>No hay productos disponibles</p>}

      {availableProducts.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>
            <strong>Precio:</strong> ${product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <label>
            Cantidad:{" "}
            <input
              type="text"
              value={
                quantities[product.id] === ""
                  ? ""
                  : quantities[product.id] || 1
              }
              onChange={(e) =>
                handleQuantityChange(product.id, e.target.value, product.stock)
              }
              style={{ width: "60px", marginRight: "1rem" }}
            />
          </label>

          <button
            onClick={() => handleBuy(product)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Comprar
          </button>
        </div>
      ))}
    </div>
  );
}
