import Navbar from '../Navbar';
import { useState } from 'react';

export default function NavbarExample() {
  const [search, setSearch] = useState('');
  
  return (
    <Navbar 
      searchQuery={search}
      onSearchChange={setSearch}
      onSearch={() => console.log('Search:', search)}
    />
  );
}
