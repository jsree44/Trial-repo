// Shared coupon math, used anywhere a coupon needs to adjust a price
// (Orders page, Coupons preview, checkout later, etc).
//
// Amounts across this app are stored as formatted strings like "₹4,500"
// rather than plain numbers, so these helpers convert both ways.

export function parseCurrency(value) {
  if (typeof value === "number") return value;
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
}

export function formatCurrency(amount) {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

// Returns the discount amount (as a number), not the final price.
export function calculateDiscount(amount, coupon) {
  if (!coupon) return 0;

  const numericAmount = parseCurrency(amount);

  if (coupon.discountType === "Percentage") {
    return (numericAmount * coupon.discountValue) / 100;
  }

  // Fixed-amount coupons never discount more than the order is worth.
  return Math.min(coupon.discountValue, numericAmount);
}

// Returns the final price after discount, formatted as "₹X,XXX".
export function getDiscountedAmount(amount, coupon) {
  const numericAmount = parseCurrency(amount);
  const discount = calculateDiscount(amount, coupon);
  return formatCurrency(numericAmount - discount);
}

// Convenience: does this coupon still have uses left and is it not expired?
export function isCouponValid(coupon, today = new Date()) {
  if (!coupon) return false;
  if (coupon.status !== "Active") return false;
  if (coupon.usageLimit && coupon.used >= coupon.usageLimit) return false;
  if (coupon.expiryDate && new Date(coupon.expiryDate) < today) return false;
  return true;
}
