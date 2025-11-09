import ProductDetailModal from '../ProductDetailModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getProductDetail } from '@/lib/mockData';

export default function ProductDetailModalExample() {
  const [open, setOpen] = useState(false);
  const product = getProductDetail('1');
  
  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>
        Open Product Detail
      </Button>
      <ProductDetailModal 
        product={product || null}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}
