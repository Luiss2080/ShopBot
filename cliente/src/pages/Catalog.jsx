import ProductList from '../components/ProductList';

export default function Catalog({ loadCart }) {
  return (
    <div className="pt-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Catálogo Completo</h1>
        <p className="text-slate-500 mt-2 text-lg">Explora todos nuestros productos tecnológicos disponibles.</p>
      </div>
      
      <ProductList onAddToCart={loadCart} />
    </div>
  );
}
