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

const passwordForm = document.getElementById('password-form');
const passwordLengthInput = document.getElementById('password-length');
const passwordQuantityInput = document.getElementById('password-quantity');
const passwordsEl = document.getElementById('passwords');

function getRandomCharacter(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function generatePassword(passwordLength, passwordCharacterTypes) {
  let characters = [];

  for (const characterType of passwordCharacterTypes) {
    characters = [...characters, ...passwordCharacters[characterType]];
  }

  if (characters.length < 1) {
    return `<span class="warning">Please choose at least one character type!</span>`;
  }

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += getRandomCharacter(characters);
  }
  return password;
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

  for (const password of passwords) {
    output += `
      <p class="passwords__password">
        ${password}
      </p>
    `;
  }

  passwordsEl.innerHTML = output;
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

passwordForm.addEventListener('submit', handleSubmit);
