import { Product } from '@shared/schema';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, TrendingDown } from 'lucide-react';
import MarketplaceBadge from './MarketplaceBadge';

interface EnhancedProductCardProps {
  product: Product;
  onViewDetails?: (productId: string) => void;
}

export default function EnhancedProductCard({ product, onViewDetails }: EnhancedProductCardProps) {
  const discountAmount = product.originalPrice 
    ? product.originalPrice - product.currentPrice 
    : 0;

  return (
    <Card 
      className="group overflow-hidden hover-elevate active-elevate-2 transition-all border-2 hover:border-primary/50 cursor-pointer h-full flex flex-col" 
      data-testid={`card-product-${product.id}`}
      onClick={() => onViewDetails?.(product.id)}
    >
      <div className="relative overflow-hidden">
        {/* Marketplace Badge */}
        <div className="absolute top-3 right-3 z-10">
          <MarketplaceBadge marketplace={product.marketplace} size="sm" />
        </div>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-gradient-to-r from-destructive to-orange-600 text-white shadow-lg">
              <TrendingDown className="w-3 h-3 mr-1" />
              {product.discount}% OFF
            </Badge>
          </div>
        )}
        
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>
      
      <CardContent className="p-3 md:p-4 space-y-3 flex-1">
        <h3 
          className="font-semibold text-base line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors"
          data-testid={`text-product-title-${product.id}`}
        >
          {product.title}
        </h3>
        
        <div className="space-y-2">
          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-bold font-mono bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent" data-testid={`text-price-${product.id}`}>
              ₨{product.currentPrice.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₨{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Savings */}
          {discountAmount > 0 && (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 rounded-md text-sm font-medium">
              <TrendingDown className="w-3 h-3" />
              Save ₨{discountAmount.toLocaleString()}
            </div>
          )}
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 text-sm">
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 rounded-md">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              {product.reviews && (
                <span className="text-muted-foreground">({product.reviews})</span>
              )}
            </div>
          )}
          
          {/* Stock & Shipping */}
          <div className="flex items-center justify-between text-xs pt-2 border-t">
            <Badge variant={product.inStock ? "outline" : "destructive"} className="text-xs">
              {product.inStock ? '✓ In Stock' : 'Out of Stock'}
            </Badge>
            {product.shipping && (
              <span className="text-muted-foreground font-medium">{product.shipping}</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 md:p-4 pt-0 gap-2 flex-wrap">
        <Button 
          variant="outline" 
          className="flex-1 min-w-[120px]"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.(product.id);
          }}
          data-testid={`button-view-details-${product.id}`}
        >
          Details
        </Button>
        <Button 
          className="flex-1 min-w-[120px] bg-gradient-to-r from-primary to-chart-3 hover:opacity-90"
          disabled={!product.inStock}
          asChild
          onClick={(e) => e.stopPropagation()}
        >
          <a 
            href={product.affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid={`link-view-deal-${product.id}`}
          >
            View Deal
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
