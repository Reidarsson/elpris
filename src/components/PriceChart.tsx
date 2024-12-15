import { useQuery } from "@tanstack/react-query";
import { getTomorrowsPrices, getTodaysPrices } from "@/utils/priceUtils";
import { useToast } from "@/components/ui/use-toast";
import { PriceChartDisplay } from "./PriceChartDisplay";
import { PriceChartPlaceholder } from "./PriceChartPlaceholder";

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
    retry: false,
    enabled: true,
    meta: {
      onError: () => {
        // Silently handle the error without logging
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

  const renderChart = (prices: any[], isLoading: boolean, title: string, message: string, showCurrentTime: boolean = false) => {
    if (isLoading) {
      return <PriceChartPlaceholder message="Loading prices..." />;
    }

    if (!prices || prices.length === 0) {
      return <PriceChartPlaceholder message={message} />;
    }

    return <PriceChartDisplay prices={prices} title={title} showCurrentTime={showCurrentTime} />;
  };

  return (
    <div className="w-full space-y-8 p-4">
      {renderChart(
        todaysPrices,
        isTodayLoading,
        `Elpris idag ${formatDate(today)}`,
        "Dagens priser är inte tillgängliga",
        true
      )}
      {renderChart(
        tomorrowsPrices,
        isTomorrowLoading,
        `Elpris imorgon ${formatDate(tomorrow)}`,
        "Morgondagens priser inte tillgängliga ännu (Normalt kl 13:00)"
      )}
    </div>
  );
};