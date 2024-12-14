export const getCurrentPrice = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  const url = `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${day}_SE3.json`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch price data');
  }
  
  const prices = await response.json();
  const currentHour = now.getHours();
  
  return prices[currentHour]?.SEK_per_kWh * 100 || null; // Keep returning öre value for conversion in component
};

export const getTomorrowsPrices = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  
  const url = `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${day}_SE3.json`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch price data');
  }
  
  const prices = await response.json();
  return prices.map((price: { time_start: string; SEK_per_kWh: number }, index: number) => ({
    hour: index,
    price: price.SEK_per_kWh
  }));
};