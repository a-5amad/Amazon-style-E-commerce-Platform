import { formatCurrency } from "../scripts/utils/money.js";

console.log("Testing formatCurrency(): ");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed!");
} else {
  console.log("failed");
}
