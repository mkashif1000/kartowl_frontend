import { ProductDetail } from '@shared/schema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, TrendingDown, TrendingUp, Package, Truck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import MarketplaceBadge from './MarketplaceBadge';
import FakeSaleIndicator from './FakeSaleIndicator';
import PriceHistoryChart from './PriceHistoryChart';

interface EnhancedProductDetailModalProps {
  product: ProductDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EnhancedProductDetailModal({ product, open, onOpenChange }: EnhancedProductDetailModalProps) {
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0" data-testid="modal-product-detail" aria-describedby="product-description">
        <DialogHeader className="sr-only">
          <DialogTitle>Product Details for {product.title}</DialogTitle>
        </DialogHeader>
        <div id="product-description" className="sr-only">
          {product.description || `View detailed information about ${product.title}`}
        </div>
        
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: Image Section */}
          <div className="relative bg-gradient-to-br from-muted to-muted/50 p-4 md:p-8 lg:p-12">
            <div className="sticky top-8">
              <div className="aspect-square rounded-xl overflow-hidden bg-background shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Quick Stats */}
              <div className="mt-4 md:mt-6 grid grid-cols-2 gap-2 md:gap-3">
                <div className="bg-background/80 backdrop-blur rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold font-mono text-primary">
                    ₨{product.lowestPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Lowest Ever</div>
                </div>
                <div className="bg-background/80 backdrop-blur rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold font-mono text-muted-foreground">
                    ₨{product.averagePrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Average Price</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Details Section */}
          <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight flex-1">
                  {product.title}
                </h2>
                <MarketplaceBadge marketplace={product.marketplace} />
              </div>
              
              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <FakeSaleIndicator status={product.fakeSaleStatus} />
                {priceTrend === 'below' && (
                  <Badge variant="outline" className="gap-1 border-green-600/50 bg-green-600/10">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">Below Average Price</span>
                  </Badge>
                )}
                {priceTrend === 'above' && (
                  <Badge variant="outline" className="gap-1 border-destructive/50 bg-destructive/10">
                    <TrendingUp className="w-4 h-4 text-destructive" />
                    <span className="text-destructive font-medium">Above Average Price</span>
                  </Badge>
                )}
              </div>
            </div>
            
            <Separator />
            
            {/* Price Section */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-2 md:gap-3 flex-wrap">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                  ₨{product.currentPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">
                    ₨{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              {product.discount && (
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-destructive to-orange-600 text-white text-base px-4 py-1">
                    {product.discount}% OFF
                  </Badge>
                  <span className="text-lg font-semibold text-green-600">
                    You save ₨{discountAmount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            
            <Separator />
            
            {/* Rating & Reviews */}
            {product.rating && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-lg">
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <span className="text-2xl font-bold">{product.rating}</span>
                </div>
                {product.reviews && (
                  <div>
                    <div className="font-semibold">{product.reviews.toLocaleString()} Reviews</div>
                    <div className="text-sm text-muted-foreground">Verified buyers</div>
                  </div>
                )}
              </div>
            )}
            
            {/* Stock & Shipping Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Package className={`w-5 h-5 mt-0.5 ${product.inStock ? 'text-green-600' : 'text-destructive'}`} />
                <div>
                  <div className="font-semibold">{product.inStock ? 'In Stock' : 'Out of Stock'}</div>
                  <div className="text-sm text-muted-foreground">
                    {product.inStock ? 'Ready to ship' : 'Currently unavailable'}
                  </div>
                </div>
              </div>
              
              {product.shipping && (
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Truck className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <div className="font-semibold">{product.shipping}</div>
                    <div className="text-sm text-muted-foreground">Delivery cost</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-bold text-lg mb-2">About this product</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}
            
            <Separator />
            
            {/* CTA Button */}
            <Button 
              className="w-full h-14 text-lg bg-gradient-to-r from-primary to-chart-3 hover:opacity-90"
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
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              You'll be redirected to {product.marketplace}. We may earn a commission from your purchase.
            </p>
          </div>
        </div>
        
        {/* Price History Section - Full Width */}
        <div className="px-6 md:px-8 pb-8">
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
