// Wait for the HTML document to be fully loaded before executing the JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Get references to various elements in the HTML
  const form = document.getElementById('ageForm');
  const calculateButton = document.getElementById('calculateButton');
  const inputs = document.querySelectorAll('.input');
  const ageResults = document.querySelectorAll('section h2 span');
  const header = document.querySelector('header');

  // Add a click event listener to the entire document
  document.addEventListener('click', function (event) {
    // Check if the clicked element is not the calculate button or any input field
    if (event.target !== calculateButton && !Array.from(inputs).includes(event.target)) {
      // Clear out error styles
      inputs.forEach(input => {
        input.classList.remove('error');
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.remove();
        }
      });

      // Reset header text color
      header.querySelectorAll('h1').forEach(h1 => {
        h1.style.color = 'hsl(0, 0%, 8%)';
      });
    }
  });

  // Add a click event listener to the calculate button
  calculateButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Reset age results and clear error styles
    ageResults.forEach(span => {
      span.textContent = '--';
    });

    inputs.forEach(input => {
      input.classList.remove('error');
      const errorMessage = input.parentElement.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    });

    // Validate form inputs
    let isValid = true;

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        input.classList.add('error');
        showErrorMessage(input, 'This field is required.');
        // Change header text color for error
        header.querySelectorAll('h1').forEach(h1 => {
          h1.style.color = 'hsl(0, 100%, 67%)';
        });
        isValid = false;
      } else {
        input.classList.remove('error');
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.remove();
        }
      }
    });

    // Parse input values for day, month, and year
    const day = parseInt(inputs[0].value, 10);
    const month = parseInt(inputs[1].value, 10);
    const year = parseInt(inputs[2].value, 10);

    // Validate day, month, and year
    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
      isValid = false;

      // Highlight input fields with errors
      inputs.forEach((input, index) => {
        if (isNaN(parseInt(input.value, 10))) {
          input.classList.add('error');
        }
      });

      if (isNaN(day) || day < 1 || day > 31) {
        inputs[0].classList.add('error');
      }
      if (isNaN(month) || month < 1 || month > 12) {
        inputs[1].classList.add('error');
      }
      if (isNaN(year) || year < 1000 || year > 2023) {
        inputs[2].classList.add('error');
      }
    }

    // Get the current date and the input date
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day);

    // Check if the input date is in the future
    if (inputDate > currentDate) {
      isValid = false;

      // Show error messages and change header text color for date errors
      if (isNaN(day) || day < 1 || day > 31) {
        showErrorMessage(inputs[0], 'Must be a valid day.');
        header.querySelectorAll('h1').forEach(h1 => {
          h1.style.color = 'hsl(0, 100%, 67%)';
        });
      }
      if (isNaN(month) || month < 1 || month > 12) {
        showErrorMessage(inputs[1], 'Must be a valid month.');
      }
      if (isNaN(year) || year < 1000 || year > 2023) {
        showErrorMessage(inputs[2], 'Must be in the Past.');
      }
    }

    // If the form is valid, calculate and display the age
    if (isValid) {
      // Calculate age
      const ageInMilliseconds = currentDate - inputDate;
      const ageDate = new Date(ageInMilliseconds);
      const years = ageDate.getUTCFullYear() - 1970;
      const months = ageDate.getUTCMonth();
      const days = ageDate.getUTCDate() - 1;

      // Display age results
      ageResults[0].textContent = years;
      ageResults[1].textContent = months;
      ageResults[2].textContent = days;
    }
  });

  // Add a submit event listener to the form
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Trigger the click event of the calculateButton when the form is submitted
    calculateButton.click();
  });

  // Function to show error messages below input fields
  function showErrorMessage(input, message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    input.parentElement.appendChild(errorMessage);
  }
});
