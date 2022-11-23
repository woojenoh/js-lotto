import PurchaseResult from "./PurchaseResult.js";
import ExpectWinningResult from "./ExpectWinningResult.js";
import { getNumberFilledArray, shuffleArray } from "../utils.js";
import { NOT_IN_THOUSANDS } from "../constants/message.js";
import { TICKET_PRICE } from "../constants/price.js";

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
      purchasedTickets: this.purchasedTickets,
      expectNumbers: this.expectNumbers,
    });
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
  }

  setRandomTickets(purchaseCount) {
    this.purchasedTickets.splice(0);
    for (let i = 0; i < purchaseCount; i++) {
      const randomLottoNumber = shuffleArray(getNumberFilledArray(45)).slice(
        0,
        6
      );
      this.purchasedTickets.push(randomLottoNumber);
    }
  }

  purchaseLotto() {
    const purchaseCount = this.purchaseAmount / TICKET_PRICE;
    this.setRandomTickets(purchaseCount);
    this.PurchaseResult.render({ purchasedTickets: this.purchasedTickets });
    this.ExpectWinningResult.render();
  }
}

export default Lotto;
