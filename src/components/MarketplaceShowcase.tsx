import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

const marketplaces = [
  {
    name: 'Daraz',
    description: 'Pakistan\'s largest online marketplace',
    color: 'from-orange-500 to-orange-600',
    icon: '🛍️'
  },
  {
    name: 'Temu',
    description: 'Affordable products with global shipping',
    color: 'from-blue-500 to-blue-600',
    icon: '🌐'
  },
  {
    name: 'AliExpress',
    description: 'International marketplace with variety',
    color: 'from-red-500 to-red-600',
    icon: '🌏'
  },
  {
    name: 'Telemart',
    description: 'Electronics and gadgets specialist',
    color: 'from-green-500 to-green-600',
    icon: '📱'
  },
  {
    name: 'PriceoYe',
    description: 'Best prices on tech products',
    color: 'from-purple-500 to-purple-600',
    icon: '💻'
  }
];

export default function MarketplaceShowcase() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Trusted Marketplaces
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compare Prices Across 5+ Marketplaces
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We search all major Pakistani online stores to find you the best deals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {marketplaces.map((marketplace, index) => (
            <Card 
              key={marketplace.name} 
              className="group hover-elevate active-elevate-2 transition-all cursor-pointer overflow-hidden"
              data-testid={`card-marketplace-${marketplace.name.toLowerCase()}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${marketplace.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {marketplace.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{marketplace.name}</h3>
                  <p className="text-sm text-muted-foreground">{marketplace.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="font-medium">Real-time price tracking • Historical data • Fake sale detection</span>
          </div>
        </div>
      </div>
    </section>
  );
}
