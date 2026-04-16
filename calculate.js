// Global total amount from meter
let totalAmount = 0;

function formatInput(input) {
  // Remove any existing commas
  let value = input.value.replace(/,/g, '');
  
  // Allow empty input or input ending with a single decimal point
  if (value === '' || value === '.') {
    return;
  }
  
  // If the value ends with a decimal point, don't format yet
  if (value.endsWith('.')) {
    return;
  }
  
  // Check if it's a valid number
  if (!isNaN(value) && value !== '') {
    // Split into integer and decimal parts to preserve decimal formatting
    let parts = value.split('.');
    let integerPart = Number(parts[0]).toLocaleString();
    let decimalPart = parts[1] ? '.' + parts[1] : '';
    input.value = integerPart + decimalPart;
  }
}

function calculate() {
  // METER VALUES - parse formatted input (remove commas)
  const open1 = Number(document.getElementById("open1").value.replace(/,/g, '')) || 0;
  const open2 = Number(document.getElementById("open2").value.replace(/,/g, '')) || 0;
  const close1 = Number(document.getElementById("close1").value.replace(/,/g, '')) || 0;
  const close2 = Number(document.getElementById("close2").value.replace(/,/g, '')) || 0;
  const price = Number(document.getElementById("price").value.replace(/,/g, '')) || 0;

  // PER FACE CALCULATION
  const litres1 = close1 - open1;
  const litres2 = close2 - open2;

  const totalLitres = litres1 + litres2;
  totalAmount = totalLitres * price;

  // UPDATE METER RESULT UI
  document.getElementById("result").innerHTML = `
    Litres (Face 1): ${litres1.toLocaleString()} <br>
    Litres (Face 2): ${litres2.toLocaleString()} <br><br>
    <hr>
    <strong>Total Litres: ${totalLitres.toLocaleString()}</strong><br>
    <strong>Total Amount: ₦${totalAmount.toLocaleString()}</strong>
  `;

  // UPDATE CASH AFTER METER CALC
  calculateCash();
}

function calculateCash() {
  // PAYMENT MODES - parse formatted input (remove commas)
  const voucher = Number(document.getElementById("voucher").value.replace(/,/g, '')) || 0;
  const vita = Number(document.getElementById("vita").value.replace(/,/g, '')) || 0;
  const gtbpos = Number(document.getElementById("gtbpos").value.replace(/,/g, '')) || 0;
  const pbpos = Number(document.getElementById("pbpos").value.replace(/,/g, '')) || 0;
  const pbtf = Number(document.getElementById("pbtf").value.replace(/,/g, '')) || 0;
  const gtbtf = Number(document.getElementById("gtbtf").value.replace(/,/g, '')) || 0;

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
  // Meter inputs
  const meterInputs = ["open1", "open2", "close1", "close2", "price"];
  meterInputs.forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("keyup", () => {
      formatInput(input);
      calculate();
    });
  });

  const paymentInputs = [
    "voucher",
    "vita",
    "gtbpos",
    "pbpos",
    "pbtf",
    "gtbtf"
  ];

  paymentInputs.forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("keyup", () => {
      formatInput(input);
      calculateCash();
    });
  });
});