export function formatCurrency(value) {
  return (value / 100).toFixed(2);
}

export function calTotalUnitPrice(quantity, unit, unitPrice) {
  let total;
  if (unit === "kg") {
    total = quantity * unitPrice * 1000;
  } else if (unit === "dozon") {
    total = quantity * unitPrice * 12;
  } else if (unit === "pkt") {
    total = quantity * unitPrice * 10;
  } else if (unit === "case") {
    total = quantity * unitPrice * 24;
  } else {
    total = quantity * unitPrice;
  }
  return formatCurrency(total);
}
