// Global total amount from meter
let totalAmount = 0;

function calculate() {
  // METER VALUES
  const open1 = Number(document.getElementById("open1").value) || 0;
  const open2 = Number(document.getElementById("open2").value) || 0;
  const close1 = Number(document.getElementById("close1").value) || 0;
  const close2 = Number(document.getElementById("close2").value) || 0;
  const price = Number(document.getElementById("price").value) || 0;

  // PER FACE CALCULATION
  const litres1 = close1 - open1;
  const litres2 = close2 - open2;

  const totalLitres = litres1 + litres2;
  totalAmount = totalLitres * price;

  // UPDATE METER RESULT UI
  document.getElementById("result").innerHTML = `
    Litres (Face 1): ${litres1} <br>
    Litres (Face 2): ${litres2} <br><br>
    <hr>
    <strong>Total Litres: ${totalLitres}</strong><br>
    <strong>Total Amount: ₦${totalAmount.toLocaleString()}</strong>
  `;

  // UPDATE CASH AFTER METER CALC
  calculateCash();
}

function calculateCash() {
  // PAYMENT MODES
  const voucher = Number(document.getElementById("voucher").value) || 0;
  const vita = Number(document.getElementById("vita").value) || 0;
  const gtbpos = Number(document.getElementById("gtbpos").value) || 0;
  const pbpos = Number(document.getElementById("pbpos").value) || 0;
  const pbtf = Number(document.getElementById("pbtf").value) || 0;
  const gtbtf = Number(document.getElementById("gtbtf").value) || 0;

  // TOTAL NON-CASH
  const nonCashTotal =
    voucher + vita + gtbpos + pbpos + pbtf + gtbtf;

  // FINAL CASH
  const totalCash = totalAmount - nonCashTotal;

  // TARGET THE "Total cash" TEXT (NO ID NEEDED)
  const cashDisplay = document.querySelector(
    ".container:last-of-type strong"
  );

  cashDisplay.innerText =
    "Total cash: ₦" + totalCash.toLocaleString();
}

// ADD LIVE KEYUP TO PAYMENT INPUTS
document.addEventListener("DOMContentLoaded", () => {
  const paymentInputs = [
    "voucher",
    "vita",
    "gtbpos",
    "pbpos",
    "pbtf",
    "gtbtf"
  ];

  paymentInputs.forEach(id => {
    document.getElementById(id).addEventListener("keyup", calculateCash);
  });
});