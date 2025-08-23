export function formatCurrency(value) {
  return (value / 100).toFixed(2);
}

export function calTotalUnitPrice(unit, unitPrice) {
  return unit * unitPrice;
}
