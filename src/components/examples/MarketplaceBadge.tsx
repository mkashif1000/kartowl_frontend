import MarketplaceBadge from '../MarketplaceBadge';

export default function MarketplaceBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <MarketplaceBadge marketplace="daraz" />
      <MarketplaceBadge marketplace="temu" />
      <MarketplaceBadge marketplace="aliexpress" />
      <MarketplaceBadge marketplace="telemart" />
      <MarketplaceBadge marketplace="priceoye" />
    </div>
  );
}
