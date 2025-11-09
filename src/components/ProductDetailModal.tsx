import { ProductDetail } from '@shared/schema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, TrendingDown, TrendingUp } from 'lucide-react';
import MarketplaceBadge from './MarketplaceBadge';
import FakeSaleIndicator from './FakeSaleIndicator';
import PriceHistoryChart from './PriceHistoryChart';

interface ProductDetailModalProps {
  product: ProductDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductDetailModal({ product, open, onOpenChange }: ProductDetailModalProps) {
  if (!product) return null;

  const discountAmount = product.originalPrice 
    ? product.originalPrice - product.currentPrice 
    : 0;

  const priceTrend = product.currentPrice < product.averagePrice 
    ? 'below' 
    : product.currentPrice > product.averagePrice 
    ? 'above' 
    : 'average';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="modal-product-detail">
        <DialogHeader>
          <DialogTitle className="sr-only">Product Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <MarketplaceBadge marketplace={product.marketplace} />
              </div>
              
              <div className="flex items-center gap-2">
                <FakeSaleIndicator status={product.fakeSaleStatus} />
                {priceTrend === 'below' && (
                  <Badge variant="outline" className="gap-1">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span>Below Average</span>
                  </Badge>
                )}
                {priceTrend === 'above' && (
                  <Badge variant="outline" className="gap-1">
                    <TrendingUp className="w-4 h-4 text-destructive" />
                    <span>Above Average</span>
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-mono">
                    ₨{product.currentPrice.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ₨{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                {product.discount && (
                  <div className="flex gap-2">
                    <Badge className="bg-destructive text-destructive-foreground">
                      {product.discount}% OFF
                    </Badge>
                    <span className="text-green-600 font-medium">
                      Save ₨{discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{product.rating}</span>
                  </div>
                  {product.reviews && (
                    <span className="text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  )}
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stock Status:</span>
                  <span className={product.inStock ? 'text-green-600 font-medium' : 'text-destructive font-medium'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                {product.shipping && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-medium">{product.shipping}</span>
                  </div>
                )}
              </div>
              
              {product.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              )}
              
              <Button 
                className="w-full"
                size="lg"
                disabled={!product.inStock}
                asChild
              >
                <a 
                  href={product.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="link-view-deal-modal"
                >
                  View Deal on {product.marketplace}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
          
          <PriceHistoryChart
            priceHistory={product.priceHistory}
            currentPrice={product.currentPrice}
            averagePrice={product.averagePrice}
            lowestPrice={product.lowestPrice}
            highestPrice={product.highestPrice}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
