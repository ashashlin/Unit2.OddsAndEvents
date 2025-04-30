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
    <input class="number-input" type="text" id="number" name="number" step="1" />
    <button class="btn add-number">
      Add number
    </button>
    <button class="btn generate-number" type="button">
      Generate number
    </button>
    <button class="btn sort-one" type="button">
      Sort 1
    </button>
    <button class="btn sort-all" type="button">
      Sort All
    </button>
  `;

  addFormSubmitEventListener($form);
  addSortOneEventListener($form);
  addSortAllEventListener($form);
  addGenerateNumberEventListener($form);

  return $form;
}

// === add form submit event listener ===

function addFormSubmitEventListener($form) {
  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData($form);
    const inputValue = formData.get("number");
    const inputArray = inputValue.split(",");

    // first, check if inputs are all numbers
    let areAllNumbers = false;
    for (const string of inputArray) {
      const number = parseInt(string);

      if (Number.isNaN(number)) {
        alert(
          "Please enter an integer or a string of integers separated by a comma."
        );
        return;
      }
    }
    areAllNumbers = true;

    if (areAllNumbers) {
      for (const string of inputArray) {
        const number = parseInt(string);
        numbers.push(number);
      }
    }

    render();
  });
}

// === add sort 1 button event listener ===

function addSortOneEventListener($form) {
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
}

// === add sort all button event listener ===

function addSortAllEventListener($form) {
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
}

// === add generate number event listener ===

function addGenerateNumberEventListener($form) {
  const generateNumber = $form.querySelector(".generate-number");
  generateNumber.addEventListener("click", () => {
    let randomNumber;
    // creates a random positive number between 0 to 1000
    const randomPositiveNumber = Math.floor(Math.random() * 1001);
    // creates a random negative number between -1000 to 0
    const randomNegativeNumber = Math.floor(Math.random() * 1001 - 1000);
    const random = Math.random();

    if (random < 0.5) {
      randomNumber = randomNegativeNumber;
    } else {
      randomNumber = randomPositiveNumber;
    }

    const numberInput = $form.querySelector(".number-input");
    numberInput.value = randomNumber;
  });
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
