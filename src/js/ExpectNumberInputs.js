class ExpectNumberInputs {
  constructor({ expectNumbers }) {
    this.expectNumbers = expectNumbers;

    this.$expectWinningNumberInput = document.querySelectorAll(
      "#expect-winning-number-input"
    );
  }

  setEvent() {
    this.$expectWinningNumberInput.forEach((el, index) => {
      el.addEventListener("change", (event) => {
        this.expectNumbers[index] = event.target.value;
      });
    });
  }
}

export default ExpectNumberInputs;
