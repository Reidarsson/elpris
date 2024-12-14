import { ElectricityPrice } from "@/components/ElectricityPrice";
import { PriceChart } from "@/components/PriceChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center">
      <div className="text-center p-8 w-full max-w-4xl">
        <ElectricityPrice />
        <PriceChart />
      </div>
    </div>
  );
};

export default Index;