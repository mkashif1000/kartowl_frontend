import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearch?: () => void;
}

export default function Header({ searchQuery = '', onSearchChange, onSearch }: HeaderProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/">
            <a className="flex items-center gap-2 hover-elevate px-2 py-1 rounded-md" data-testid="link-home">
              <div className="text-2xl font-bold text-primary">
                🦉 KartOwl
              </div>
            </a>
          </Link>
          
          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="search"
                placeholder="Search for products across all marketplaces..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 pr-4"
                data-testid="input-search"
              />
            </div>
          </form>
          
          <Button 
            variant="default" 
            onClick={onSearch}
            className="hidden md:flex"
            data-testid="button-search"
          >
            Search
          </Button>
        </div>
      </div>
    </header>
  );
}
