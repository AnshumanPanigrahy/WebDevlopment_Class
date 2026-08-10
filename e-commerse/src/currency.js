const USD_TO_INR = 83;

export function formatRupees(usdAmount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(usdAmount * USD_TO_INR);
}
