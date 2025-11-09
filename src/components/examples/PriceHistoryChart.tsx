import PriceHistoryChart from '../PriceHistoryChart';
import { getProductDetail } from '@/lib/mockData';

export default function PriceHistoryChartExample() {
  const productDetail = getProductDetail('1');
  
  if (!productDetail) return null;
  
  return (
    <div className="p-4">
      <PriceHistoryChart
        priceHistory={productDetail.priceHistory}
        currentPrice={productDetail.currentPrice}
        averagePrice={productDetail.averagePrice}
        lowestPrice={productDetail.lowestPrice}
        highestPrice={productDetail.highestPrice}
      />
    </div>
  );
}
