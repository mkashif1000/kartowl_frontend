import FilterSidebar from '../FilterSidebar';
import { useState } from 'react';
import { Marketplace } from '@shared/schema';

export default function FilterSidebarExample() {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>(['daraz', 'priceoye']);
  const [sortBy, setSortBy] = useState('relevance');
  const [showSuspicious, setShowSuspicious] = useState(true);
  
  const handleToggle = (marketplace: Marketplace) => {
    setMarketplaces(prev => 
      prev.includes(marketplace)
        ? prev.filter(m => m !== marketplace)
        : [...prev, marketplace]
    );
  };
  
  return (
    <div className="p-4 max-w-sm">
      <FilterSidebar
        selectedMarketplaces={marketplaces}
        onMarketplaceToggle={handleToggle}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showSuspicious={showSuspicious}
        onShowSuspiciousChange={setShowSuspicious}
      />
    </div>
  );
}
