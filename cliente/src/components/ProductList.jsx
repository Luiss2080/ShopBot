import { useEffect, useState } from 'react';
import { productAPI, cartAPI } from '../services/api';

export default function ProductList({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll()
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (id) => {
    try {
      await cartAPI.addItem(id, 1);
      onAddToCart(); // Refrescar carrito
    } catch (error) {
      console.error('Error al agregar', error);
    }
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="product-grid">
      {productos.map(producto => (
        <div key={producto.id} className="product-card">
          <h3 className="product-title">{producto.nombre}</h3>
          <p className="product-desc">{producto.descripcion}</p>
          <div className="product-footer">
            <span className="price">${producto.precio.toFixed(2)}</span>
            <button className="btn-primary" onClick={() => handleAddToCart(producto.id)}>
              Agregar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
