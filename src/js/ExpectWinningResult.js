import ExpectNumberInputs from "./ExpectNumberInputs.js";
import { checkDuplicateExists } from "./utils.js";
import { DUPLICATE_EXPECT_NUMBER } from "../constants/message.js";

class ExpectWinningResult {
  constructor({ expectNumbers }) {
    this.expectNumbers = expectNumbers;

    this.$expectWinningResult = document.querySelector(
      "#expect-winning-result "
    );
    this.$expectForm = document.querySelector("#expect-form");
    this.$winningResultModal = document.querySelector(
      "#winning-result-modal-modal"
    );

    this.ExpectNumberInputs = new ExpectNumberInputs({ expectNumbers });
  }

  setEvent() {
    this.$expectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (checkDuplicateExists(this.expectNumbers)) {
        alert(DUPLICATE_EXPECT_NUMBER);
      } else {
        this.$winningResultModal.classList.add("open");
      }
    });

    this.ExpectNumberInputs.setEvent();
  }

  render() {
    this.$expectWinningResult.classList.remove("d-none");
  }
}

export default ExpectWinningResult;
