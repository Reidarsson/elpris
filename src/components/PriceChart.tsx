import { useQuery } from "@tanstack/react-query";
import { getTomorrowsPrices, getTodaysPrices } from "@/utils/priceUtils";
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

  const { data: todaysPrices, isLoading: isTodayLoading } = useQuery({
    queryKey: ['todaysPrices'],
    queryFn: getTodaysPrices,
    retry: 3,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch today's prices.",
        });
      }
    }
  });

  const { data: tomorrowsPrices, isLoading: isTomorrowLoading } = useQuery({
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

  // Get today's and tomorrow's dates
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('sv-SE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderChart = (prices: any[], isLoading: boolean, title: string, message: string) => {
    if (isLoading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-primary/50 bg-[#1A1F2C]">
          Loading prices...
        </div>
      );
    }

    if (!prices || prices.length === 0) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-primary/50 bg-[#1A1F2C]">
          {message}
        </div>
      );
    }

    return (
      <>
        <h2 className="text-primary text-3xl md:text-4xl mb-4">
          {title}
        </h2>
        <div className="relative w-full h-[300px] mt-8 bg-[#1A1F2C]">
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
      </>
    );
  };

  return (
    <div className="w-full bg-[#1A1F2C]">
      <div className="h-[50px]"></div>
      {renderChart(
        todaysPrices,
        isTodayLoading,
        `Elpris idag ${formatDate(today)}`,
        "Dagens priser är inte tillgängliga"
      )}
      <div className="h-[50px]"></div>
      {renderChart(
        tomorrowsPrices,
        isTomorrowLoading,
        `Elpris imorgon ${formatDate(tomorrow)}`,
        "Priserna för imorgon sätts kl 13:00"
      )}
    </div>
  );
};