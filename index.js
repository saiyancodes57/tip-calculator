const state = {
  bill: 0,
  tip: 0,
  people: 0,
};

const ui = {
  tipAmount: document.querySelectorAll(".figure")[0],
  totalAmount: document.querySelectorAll(".figure")[1],
  errorMsg: document.querySelector(".error-message"),
  peopleWrapper: document.querySelector("#people-input-wrapper"),
  buttons: document.querySelectorAll(".tip-grid button"),
  inputs: document.querySelectorAll("input[type='number']"),
  reset: document.querySelector(".reset"),
};
ui.inputs.forEach((input) =>
  input.addEventListener("input", function (e) {
    if (input.id == "bill") {
      state.bill = parseFloat(this.value);
    }
    if (input.id == "custom") {
      state.tip = parseFloat(this.value);
      resetGridButtons();
    }
    if (input.id == "people") {
      state.people = parseInt(this.value, 10);
      const isError = this.value <= 0 && e.target.value !== "";
      ui.errorMsg.textContent = isError ? "Can't be zero" : "";
      ui.peopleWrapper.classList.toggle("error", isError);
    }
    calculate();
  }),
);

ui.buttons.forEach((btn) =>
  btn.addEventListener("click", function () {
    resetGridButtons();
    this.classList.toggle("active");
    state.tip = parseFloat(this.dataset.value);
    calculate();
  }),
);

function calculate() {
  if (state.people > 0) {
    const bill = parseFloat(state.bill) || 0;
    const tip = parseFloat(state.tip) || 0;
    const people = parseInt(state.people) || 0;

    ui.errorMsg.textContent = "";
    ui.peopleWrapper.classList.remove("error");
    const tipPerPerson = (bill * (tip / 100)) / people;
    const totalPerPerson = bill / people + tipPerPerson;

    ui.tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    ui.totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    ui.tipAmount.textContent = "$0.00";
    ui.totalAmount.textContent = "$0.00";
  }
}

ui.reset.addEventListener("click", reset);

function reset() {
  state.bill = 0;
  state.tip = 0;
  state.people = 0;
  ui.inputs.forEach((input) => (input.value = ""));

  resetGridButtons();

  // Clear the Error message
  ui.errorMsg.textContent = "";
  ui.peopleWrapper.classList.remove("error");

  // Reset the display figures back to zero
  calculate();
}

function resetGridButtons() {
  ui.buttons.forEach((button) => button.classList.remove("active"));
}
