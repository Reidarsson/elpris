import { useQuery } from "@tanstack/react-query";
import { getCurrentPrice } from "@/utils/priceUtils";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const ElectricityPrice = () => {
  const { toast } = useToast();

  const { data: price, error, isLoading } = useQuery({
    queryKey: ['electricityPrice'],
    queryFn: getCurrentPrice,
    refetchInterval: 60000, // Refetch every minute
    retry: 3,
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch electricity price",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-primary text-3xl md:text-4xl mb-4">Elpris just nu:</h2>
        <div className="animate-fade-in text-primary text-6xl md:text-8xl font-bold opacity-50">
          ...
        </div>
      </div>
    );
  }

  if (error || !price) {
    return (
      <div>
        <h2 className="text-primary text-3xl md:text-4xl mb-4">Elpris just nu:</h2>
        <div className="animate-fade-in text-primary text-4xl md:text-6xl font-bold opacity-50">
          Price unavailable
        </div>
      </div>
    );
  }

  // Convert from öre to kr with 2 decimal places
  const formattedPrice = typeof price === 'number' ? (price / 100).toFixed(2) : 'N/A';

  return (
    <div className="animate-fade-in">
      <h2 className="text-primary text-3xl md:text-4xl mb-4">Elpris just nu:</h2>
      <div className="text-primary text-7xl md:text-9xl font-bold tracking-tight">
        {formattedPrice}
      </div>
      <div className="text-secondary text-2xl md:text-3xl mt-4">
        kr/kWh
      </div>
    </div>
  );
};