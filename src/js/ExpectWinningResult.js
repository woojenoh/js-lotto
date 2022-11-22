class ExpectWinningResult {
  constructor() {
    this.$expectWinningResult = document.querySelector(
      "#expect-winning-result "
    );
  }

  render() {
    this.$expectWinningResult.classList.remove("d-none");
  }
}

export default ExpectWinningResult;
