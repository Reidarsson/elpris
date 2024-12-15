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
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch tomorrow's prices. They might not be available yet.",
        });
      }
    }
  });

  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const renderChart = () => {
    if (!prices || prices.length === 0) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-primary/50 bg-[#1A1F2C]">
          Prices for tomorrow are not available yet
        </div>
      );
    }

    return (
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
    );
  };

  return (
    <div className="w-full bg-[#1A1F2C]">
      <div className="h-[200px]"></div>
      <h2 className="text-primary text-3xl md:text-4xl mb-4">
        Elpris imorgon {formattedDate}
      </h2>
      <div className="relative w-full h-[300px] mt-8 bg-[#1A1F2C]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center text-primary/50 bg-[#1A1F2C]">
            Loading prices...
          </div>
        ) : (
          renderChart()
        )}
      </div>
    </div>
  );
};