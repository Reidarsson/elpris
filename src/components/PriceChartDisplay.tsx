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

interface PriceChartDisplayProps {
  prices: any[];
  title: string;
  showCurrentTime?: boolean;
}

export const PriceChartDisplay = ({ prices, title, showCurrentTime }: PriceChartDisplayProps) => {
  const getCurrentHour = () => {
    return new Date().getHours();
  };

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
            {showCurrentTime && (
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