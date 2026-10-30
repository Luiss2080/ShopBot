import { useParams } from 'react-router-dom';
import VistaDetalleProducto from '../modulos/catalogo/componentes/VistaDetalleProducto';

export default function DetalleProducto({ loadCart }) {
  const { id } = useParams();

  return (
    <div className="min-h-[75vh]">
      <VistaDetalleProducto idProducto={id} onAddToCart={loadCart} />
    </div>
  );
}

