const events = [
  {
    id: "pay_7K42Q",
    customer: "Pine Harbor Studios",
    amount: "$12,480.00",
    state: "failed",
    method: "card",
    reason: "Issuer declined the off-session charge after risk review.",
    recovery: "Send hosted recovery link and retry with customer authentication.",
    timeline: [
      ["09:12", "Invoice finalized"],
      ["09:13", "Payment intent created"],
      ["09:14", "Card authorization declined"],
      ["09:16", "Recovery email queued"]
    ]
  },
  {
    id: "pay_8R16B",
    customer: "Lumen Fieldworks",
    amount: "$4,210.50",
    state: "succeeded",
    method: "bank",
    reason: "Bank debit settled inside the expected window.",
    recovery: "No recovery needed. Receipt and ledger entry are complete.",
    timeline: [
      ["08:04", "Debit submitted"],
      ["08:07", "Risk checks passed"],
      ["10:42", "Funds marked available"],
      ["10:43", "Receipt delivered"]
    ]
  },
  {
    id: "pay_4H91N",
    customer: "Tandem Market",
    amount: "$860.00",
    state: "disputed",
    method: "card",
    reason: "Cardholder opened a product-not-received dispute.",
    recovery: "Upload fulfillment evidence and customer messages before 5 PM.",
    timeline: [
      ["Yesterday", "Payment succeeded"],
      ["07:31", "Dispute opened"],
      ["07:35", "Evidence checklist generated"],
      ["08:10", "Fulfillment log attached"]
    ]
  },
  {
    id: "pay_2M84C",
    customer: "Atlas Supply Co.",
    amount: "$2,109.75",
    state: "recovering",
    method: "wallet",
    reason: "Wallet confirmation expired during checkout redirect.",
    recovery: "Keep order reserved and prompt the buyer to confirm again.",
    timeline: [
      ["11:22", "Checkout started"],
      ["11:26", "Wallet redirect expired"],
      ["11:27", "Recovery session created"],
      ["11:31", "Buyer notified"]
    ]
  },
  {
    id: "pay_5P03X",
    customer: "Civic Kitchen",
    amount: "$319.99",
    state: "succeeded",
    method: "card",
    reason: "Authorization, capture, and receipt completed.",
    recovery: "No action needed.",
    timeline: [
      ["12:02", "Authorization approved"],
      ["12:02", "Payment captured"],
      ["12:03", "Receipt delivered"],
      ["12:04", "Order released"]
    ]
  },
  {
    id: "pay_6D77A",
    customer: "Verde Transit",
    amount: "$7,600.00",
    state: "failed",
    method: "bank",
    reason: "Bank account returned insufficient funds.",
    recovery: "Offer a card fallback and hold fulfillment until payment clears.",
    timeline: [
      ["Monday", "Bank debit submitted"],
      ["Today", "Return code received"],
      ["Today", "Fulfillment hold applied"],
      ["Today", "Fallback payment link drafted"]
    ]
  }
];

const stateLabels = {
  succeeded: "Succeeded",
  failed: "Failed",
  disputed: "Disputed",
  recovering: "Recovering"
};

const methodLabels = {
  card: "Card",
  bank: "Bank debit",
  wallet: "Wallet"
};

let selectedId = events[0].id;
let loading = true;

const list = document.querySelector("#events");
const resultSummary = document.querySelector("#resultSummary");
const searchInput = document.querySelector("#searchInput");
const stateFilter = document.querySelector("#stateFilter");
const methodFilter = document.querySelector("#methodFilter");
const loadingState = document.querySelector("#loadingState");
const emptyState = document.querySelector("#emptyState");
const timelineTitle = document.querySelector("#timelineTitle");
const eventDetail = document.querySelector("#eventDetail");
const retryButton = document.querySelector("#retryButton");

function visibleEvents() {
  const query = searchInput.value.trim().toLowerCase();
  return events.filter((event) => {
    const text = `${event.id} ${event.customer} ${event.amount}`.toLowerCase();
    const stateMatch = stateFilter.value === "all" || event.state === stateFilter.value;
    const methodMatch = methodFilter.value === "all" || event.method === methodFilter.value;
    return text.includes(query) && stateMatch && methodMatch;
  });
}

function renderList() {
  const visible = visibleEvents();
  if (!visible.some((event) => event.id === selectedId)) {
    selectedId = visible[0]?.id || null;
  }

  loadingState.classList.toggle("hidden", !loading);
  emptyState.classList.toggle("hidden", loading || visible.length > 0);
  list.classList.toggle("hidden", loading || visible.length === 0);
  resultSummary.textContent = loading ? "Loading payment events" : `${visible.length} event${visible.length === 1 ? "" : "s"} shown`;

  list.innerHTML = visible.map((event) => `
    <li class="event-row ${event.id === selectedId ? "selected" : ""}" tabindex="0" data-id="${event.id}">
      <div class="event-title">
        <strong>${event.customer}</strong>
        <small>${event.id}</small>
      </div>
      <div class="amount">
        ${event.amount}
        <small>${methodLabels[event.method]}</small>
      </div>
      <span class="pill ${event.state}">${stateLabels[event.state]}</span>
      <span class="method">${event.timeline[event.timeline.length - 1][0]}</span>
    </li>
  `).join("");

  renderDetail();
}

function renderDetail() {
  const event = events.find((item) => item.id === selectedId);
  if (!event) {
    timelineTitle.textContent = "No event selected";
    eventDetail.innerHTML = '<p class="muted">The current filters have no matching events.</p>';
    retryButton.disabled = true;
    return;
  }

  retryButton.disabled = event.state === "succeeded";
  timelineTitle.textContent = `${event.customer} - ${event.id}`;
  eventDetail.innerHTML = `
    <div class="detail-grid">
      <div class="detail-box"><span>Amount</span><strong>${event.amount}</strong></div>
      <div class="detail-box"><span>State</span><strong>${stateLabels[event.state]}</strong></div>
      <div class="detail-box"><span>Method</span><strong>${methodLabels[event.method]}</strong></div>
      <div class="detail-box"><span>Risk note</span><strong>${event.state === "succeeded" ? "Clear" : "Review"}</strong></div>
    </div>
    <div>
      <p class="eyebrow">Explanation</p>
      <p>${event.reason}</p>
    </div>
    <div class="recovery ${event.state}">
      <strong>Recovery action</strong>
      <p>${event.recovery}</p>
    </div>
    <div>
      <p class="eyebrow">Timeline</p>
      <ol class="timeline">
        ${event.timeline.map(([time, label]) => `<li><strong>${time}</strong>${label}</li>`).join("")}
      </ol>
    </div>
  `;
}

function selectEvent(id) {
  selectedId = id;
  renderList();
}

list.addEventListener("click", (event) => {
  const row = event.target.closest(".event-row");
  if (row) selectEvent(row.dataset.id);
});

list.addEventListener("keydown", (event) => {
  const row = event.target.closest(".event-row");
  if (!row) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectEvent(row.dataset.id);
  }
});

[searchInput, stateFilter, methodFilter].forEach((control) => {
  control.addEventListener("input", renderList);
});

retryButton.addEventListener("click", () => {
  const event = events.find((item) => item.id === selectedId);
  if (!event || event.state === "succeeded") return;
  event.state = "recovering";
  event.reason = "Recovery workflow is active and waiting on the customer or evidence owner.";
  event.recovery = "Monitor the recovery session and keep fulfillment blocked until resolution.";
  event.timeline = [["Now", "Operator started recovery"], ...event.timeline];
  renderList();
});

window.setTimeout(() => {
  loading = false;
  renderList();
}, 650);

renderList();
