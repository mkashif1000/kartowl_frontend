import FakeSaleIndicator from '../FakeSaleIndicator';

export default function FakeSaleIndicatorExample() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <FakeSaleIndicator status="genuine" />
        <FakeSaleIndicator status="fair" />
        <FakeSaleIndicator status="suspicious" />
      </div>
      <div className="flex gap-2">
        <FakeSaleIndicator status="genuine" compact />
        <FakeSaleIndicator status="fair" compact />
        <FakeSaleIndicator status="suspicious" compact />
      </div>
    </div>
  );
}
