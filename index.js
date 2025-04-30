// === create HTML for the add number form ===

function createForm() {
  const $form = document.createElement("form");
  $form.classList.add("form");
  $form.innerHTML = `
    <label for="number">
      Add a number to the bank
    </label>
    <input type="number" id="number" name="number" step="1" />
    <button class="btn add-number">
      Add number
    </button>
    <button class="btn sort-1">
      Sort 1
    </button>
    <button class="btn sort-all">
      Sort All
    </button>
  `;

  return $form;
}

// === render the page ===

function render() {
  const $app = document.getElementById("app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
  `;

  $app.append(createForm());
}
render();
