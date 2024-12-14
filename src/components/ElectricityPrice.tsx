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
      <div className="animate-fade-in text-primary text-6xl md:text-8xl font-bold opacity-50">
        ...
      </div>
    );
  }

  if (error || price === null) {
    return (
      <div className="animate-fade-in text-primary text-4xl md:text-6xl font-bold opacity-50">
        Price unavailable
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-primary text-7xl md:text-9xl font-bold tracking-tight">
        {price.toFixed(2)}
      </div>
      <div className="text-secondary text-2xl md:text-3xl mt-4">
        öre/kWh
      </div>
    </div>
  );
};