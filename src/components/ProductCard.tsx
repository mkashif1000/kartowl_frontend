import { Product } from '@shared/schema';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink } from 'lucide-react';
import MarketplaceBadge from './MarketplaceBadge';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (productId: string) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const discountAmount = product.originalPrice 
    ? product.originalPrice - product.currentPrice 
    : 0;

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all" data-testid={`card-product-${product.id}`}>
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <MarketplaceBadge marketplace={product.marketplace} size="sm" />
        </div>
        {product.discount && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-destructive text-destructive-foreground">
              -{product.discount}%
            </Badge>
          </div>
        )}
        <div className="aspect-square bg-muted">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 
          className="font-medium text-base line-clamp-2 mb-2 min-h-[3rem]"
          data-testid={`text-product-title-${product.id}`}
        >
          {product.title}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono" data-testid={`text-price-${product.id}`}>
              ₨{product.currentPrice.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₨{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {discountAmount > 0 && (
            <p className="text-sm text-green-600 font-medium">
              Save ₨{discountAmount.toLocaleString()}
            </p>
          )}
          
          {product.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              {product.reviews && (
                <span className="text-muted-foreground">({product.reviews})</span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className={product.inStock ? 'text-green-600' : 'text-destructive'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.shipping && (
              <span className="text-muted-foreground">{product.shipping}</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onViewDetails?.(product.id)}
          data-testid={`button-view-details-${product.id}`}
        >
          View Details
        </Button>
        <Button 
          className="flex-1"
          disabled={!product.inStock}
          asChild
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
