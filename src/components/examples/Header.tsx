import Header from '../Header';
import { useState } from 'react';

export default function HeaderExample() {
  const [search, setSearch] = useState('');
  
  return (
    <Header 
      searchQuery={search}
      onSearchChange={setSearch}
      onSearch={() => console.log('Search:', search)}
    />
  );
}
