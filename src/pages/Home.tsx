import { useState, useMemo } from 'react';
import { Marketplace } from '@shared/schema';
import Navbar from '@/components/Navbar';
import EnhancedHero from '@/components/EnhancedHero';
import MarketplaceShowcase from '@/components/MarketplaceShowcase';
import VerifiedDealsSection from '@/components/VerifiedDealsSection';
import FilterSidebar from '@/components/FilterSidebar';
import EnhancedProductCard from '@/components/EnhancedProductCard';
import EnhancedProductDetailModal from '@/components/EnhancedProductDetailModal';
import Footer from '@/components/Footer';
import { mockProducts, getProductDetail } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<Marketplace[]>([
    'daraz', 'temu', 'aliexpress', 'telemart', 'priceoye'
  ]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showSuspicious, setShowSuspicious] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleMarketplaceToggle = (marketplace: Marketplace) => {
    setSelectedMarketplaces(prev =>
      prev.includes(marketplace)
        ? prev.filter(m => m !== marketplace)
        : [...prev, marketplace]
    );
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'in marketplaces:', selectedMarketplaces);
    setHasSearched(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesMarketplace = selectedMarketplaces.includes(product.marketplace);
      const matchesSearch = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!showSuspicious) {
        const detail = getProductDetail(product.id);
        if (detail?.fakeSaleStatus === 'suspicious') return false;
      }
      
      return matchesMarketplace && matchesSearch;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
    }

    return filtered;
  }, [selectedMarketplaces, searchQuery, sortBy, showSuspicious]);

  const selectedProduct = selectedProductId ? (getProductDetail(selectedProductId) || null) : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />
      
      {!hasSearched && (
        <>
          <EnhancedHero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
          />
          
          <MarketplaceShowcase />
          
          <VerifiedDealsSection onViewDetails={setSelectedProductId} />
        </>
      )}
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {hasSearched && (
            <div className="flex gap-6">
              <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-24">
                  <FilterSidebar
                    selectedMarketplaces={selectedMarketplaces}
                    onMarketplaceToggle={handleMarketplaceToggle}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    showSuspicious={showSuspicious}
                    onShowSuspiciousChange={setShowSuspicious}
                  />
                </div>
              </aside>
              
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
                    </h2>
                    <p className="text-muted-foreground">
                      Found <span className="font-semibold text-primary">{filteredAndSortedProducts.length}</span> products across {selectedMarketplaces.length} marketplaces
                    </p>
                  </div>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden" data-testid="button-open-filters">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filters & Sort
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters & Sort</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <FilterSidebar
                          selectedMarketplaces={selectedMarketplaces}
                          onMarketplaceToggle={handleMarketplaceToggle}
                          sortBy={sortBy}
                          onSortChange={setSortBy}
                          showSuspicious={showSuspicious}
                          onShowSuspiciousChange={setShowSuspicious}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                
                {filteredAndSortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedProducts.map(product => (
                      <EnhancedProductCard
                        key={product.id}
                        product={product}
                        onViewDetails={setSelectedProductId}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search for something else
                    </p>
                    <Button onClick={() => {
                      setSearchQuery('');
                      setHasSearched(false);
                    }}>
                      Back to Home
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {!hasSearched && (
            <section className="py-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                    Trending Deals
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">Popular products with the best prices right now</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProducts.slice(0, 8).map(product => (
                  <EnhancedProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={setSelectedProductId}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
      
      <EnhancedProductDetailModal
        product={selectedProduct}
        open={selectedProductId !== null}
        onOpenChange={(open) => !open && setSelectedProductId(null)}
      />
    </div>
  );
}
