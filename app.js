'use strict';

// prettier-ignore
const characters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
  'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7',
  '8', '9', '~', '`', '!', '@', '#', '$', '%', '^', '&amp;', '*', '(', ')', '_',
  '-', '+', '=', '{', '[', '}', ']', ',', '|', ':', ';', '&lt;', '&gt;', '.', '?',
  '/',
];

const passwordQuantity = 2;

const passwordForm = document.getElementById('password-form');
const passwordLengthInput = document.getElementById('password-length');
const passwordsEl = document.getElementById('passwords');

function getRandomCharacter(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function generatePassword(passwordLength) {
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += getRandomCharacter(characters);
  }
  return password;
}

function generatePasswords(passwordLength, passwordQuantity) {
  const passwords = [];

  for (let i = 0; i < passwordQuantity; i++) {
    passwords.push(generatePassword(passwordLength));
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

  const passwords = generatePasswords(passwordLength, passwordQuantity);

  displayPasswords(passwords);
}

passwordForm.addEventListener('submit', handleSubmit);
