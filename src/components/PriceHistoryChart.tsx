import { PriceHistory } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PriceHistoryChartProps {
  priceHistory: PriceHistory[];
  currentPrice: number;
  averagePrice: number;
  lowestPrice: number;
  highestPrice: number;
}

export default function PriceHistoryChart({
  priceHistory,
  currentPrice,
  averagePrice,
  lowestPrice,
  highestPrice
}: PriceHistoryChartProps) {
  const chartData = priceHistory.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: item.price,
    average: averagePrice
  }));

  return (
    <Card data-testid="card-price-history">
      <CardHeader>
        <CardTitle>Price History (Last 3 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-xl font-bold font-mono">₨{currentPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average</p>
            <p className="text-xl font-bold font-mono">₨{averagePrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lowest</p>
            <p className="text-xl font-bold font-mono text-green-600">₨{lowestPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Highest</p>
            <p className="text-xl font-bold font-mono text-destructive">₨{highestPrice.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                tickFormatter={(value) => `₨${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--popover-border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [`₨${value.toLocaleString()}`, 'Price']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Price"
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Average"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
