import { Search, TrendingDown, Shield, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Marketplace } from '@shared/schema';

interface HeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedMarketplaces?: Marketplace[];
  onMarketplaceToggle?: (marketplace: Marketplace) => void;
  onSearch?: () => void;
}

const marketplaces: { id: Marketplace; name: string }[] = [
  { id: 'daraz', name: 'Daraz' },
  { id: 'temu', name: 'Temu' },
  { id: 'aliexpress', name: 'AliExpress' },
  { id: 'telemart', name: 'Telemart' },
  { id: 'priceoye', name: 'PriceoYe' }
];

export default function Hero({
  searchQuery = '',
  onSearchChange,
  selectedMarketplaces = [],
  onMarketplaceToggle,
  onSearch
}: HeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Search Smarter. Save More.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare prices across Pakistani marketplaces and detect fake sales with historical price data
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <Input
                type="search"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-14 pr-4 h-14 text-lg"
                data-testid="input-hero-search"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {marketplaces.map((marketplace) => (
                <label
                  key={marketplace.id}
                  className="flex items-center gap-2 cursor-pointer hover-elevate px-3 py-2 rounded-md"
                  data-testid={`label-marketplace-${marketplace.id}`}
                >
                  <Checkbox
                    checked={selectedMarketplaces.includes(marketplace.id)}
                    onCheckedChange={() => onMarketplaceToggle?.(marketplace.id)}
                    data-testid={`checkbox-marketplace-${marketplace.id}`}
                  />
                  <span className="text-sm font-medium">{marketplace.name}</span>
                </label>
              ))}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full md:w-auto px-8"
              data-testid="button-hero-search"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Products
            </Button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Compare 5+ Marketplaces</h3>
              <p className="text-sm text-muted-foreground">Find the lowest price instantly</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Detect Fake Sales</h3>
              <p className="text-sm text-muted-foreground">3-month price history tracking</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Save on Every Purchase</h3>
              <p className="text-sm text-muted-foreground">Affiliate links support our service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
