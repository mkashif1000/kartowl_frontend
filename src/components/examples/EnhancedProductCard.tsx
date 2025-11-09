import EnhancedProductCard from '../EnhancedProductCard';
import { mockProducts } from '@/lib/mockData';

export default function EnhancedProductCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {mockProducts.slice(0, 3).map(product => (
        <EnhancedProductCard 
          key={product.id} 
          product={product}
          onViewDetails={(id) => console.log('View details for:', id)}
        />
      ))}
    </div>
  );
}
