import Hero from '../Hero';
import { useState } from 'react';
import { Marketplace } from '@shared/schema';

export default function HeroExample() {
  const [search, setSearch] = useState('');
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>(['daraz', 'priceoye']);
  
  const handleToggle = (marketplace: Marketplace) => {
    setMarketplaces(prev => 
      prev.includes(marketplace)
        ? prev.filter(m => m !== marketplace)
        : [...prev, marketplace]
    );
  };
  
  return (
    <Hero 
      searchQuery={search}
      onSearchChange={setSearch}
      selectedMarketplaces={marketplaces}
      onMarketplaceToggle={handleToggle}
      onSearch={() => console.log('Search:', search, marketplaces)}
    />
  );
}
