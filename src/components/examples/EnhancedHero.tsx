import EnhancedHero from '../EnhancedHero';
import { useState } from 'react';

export default function EnhancedHeroExample() {
  const [search, setSearch] = useState('');
  
  return (
    <EnhancedHero 
      searchQuery={search}
      onSearchChange={setSearch}
      onSearch={() => console.log('Search:', search)}
    />
  );
}
