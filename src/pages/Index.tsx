import { ElectricityPrice } from "@/components/ElectricityPrice";
import { PriceChart } from "@/components/PriceChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col items-center justify-center">
      <div className="text-center p-8 w-full max-w-4xl min-h-screen flex-grow">
        <ElectricityPrice />
        <PriceChart />
      </div>
      <footer className="w-full bg-primary/10 text-primary/50 p-4 text-center">
        App för sparsamma elnördar, 
        Med hemlig väsning, Torbjörn
      </footer>
    </div>
  );
};

export default Index;