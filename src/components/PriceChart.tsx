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
  ResponsiveContainer,
  ReferenceLine
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

  const { data: tomorrowsPrices, isLoading: isTomorrowLoading, error: tomorrowPricesError } = useQuery({
    queryKey: ['tomorrowsPrices'],
    queryFn: getTomorrowsPrices,
    retry: 3,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Morgondagens priser inte tillgängliga ännu (Normalt kl 13:00)",
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

  const getCurrentHour = () => {
    return new Date().getHours();
  };

  const renderChart = (prices: any[], isLoading: boolean, title: string, message: string, error?: Error | null) => {
    if (isLoading) {
      return (
        <div className="w-full h-[300px] flex items-center justify-center text-primary/50 bg-[#1A1F2C] rounded-lg">
          Loading prices...
        </div>
      );
    }

    if (error || !prices || prices.length === 0) {
      return (
        <div className="w-full h-[300px] flex items-center justify-center text-primary/50 bg-[#1A1F2C] rounded-lg">
          {message}
        </div>
      );
    }

    return (
      <div className="w-full bg-[#1A1F2C] p-4 rounded-lg">
        <h2 className="text-primary text-2xl font-semibold mb-4">
          {title}
        </h2>
        <div className="w-full h-[300px]">
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
              {title.includes('idag') && (
                <ReferenceLine
                  x={getCurrentHour()}
                  stroke="red"
                  strokeWidth={2}
                  label={{
                    value: 'Nu',
                    position: 'top',
                    fill: 'red'
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-8 p-4">
      {renderChart(
        todaysPrices,
        isTodayLoading,
        `Elpris idag ${formatDate(today)}`,
        "Dagens priser är inte tillgängliga"
      )}
      {renderChart(
        tomorrowsPrices,
        isTomorrowLoading,
        `Elpris imorgon ${formatDate(tomorrow)}`,
        "Morgondagens priser inte tillgängliga ännu (Normalt kl 13:00)",
        tomorrowPricesError
      )}
    </div>
  );
};
