import { ElectricityPrice } from "@/components/ElectricityPrice";
import { PriceChart } from "@/components/PriceChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col items-center justify-center">
      <div className="text-center p-8 w-full max-w-4xl min-h-screen flex-grow">
        <ElectricityPrice />
        <PriceChart />
        <div className="text-primary/50 mt-4">
          App för sparsamma elnördar, 
          Med hemlig väsning, Torbjörn
        </div>
      </div>
    </div>
  );
};

export default Index;