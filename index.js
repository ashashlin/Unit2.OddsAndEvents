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
    <button class="btn sort-one" type="button">
      Sort 1
    </button>
    <button class="btn sort-all" type="button">
      Sort All
    </button>
  `;

  // add form submit event listener

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData($form);
    const number = parseInt(formData.get("number"));

    if (Number.isNaN(number)) {
      alert("Please enter a number.");
      return;
    }

    numbers.push(number);
    render();
  });

  // add sort 1 button event listener

  const $sortOne = $form.querySelector(".sort-one");
  $sortOne.addEventListener("click", () => {
    const firstNumber = numbers.shift();
    if (firstNumber === undefined) return;

    if (firstNumber % 2 === 0) {
      evenNumbers.push(firstNumber);
    } else {
      oddNumbers.push(firstNumber);
    }

    render();
  });

  // add sort all button event listener

  const sortAll = $form.querySelector(".sort-all");
  sortAll.addEventListener("click", () => {
    if (numbers.length === 0) return;

    for (const number of numbers) {
      if (number % 2 === 0) {
        evenNumbers.push(number);
      } else {
        oddNumbers.push(number);
      }
    }
    numbers.length = 0;

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
