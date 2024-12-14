import { ElectricityPrice } from "@/components/ElectricityPrice";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center">
      <div className="text-center p-8">
        <ElectricityPrice />
      </div>
    </div>
  );
};

export default Index;