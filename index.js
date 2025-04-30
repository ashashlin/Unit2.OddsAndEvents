// === initial state ===

const numbers = [];
const oddNumbers = [];
const evenNumbers = [];

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

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData($form);
    const number = parseInt(formData.get("number"));

    if (Number.isNaN(number)) {
      alert("Please enter a number.");
    }

    numbers.push(number);
    render();
  });

  return $form;
}

// === create HTML for a single subsection ===

function createSubsection(sectionName) {
  const $section = document.createElement("section");
  const numbersString = numbers.join(" ");
  const oddsString = oddNumbers.join(" ");
  const evensString = evenNumbers.join(" ");

  let displayContent = "";

  if (sectionName === "bank") {
    displayContent = numbersString;
  } else if (sectionName === "odds") {
    displayContent = oddsString;
  } else if (sectionName === "evens") {
    displayContent = evensString;
  }

  $section.innerHTML = `
    <h2 class="subtitle">${sectionName}</h2>
    <div class="numbers-display ${sectionName}-display">
      ${displayContent}
    </div>
  `;

  return $section;
}

// === render the page ===

function render() {
  const $app = document.getElementById("app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
  `;

  $app.append(
    createForm(),
    createSubsection("bank"),
    createSubsection("odds"),
    createSubsection("evens")
  );
}
render();
