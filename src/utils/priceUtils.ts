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
  
  return prices[currentHour]?.SEK_per_kWh * 100 || null; // Convert to öre
};