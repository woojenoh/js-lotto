class WinningResultModal {
  constructor() {
    this.$winningResultModal = document.querySelector(
      "#winning-result-modal-modal"
    );
    this.$winningResultModalCloseButton = document.querySelector(
      "#winning-result-modal-close-button"
    );
  }

  setEvent() {
    this.$winningResultModalCloseButton.addEventListener("click", () => {
      this.$winningResultModal.classList.remove("open");
    });
  }
}

export default WinningResultModal;
