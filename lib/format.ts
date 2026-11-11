import { site } from "./site";

export function formatPrice(value: number): string {
  const n = Number.isInteger(value)
    ? value.toString()
    : value.toFixed(2).replace(".", ",");
  return `${n} ${site.currency}`;
}
