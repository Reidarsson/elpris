interface PriceChartPlaceholderProps {
  message: string;
}

export const PriceChartPlaceholder = ({ message }: PriceChartPlaceholderProps) => {
  return (
    <div className="w-full h-[300px] flex items-center justify-center text-primary/50 bg-[#1A1F2C] rounded-lg">
      {message}
    </div>
  );
};