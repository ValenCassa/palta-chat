export const formatCurrency = (
  amount: number,
  maximumFractionDigits: number = 3,
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maximumFractionDigits,
  }).format(amount);
};
