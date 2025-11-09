import { Search, TrendingDown, Shield, Zap, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EnhancedHeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearch?: () => void;
}

export default function EnhancedHero({
  searchQuery = '',
  onSearchChange,
  onSearch
}: EnhancedHeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-chart-3/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-chart-3/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge className="mx-auto bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Pakistan's Smart Price Comparison Platform
          </Badge>
          
          {/* Heading */}
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-chart-3 to-primary bg-clip-text text-transparent">
                Search Smarter.
              </span>
              <br />
              <span className="text-foreground">Save More.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
              Compare prices across 5+ Pakistani marketplaces and never overpay again
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-chart-3 rounded-lg blur opacity-25 group-hover:opacity-40 transition"></div>
              <div className="relative flex items-center bg-background rounded-lg border-2 border-muted focus-within:border-primary transition-colors">
                <Search className="ml-4 text-muted-foreground w-6 h-6 flex-shrink-0" />
                <Input
                  type="search"
                  placeholder="What product are you looking for?"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="border-0 h-14 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                  data-testid="input-enhanced-hero-search"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="mr-2 hidden sm:flex"
                  data-testid="button-enhanced-hero-search"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full sm:hidden"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Products
            </Button>
          </form>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {[
              {
                icon: TrendingDown,
                title: '5+ Marketplaces',
                description: 'Search once, compare everywhere',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Shield,
                title: 'Fake Sale Detection',
                description: 'Know the real value with price history',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Zap,
                title: 'Always Updated',
                description: 'Real-time prices from all stores',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="group p-6 rounded-xl bg-card border hover-elevate transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
