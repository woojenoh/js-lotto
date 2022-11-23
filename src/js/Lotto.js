import PurchaseResult from "./PurchaseResult.js";
import ExpectWinningResult from "./ExpectWinningResult.js";
import WinningResultModal from "./WinningResultModal.js";
import { getNumberFilledArray, shuffleArray } from "./utils.js";
import { NOT_IN_THOUSANDS } from "../constants/message.js";

const TICKET_PRICE = 1000;

class Lotto {
  constructor() {
    this.purchaseAmount = 0;
    this.purchasedTickets = [];
    this.expectNumbers = [];

    this.$purchaseForm = document.querySelector("#purchase-form");
    this.$purchaseAmountInput = document.querySelector(
      "#purchase-amount-input"
    );

    this.PurchaseResult = new PurchaseResult();
    this.ExpectWinningResult = new ExpectWinningResult({
      expectNumbers: this.expectNumbers,
    });
    this.WinningResultModal = new WinningResultModal();
  }

  setEvent() {
    this.$purchaseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.purchaseAmount % TICKET_PRICE !== 0) {
        alert(NOT_IN_THOUSANDS);
      } else {
        this.purchaseLotto();
      }
    });
    this.$purchaseAmountInput.addEventListener("change", (event) => {
      this.purchaseAmount = event.target.value;
    });

    this.PurchaseResult.setEvent();
    this.ExpectWinningResult.setEvent();
    this.WinningResultModal.setEvent();
  }

  getRandomTickets(purchaseCount) {
    return Array(purchaseCount)
      .fill()
      .map(() => shuffleArray(getNumberFilledArray(45)).slice(0, 6).join(", "));
  }

  purchaseLotto() {
    const purchaseCount = this.purchaseAmount / TICKET_PRICE;
    this.purchasedTickets = this.getRandomTickets(purchaseCount);
    this.PurchaseResult.render({ purchasedTickets: this.purchasedTickets });
    this.ExpectWinningResult.render();
  }
}

export default Lotto;
