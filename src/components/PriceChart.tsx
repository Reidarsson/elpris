import { useQuery } from "@tanstack/react-query";
import { getTomorrowsPrices } from "@/utils/priceUtils";
import { useToast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export const PriceChart = () => {
  const { toast } = useToast();

  const { data: prices, error, isLoading } = useQuery({
    queryKey: ['tomorrowsPrices'],
    queryFn: getTomorrowsPrices,
    retry: 3,
  });

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center text-primary/50">
        Loading prices...
      </div>
    );
  }

  if (error || !prices) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Could not fetch tomorrow's prices",
    });
    return (
      <div className="h-[300px] flex items-center justify-center text-primary/50">
        Could not load prices
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={prices}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
          <XAxis
            dataKey="hour"
            stroke="#718096"
            tickFormatter={(hour) => `${hour}:00`}
          />
          <YAxis
            stroke="#718096"
            tickFormatter={(price) => `${price.toFixed(2)} kr`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2D3748",
              border: "none",
              borderRadius: "0.5rem",
            }}
            formatter={(value: number) => [`${value.toFixed(2)} kr/kWh`, "Price"]}
            labelFormatter={(hour) => `${hour}:00`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#805AD5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};