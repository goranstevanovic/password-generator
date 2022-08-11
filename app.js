'use strict';

// prettier-ignore
const passwordCharacters = {
  lowercase: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ],
  uppercase: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ],
  numbers: [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ],
  symbols: [
    '~', '`', '!', '@', '#', '$', '%', '^', '&amp;', '*', '(', ')', '_', '-',
    '+', '=', '{', '[', '}', ']', ',', '|', ':', ';', '&lt;', '&gt;', '.', '?',
    '/',
  ],
}

const passwordStrengthLabels = {
  0: 'Worst',
  1: 'Bad',
  2: 'Weak',
  3: 'Good',
  4: 'Strong',
};

const passwordForm = document.getElementById('password-form');
const passwordLengthInput = document.getElementById('password-length');
const passwordQuantityInput = document.getElementById('password-quantity');
const passwordsEl = document.getElementById('passwords');

function getRandomCharacter(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function calculatePasswordStrength(password) {
  const result = zxcvbn(password);
  return result.score;
}

function generatePassword(passwordLength, passwordCharacterTypes) {
  let characters = [];

  for (const characterType of passwordCharacterTypes) {
    characters = [...characters, ...passwordCharacters[characterType]];
  }

  if (characters.length < 1) {
    return;
  }

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += getRandomCharacter(characters);
  }

  const passwordStrength = calculatePasswordStrength(password);
  return {
    password,
    passwordStrength,
  };
}

function generatePasswords(
  passwordLength,
  passwordQuantity,
  passwordCharacterTypes
) {
  const passwords = [];

  for (let i = 0; i < passwordQuantity; i++) {
    passwords.push(generatePassword(passwordLength, passwordCharacterTypes));
  }

  return passwords;
}

function displayPasswords(passwords) {
  let output = '';

  if (passwords.includes(undefined)) {
    output += `
      <p class="passwords__password passwords__password--warning">
        Please select at least one of the character types.
      </p>
    `;
    passwordsEl.innerHTML = output;
    return;
  }

  for (const { password, passwordStrength } of passwords) {
    output += `
      <div class="passwords__password-wrapper">
        <p class="passwords__password">
          ${password}
        </p>
        <meter class="password__meter" min="0" max="4" value="${passwordStrength}"></meter>
        <span>${passwordStrengthLabels[passwordStrength]}</span>
      </div>
    `;
  }

  passwordsEl.innerHTML = output;
}

function displayToastMessage(text) {
  let toastEl = null;

  if (document.getElementById('toast-message')) {
    toastEl = document.getElementById('toast-message');
    toastEl.remove();
  }

  toastEl = document.createElement('p');
  toastEl.id = 'toast-message';
  toastEl.classList.add('toast-message');
  toastEl.textContent = text;

  document.body.appendChild(toastEl);

  setTimeout(function () {
    toastEl.remove();
  }, 3000);
}

function handleSubmit(e) {
  e.preventDefault();

  const passwordLength = passwordLengthInput.value;
  const passwordQuantity = passwordQuantityInput.value;
  const checkedCharacterTypes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  // Get values from checked checkboxes
  const passwordCharacterTypes = [...checkedCharacterTypes].map(
    (checkbox) => checkbox.value
  );

  const passwords = generatePasswords(
    passwordLength,
    passwordQuantity,
    passwordCharacterTypes
  );

  displayPasswords(passwords);
}

function handleClick(e) {
  if (!e.target.classList.contains('passwords__password')) {
    return;
  }

  const text = e.target.textContent.trim();

  navigator.clipboard
    .writeText(text)
    .then(function () {
      displayToastMessage('Password copied to clipboard');
    })
    .catch(function (error) {
      displayToastMessage('There was an error when copying to clipboard');
    });
}

passwordForm.addEventListener('submit', handleSubmit);

passwordsEl.addEventListener('click', handleClick);
