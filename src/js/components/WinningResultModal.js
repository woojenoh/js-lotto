import { numberWithCommas } from "../utils.js";
import {
  lotteryRankHash,
  lotteryPrizeHash,
  lotteryMatchTextHash,
} from "../constants/hash.js";
import { TICKET_PRICE } from "../constants/price.js";

class WinningResultModal {
  constructor() {
    this.$winningResultModal = document.querySelector(
      "#winning-result-modal-modal"
    );
    this.$winningResultModalCloseButton = document.querySelector(
      "#winning-result-modal-close-button"
    );
    this.$winningResultTableBody = document.querySelector(
      "#winning-result-table-body"
    );
    this.$returnRate = document.querySelector("#return-rate");
    this.$resetButton = document.querySelector("#reset-button");
  }

  setEvent() {
    this.$winningResultModalCloseButton.addEventListener("click", () => {
      this.$winningResultModal.classList.remove("open");
    });
    this.$resetButton.addEventListener("click", () => {
      window.location.reload();
    });
  }

  getWinningStatus({ purchasedTickets, expectNumbers }) {
    const winningStatus = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    for (let i = 0; i < purchasedTickets.length; i++) {
      let winningCount = 0;
      for (let j = 0; j < expectNumbers.length; j++) {
        const winningIndex = purchasedTickets[i].indexOf(expectNumbers[j]);
        if (winningIndex !== -1) winningCount += 1;
      }
      if (winningCount === 0) continue;
      if (winningCount === 6) {
        const bonusNumber = expectNumbers[expectNumbers.length - 1];
        const isSecondLottery = purchasedTickets[i].indexOf(bonusNumber) !== -1;
        if (isSecondLottery) winningStatus[2] += 1;
        else winningStatus[1] += 1;
      } else if (lotteryRankHash[winningCount]) {
        winningStatus[lotteryRankHash[winningCount]] += 1;
      }
    }

    return winningStatus;
  }

  getTotalEarnMoney(winningStatus) {
    return Object.keys(winningStatus).reduce((acc, cur) => {
      acc += winningStatus[cur] * lotteryPrizeHash[cur];
      return acc;
    }, 0);
  }

  getRateOfReturn(totalEarnMoney, purchasedTickets) {
    const totalTicketPrice = purchasedTickets.length * TICKET_PRICE;
    return (totalEarnMoney - totalTicketPrice) / totalTicketPrice;
  }

  render({ purchasedTickets, expectNumbers }) {
    this.$winningResultModal.classList.add("open");

    const winningStatus = this.getWinningStatus({
      purchasedTickets,
      expectNumbers,
    });
    const totalEarnMoney = this.getTotalEarnMoney(winningStatus);
    const rateOfReturn = this.getRateOfReturn(totalEarnMoney, purchasedTickets);

    const winningResultRowsTemplates = Object.keys(winningStatus)
      .reverse()
      .reduce((acc, cur) => {
        const winningResultRowTemplate = `
          <tr class="text-center">
            <td class="p-3">${lotteryMatchTextHash[cur]}</td>
            <td class="p-3">${numberWithCommas(lotteryPrizeHash[cur])}</td>
            <td class="p-3">${winningStatus[cur]}</td>
          </tr>`;
        acc += winningResultRowTemplate;
        return acc;
      }, "");

    this.$winningResultTableBody.innerHTML = winningResultRowsTemplates;
    this.$returnRate.innerHTML = rateOfReturn * 100;
  }
}

export default WinningResultModal;
