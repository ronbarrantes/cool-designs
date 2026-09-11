const issues = [
  {
    id: "EXQ-1042",
    title: "Invoice preview stalls after plan downgrade",
    customer: "Northstar Health",
    status: "blocked",
    priority: "urgent",
    owner: "Maya",
    sla: "42m",
    label: "Billing",
    blocker: "Waiting on contract snapshot from revenue systems",
    action: "Request snapshot replay and notify the account team before the SLA expires.",
    history: ["Intake created from support escalation", "Owner assigned during morning review", "Replay request opened with data platform"]
  },
  {
    id: "EXQ-1038",
    title: "Workspace import creates duplicate reviewers",
    customer: "Cobalt Labs",
    status: "in-progress",
    priority: "high",
    owner: "Jon",
    sla: "2h",
    label: "Migration",
    blocker: "No active blocker",
    action: "Compare import map with directory sync and ship the dedupe patch.",
    history: ["CSV sample attached", "Root cause isolated to reviewer alias merge", "Patch in review"]
  },
  {
    id: "EXQ-1031",
    title: "Release checklist missing approval owner",
    customer: "MarketRow",
    status: "ready",
    priority: "normal",
    owner: "Priya",
    sla: "Today",
    label: "Release",
    blocker: "No active blocker",
    action: "Assign the release captain and send the generated checklist.",
    history: ["Release created", "Template validation passed", "Approval owner absent"]
  },
  {
    id: "EXQ-1026",
    title: "Webhook retry budget exhausted",
    customer: "Aster Freight",
    status: "blocked",
    priority: "high",
    owner: "Eli",
    sla: "1h",
    label: "Integrations",
    blocker: "Customer endpoint is returning 503 for signed retry probes",
    action: "Keep retries paused and send the endpoint evidence to the customer admin.",
    history: ["Failure threshold crossed", "Retry pause applied", "Probe evidence captured"]
  },
  {
    id: "EXQ-1022",
    title: "Audit export completed with warning",
    customer: "Fjord Bank",
    status: "complete",
    priority: "low",
    owner: "Nina",
    sla: "Done",
    label: "Compliance",
    blocker: "Resolved",
    action: "No action needed. Export was delivered with skipped empty attachments noted.",
    history: ["Export requested", "Empty attachment warning reviewed", "Customer notified"]
  },
  {
    id: "EXQ-1019",
    title: "Mobile session handoff loses selected cycle",
    customer: "Juniper Works",
    status: "ready",
    priority: "normal",
    owner: "Sam",
    sla: "Tomorrow",
    label: "Mobile",
    blocker: "No active blocker",
    action: "Reproduce with the saved session trace and attach a fix owner.",
    history: ["Trace captured", "Cycle id missing after device handoff", "Ready for engineering triage"]
  },
  {
    id: "EXQ-1015",
    title: "Procurement approval cannot be reassigned",
    customer: "Acorn Robotics",
    status: "in-progress",
    priority: "urgent",
    owner: "Leah",
    sla: "28m",
    label: "Permissions",
    blocker: "No active blocker",
    action: "Patch the role check and ask support to keep the incident channel open.",
    history: ["Escalated by enterprise support", "Permission regression confirmed", "Patch branch opened"]
  }
];

const statusLabels = {
  blocked: "Blocked",
  ready: "Ready",
  "in-progress": "In progress",
  complete: "Completed"
};

const priorityLabels = {
  urgent: "Urgent",
  high: "High",
  normal: "Normal",
  low: "Low"
};

let selectedId = issues[0].id;
let loading = true;
let emptyDemo = false;

const rows = document.querySelector("#issueRows");
const searchInput = document.querySelector("#searchInput");
const statusFilter = document.querySelector("#statusFilter");
const priorityFilter = document.querySelector("#priorityFilter");
const resultSummary = document.querySelector("#resultSummary");
const loadingState = document.querySelector("#loadingState");
const emptyState = document.querySelector("#emptyState");
const tableWrap = document.querySelector("#tableWrap");
const detailTitle = document.querySelector("#detailTitle");
const detailBody = document.querySelector("#detailBody");
const completeButton = document.querySelector("#completeButton");
const loadButton = document.querySelector("#loadButton");

function filteredIssues() {
  if (emptyDemo) return [];
  const query = searchInput.value.trim().toLowerCase();
  return issues.filter((issue) => {
    const text = `${issue.id} ${issue.title} ${issue.customer} ${issue.owner} ${issue.label}`.toLowerCase();
    const statusMatch = statusFilter.value === "all" || issue.status === statusFilter.value;
    const priorityMatch = priorityFilter.value === "all" || issue.priority === priorityFilter.value;
    return text.includes(query) && statusMatch && priorityMatch;
  });
}

function renderCounts() {
  document.querySelector("#countAll").textContent = issues.filter((issue) => issue.status !== "complete").length;
  document.querySelector("#countBlocked").textContent = issues.filter((issue) => issue.status === "blocked").length;
  document.querySelector("#countComplete").textContent = issues.filter((issue) => issue.status === "complete").length;
}

function renderTable() {
  const visibleIssues = filteredIssues();
  if (!visibleIssues.some((issue) => issue.id === selectedId)) {
    selectedId = visibleIssues[0]?.id || null;
  }

  loadingState.classList.toggle("hidden", !loading);
  emptyState.classList.toggle("hidden", loading || visibleIssues.length > 0);
  tableWrap.classList.toggle("hidden", loading || visibleIssues.length === 0);
  resultSummary.textContent = loading ? "Loading issues" : `${visibleIssues.length} issue${visibleIssues.length === 1 ? "" : "s"} shown`;

  rows.innerHTML = visibleIssues.map((issue) => `
    <tr tabindex="0" data-id="${issue.id}" class="${issue.id === selectedId ? "selected" : ""}">
      <td>
        <div class="issue-title">
          <strong>${issue.id} ${issue.title}</strong>
          <small>${issue.customer} - ${issue.label}</small>
        </div>
      </td>
      <td><span class="pill ${issue.status}">${statusLabels[issue.status]}</span></td>
      <td><span class="priority ${issue.priority}">${priorityLabels[issue.priority]}</span></td>
      <td>${issue.owner}</td>
      <td>${issue.sla}</td>
    </tr>
  `).join("");

  renderDetail();
}

function renderDetail() {
  const issue = issues.find((item) => item.id === selectedId);
  if (!issue) {
    detailTitle.textContent = "No issue selected";
    detailBody.innerHTML = '<p class="empty-copy">The current filter has no matching issues.</p>';
    completeButton.disabled = true;
    return;
  }

  completeButton.disabled = issue.status === "complete";
  detailTitle.textContent = `${issue.id} ${issue.title}`;
  detailBody.innerHTML = `
    <div class="detail-meta">
      <div class="meta-box"><span>Status</span><strong>${statusLabels[issue.status]}</strong></div>
      <div class="meta-box"><span>Priority</span><strong>${priorityLabels[issue.priority]}</strong></div>
      <div class="meta-box"><span>Owner</span><strong>${issue.owner}</strong></div>
      <div class="meta-box"><span>SLA</span><strong>${issue.sla}</strong></div>
    </div>
    <div>
      <p class="eyebrow">Blocker</p>
      <p>${issue.blocker}</p>
    </div>
    <div class="next-action">
      <strong>Next action</strong>
      <p>${issue.action}</p>
    </div>
    <div>
      <p class="eyebrow">Activity</p>
      <ol class="timeline">${issue.history.map((item) => `<li>${item}</li>`).join("")}</ol>
    </div>
  `;
}

function selectIssue(id) {
  selectedId = id;
  renderTable();
}

function refreshQueue() {
  loading = true;
  renderTable();
  window.setTimeout(() => {
    loading = false;
    renderTable();
  }, 650);
}

rows.addEventListener("click", (event) => {
  const row = event.target.closest("tr");
  if (row) selectIssue(row.dataset.id);
});

rows.addEventListener("keydown", (event) => {
  const visibleIssues = filteredIssues();
  const currentIndex = visibleIssues.findIndex((issue) => issue.id === selectedId);
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectIssue(event.target.closest("tr").dataset.id);
  }
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const next = visibleIssues[Math.max(0, Math.min(visibleIssues.length - 1, currentIndex + direction))];
    if (next) {
      selectedId = next.id;
      renderTable();
      document.querySelector(`[data-id="${next.id}"]`)?.focus();
    }
  }
});

[searchInput, statusFilter, priorityFilter].forEach((control) => {
  control.addEventListener("input", () => {
    emptyDemo = false;
    renderTable();
  });
});

document.querySelectorAll(".state-card").forEach((button) => {
  button.addEventListener("click", () => {
    const state = button.dataset.state;
    emptyDemo = state === "empty-demo";
    statusFilter.value = state === "all" || state === "empty-demo" ? "all" : state;
    renderTable();
  });
});

completeButton.addEventListener("click", () => {
  const issue = issues.find((item) => item.id === selectedId);
  if (!issue) return;
  issue.status = "complete";
  issue.sla = "Done";
  issue.blocker = "Resolved";
  issue.history = ["Operator completed recovery action", ...issue.history];
  renderCounts();
  renderTable();
});

loadButton.addEventListener("click", refreshQueue);

renderCounts();
refreshQueue();
