const tmp_entries = [
  {
    title: "Devlog Foundations made",
    date: "10/9/2026",
    description: `Currently just hard-coding the devlogs into the script file but plan to be able to load from external files shortly. This works well for temporary demo purposes`,
    code: `function load_all_cards(data) {
  const devlog = document.getElementById("devlog");
  devlog.innerHTML = data.map(render_card).join("");
}`,
  },
  {
    title: "Some DEMO Data",
    date: "Text Date",
    description: `This exists here to check if the json mapping is functioning as intended %&<> <-- Did they render correctly?
    How about a newline gotta use this \` symbol, also did that symbol even render then?`,
    code: `function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}`,
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render_card(entry) {
  return `
  <div class="box">
  <div class="columns mb-2">
    <div class="column">
      <div class="box has-background-primary py-3 px-4 mb-0">
        <p class="title is-4 mb-0">${escapeHtml(entry.title)}</p>
      </div>
    </div>
    <div class="column is-narrow">
      <div class="box has-background-primary has-text-primary-invert py-3 px-4 mb-0">
        <p class="has-text-weight-semibold">${escapeHtml(entry.date)}</p>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-8">
      <div class="box has-background-primary has-text-primary-invert" style="height: 100%">
        <p>${escapeHtml(entry.description)}</p>
      </div>
    </div>
    <div class="column is-4">
      <div class="box has-background-primary" style="height: 100%">
        <pre><code>${escapeHtml(entry.code)}</code></pre>
      </div>
    </div>
  </div>
</div>`;
}

function load_all_cards(data) {
  const devlog = document.getElementById("devlog");
  devlog.innerHTML = data.map(render_card).join("");
}

const url =
  "https://github.com/MotchHmmF/MotchHmmFSite/blob/main/devlog/logs/log.json";

async function get_logs() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error. Response ${response.status}`);
    }

    const data = await response.json();

    load_all_cards(data);
  } catch (error) {
    console.error("Failed to fetch json", error);
    document.getElementById("devlog").innerHTML =
      `<p> an Error occured ${escapeHtml(error)} </p>`;
  }
}

get_logs();
// load_all_cards(tmp_entries);
