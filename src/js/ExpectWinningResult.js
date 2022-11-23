import ExpectNumberInputs from "./ExpectNumberInputs.js";
import WinningResultModal from "./WinningResultModal.js";
import { checkDuplicateExists } from "./utils.js";
import { DUPLICATE_EXPECT_NUMBER } from "../constants/message.js";

class ExpectWinningResult {
  constructor({ purchasedTickets, expectNumbers }) {
    this.purchasedTickets = purchasedTickets;
    this.expectNumbers = expectNumbers;

    this.$expectWinningResult = document.querySelector(
      "#expect-winning-result "
    );
    this.$expectForm = document.querySelector("#expect-form");
    this.$winningResultModal = document.querySelector(
      "#winning-result-modal-modal"
    );

    this.ExpectNumberInputs = new ExpectNumberInputs({ expectNumbers });
    this.WinningResultModal = new WinningResultModal();
  }

  setEvent() {
    this.$expectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (checkDuplicateExists(this.expectNumbers)) {
        alert(DUPLICATE_EXPECT_NUMBER);
      } else {
        this.renderWinningResultModal();
      }
    });

    this.ExpectNumberInputs.setEvent();
    this.WinningResultModal.setEvent();
  }

  renderWinningResultModal() {
    this.WinningResultModal.render({
      purchasedTickets: this.purchasedTickets,
      expectNumbers: this.expectNumbers,
    });
  }

  render() {
    this.$expectWinningResult.classList.remove("d-none");
  }
}

export default ExpectWinningResult;
