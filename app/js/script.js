const billInput = document.querySelector("[data-bill]");
const tipButtons = document.querySelectorAll("[data-tip]");
const peopleInput = document.querySelector("[data-people]");
const customInput = document.querySelector(".custom-input");
const tipAmountPerPerson = document.querySelector("[data-amount]");
const billTotalPerPerson = document.querySelector("[data-total]");
const resetBtn = document.querySelector("[data-reset]");

let tip, bill, people;
tip = 0;

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tip = Number(button.value);
    customInput.value = null;

    if (people >= 1) {
      calculateTip();
    }
  });
});

billInput.addEventListener("input", () => {
  bill = Number(billInput.value);
  if (people >= 1) {
    calculateTip();
  }
});

customInput.addEventListener("input", () => {
  tip = Number(customInput.value);
  if (people >= 1) {
    calculateTip();
  }
});

peopleInput.addEventListener("input", () => {
  people = Number(peopleInput.value);
  if (people < 1) {
    tipAmountPerPerson.innerText = "$0.00";
    billTotalPerPerson.innerText = "$0.00";
  } else {
    calculateTip();
  }
});

function calculateTip() {
  let totalTip = (tip * bill) / 100;
  let totalBill = bill + totalTip;
  let tipPerPerson = totalTip / people;
  // round down to lower integer for design accuracy purpose only 
  tipPerPerson = Math.floor(tipPerPerson * 100) / 100;
  let billPerPerson = totalBill / people;

  tipAmountPerPerson.innerText = "$" + tipPerPerson.toFixed(2);
  billTotalPerPerson.innerText = "$" + billPerPerson.toFixed(2);

  console.log(totalTip / people, totalBill / people);
}

resetHandler();

function resetHandler() {
  billInput.addEventListener("keyup", disable);

  resetBtn.addEventListener("click", () => {
    tip = 0;
    bill = 0;
    people = 0;
    billInput.value = null;
    peopleInput.value = null;
    tipButtons.value = null;
    customInput.value = null;
    billTotalPerPerson.innerText = "$0.00";
    tipAmountPerPerson.innerText = "$0.00";

    disable();
  });
}

function disable() {
  if (billInput.value.length > 0 && billInput.value > 0) {
    resetBtn.removeAttribute("disabled");
  } else {
    resetBtn.setAttribute("disabled", true);
  }
}
