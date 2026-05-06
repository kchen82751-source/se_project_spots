// TODO - pass settings object to the validation functions that are called in this file

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);

const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostForm = document.querySelector("#new-post-modal .modal__form");
const newPostSubmitBtn = document.querySelector(
  "#new-post-modal .modal__button",
);
const newPostImageInput = newPostForm.querySelector("#card-image-input");
const newPostCaptionInput = newPostForm.querySelector(
  "#new-post-caption-input",
); // or whatever the ID is
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const closeButtons = document.querySelectorAll(".modal__close-btn");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-button_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Todo - use this function wherever needed
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

// Todo - use this function wherever needed
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(popup));
});

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent; // Current line
  editProfileDescriptionInput.value = profileDescriptionEl.textContent; // Add this line!
  openModal(editProfileModal);
});

//TODO - set click listener

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Stop the page from reloading

  // Log both values to console (as required)
  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostImageInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  // Close the modal after submission
  closeModal(newPostModal);
  newPostForm.reset();
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value; // Updates name
  profileDescriptionEl.textContent = editProfileDescriptionInput.value; // Updates description
  closeModal(editProfileModal); // ✅ Use the existing function!
}

function handleCardSubmit(evt) {
  evt.previewCaptionEl();
  const values = { name: newPostCaptionInput.value, link: linkInput.value };
  const cardEl = getCardElement(values);
  cardsList.prepend(cardEl);
  evt.target.reset();
  //disableButton(cardSubmitBtn, settings);
  closeModal(cardModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, [
    editProfileNameInput,
    editProfileDescriptionInput,
  ]);
  openModal(editProfileModal);
});
editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal); // ✅ Use the correct variable name
});
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) =>
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) closeModal(modal);
  }),
);
