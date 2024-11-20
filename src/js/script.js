const pricePerUnit = 5000;

function incrementUnit() {
  const unitInput = document.getElementById("unitCount");
  unitInput.value = parseInt(unitInput.value) + 1;
  calculateTotal();
}

function decrementUnit() {
  const unitInput = document.getElementById("unitCount");
  if (unitInput.value > 1) {
    unitInput.value = parseInt(unitInput.value) - 1;
  }
  calculateTotal();
}

function setUnit(value) {
  document.getElementById("unitCount").value = value;
  calculateTotal();
}

function calculateTotal() {
  const unitCount = parseInt(document.getElementById("unitCount").value);
  const total = unitCount * pricePerUnit;

  document.getElementById("unitCountPayment").value = unitCount;
  document.getElementById("totalPayment").value = total;
}

function incrementUnitPayment() {
  const unitInput = document.getElementById("unitCountPayment");
  unitInput.value = parseInt(unitInput.value) + 1;
  calculateTotalPayment();
}

function decrementUnitPayment() {
  const unitInput = document.getElementById("unitCountPayment");
  if (unitInput.value > 1) {
    unitInput.value = parseInt(unitInput.value) - 1;
  }
  calculateTotalPayment();
}

function calculateTotalPayment() {
  const unitCount = parseInt(document.getElementById("unitCountPayment").value);
  const total = unitCount * pricePerUnit;

  document.getElementById("totalPayment").value = total;
}

mdb.Alert.getInstance(document.getElementById("alertExample")).update({
  position: "top-right",
  delay: 2000,
  autohide: true,
  width: "600px",
  offset: 20,
  stacking: false,
  appendToBody: false,
});


