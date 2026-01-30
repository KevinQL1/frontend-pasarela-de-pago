import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '#/features/product/productSlice.js';

/**
 * Página principal
 * Muestra los productos disponibles
 */
export default function ProductPage() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Estados visuales
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filtramos productos con stock > 0
  const availableProducts = products.filter((product) => product.stock > 0);

  const handleBuy = (product) => {
    // Aquí iría la lógica de compra, por ejemplo redirigir a un checkout
    alert(`Compraste: ${product.name}`);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Productos disponibles</h1>

      {availableProducts.length === 0 && <p>No hay productos disponibles</p>}

      {availableProducts.map((product) => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ddd',
            padding: '1rem',
            marginBottom: '1rem'
          }}
        >
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          
          {/* Botón de compra */}
          <button 
            onClick={() => handleBuy(product)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Comprar
          </button>
        </div>
      ))}
    </div>
  );
}
