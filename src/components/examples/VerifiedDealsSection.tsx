import VerifiedDealsSection from '../VerifiedDealsSection';

export default function VerifiedDealsSectionExample() {
  return (
    <VerifiedDealsSection 
      onViewDetails={(id) => console.log('View details for:', id)}
    />
  );
}
