class Tickets {
  constructor() {
    this.$ticketContainer = document.querySelector("#ticket-container");
  }

  render({ purchasedTickets }) {
    const ticketTemplates = purchasedTickets.reduce((acc, cur) => {
      const ticketTemplate = `
            <span class="mx-1 text-4xl d-flex items-center" data-cy="lotto-ticket">
              <span class="ticket-icon">🎟️</span>
              <span class="ticket-detail text-base ml-2 d-none" id="ticket-detail">
                ${cur.join(', ')}
              </span>
            </span>`;
      acc += ticketTemplate;
      return acc;
    }, "");

    this.$ticketContainer.insertAdjacentHTML("beforeend", ticketTemplates);
  }
}

export default Tickets;
