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
    <button class="btn sort-customize" type="button">
      Sort:
    </button>
    <input class="sort-input" type="number" min="1" step="1" />
  `;

  addFormSubmitEventListener($form);
  addSortOneEventListener($form);
  addSortAllEventListener($form);
  addGenerateNumberEventListener($form);
  addSortCustomizeEventListener($form);
  addSortInputEventListener($form);

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
      evenNumbers.sort((a, b) => a - b);
    } else {
      oddNumbers.push(firstNumber);
      oddNumbers.sort((a, b) => a - b);
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

    evenNumbers.sort((a, b) => a - b);
    oddNumbers.sort((a, b) => a - b);
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

// === sort according to user input ===

function addSortCustomizeEventListener($form) {
  const sortCustomize = $form.querySelector(".sort-customize");
  sortCustomize.addEventListener("click", () => {
    sortAnyNumberOfItems($form);
  });
}

function sortAnyNumberOfItems($form) {
  const sortInput = $form.querySelector(".sort-input");
  const sortInputNumber = parseInt(sortInput.value);

  if (Number.isNaN(sortInputNumber)) {
    alert("Please enter the number of items you want to sort at a time.");
    return;
  }

  if (sortInputNumber > numbers.length) {
    alert("Not enough items to sort.");
    return;
  }

  for (let i = 0; i < sortInputNumber; i++) {
    if (numbers[i] % 2 === 0) {
      evenNumbers.push(numbers[i]);
    } else {
      oddNumbers.push(numbers[i]);
    }
  }

  evenNumbers.sort((a, b) => a - b);
  oddNumbers.sort((a, b) => a - b);
  numbers.splice(0, sortInputNumber);
  render();
}

// === sort the numbers when the user presses Enter in the sort input ===

function addSortInputEventListener($form) {
  const sortInput = $form.querySelector(".sort-input");
  sortInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sortAnyNumberOfItems($form);
    }
  });
}

// === create HTML for a single subsection ===

function createSubsection(sectionName) {
  const $section = document.createElement("section");
  const numbersString = numbers.join(" ");
  const oddsString = oddNumbers.join(" ");
  const evensString = evenNumbers.join(" ");

  let displayContent = "";
  let dropdownButtonHTML = `
    <button class="btn sort-dropdown-btn">
      <span class="sort-dropdown"></span>
    </button>`;
  let dropdownMenuHTML = `
    <div class="sort-dropdown-menu">
      <p class="sort-dropdown-menu-option sort-ascending"
      data-section-name='${sectionName}'>
        Sort in ascending order
      </p>
      <p class="sort-dropdown-menu-option sort-descending"
      data-section-name='${sectionName}'>
        Sort in descending order
      </p>
    </div>
  `;

  if (sectionName === "bank") {
    displayContent = numbersString;
    dropdownButtonHTML = "";
    dropdownMenuHTML = "";
  } else if (sectionName === "odds") {
    displayContent = oddsString;
  } else if (sectionName === "evens") {
    displayContent = evensString;
  }

  $section.innerHTML = `
    <header class="subsection-header">
      <h2 class="subtitle">${sectionName}</h2>
      ${dropdownButtonHTML}
      ${dropdownMenuHTML}
    </header>
    <div class="numbers-display ${sectionName}-display">
      ${displayContent}
    </div>
  `;

  addDropdownBtnEventListener($section);
  addSortOrderEventListener($section, "ascending");
  addSortOrderEventListener($section, "descending");

  return $section;
}

// === show the dropdown menu when user clicks the dropdown button ===

function addDropdownBtnEventListener($section) {
  const dropdownBtn = $section.querySelector(".sort-dropdown-btn");

  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", () => {
      const dropdownMenu = $section.querySelector(".sort-dropdown-menu");
      dropdownMenu.classList.toggle("active");
    });
  }
}

// === add event listeners to ascending and descending sort options in the dropdown menu ===

function addSortOrderEventListener($section, order) {
  const sortOption = $section.querySelector(`.sort-${order}`);

  if (sortOption) {
    sortOption.addEventListener("click", () => {
      const { sectionName } = sortOption.dataset;

      if (sectionName === "odds") {
        if (order === "ascending") {
          oddNumbers.sort((a, b) => a - b);
        } else {
          oddNumbers.sort((a, b) => b - a);
        }
      } else if (sectionName === "evens") {
        if (order === "ascending") {
          evenNumbers.sort((a, b) => a - b);
        } else {
          evenNumbers.sort((a, b) => b - a);
        }
      }

      render();
    });
  }
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
