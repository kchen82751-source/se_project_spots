import "./index.css";
import {
  enableValidation,
  validationConfig,
  resetValidation,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";
import { data } from "autoprefixer";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8331744f-c70c-4ee0-a9a7-666e6ad76c65",
    "Content-Type": "application/json",
  },
});

// Destructure the second item in the callback of the .then()

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
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

const avatarModal = document.querySelector("#avatar-profile-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// Delete forms elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");
const closeButtons = document.querySelectorAll(".modal__close-btn");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

let selectedCard, selectedCardId;

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  // TODO - if the card is Liked, set the active class on the card

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  // cardLikeBtnEl.addEventListener("click", () => {
  //   cardLikeBtnEl.classList.toggle("card__like-button_active");
  // });

  const isLiked = cardLikeBtnEl.classList.contains("card__like-button_active");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardLikeBtnEl.addEventListener("click", (evt) =>
    handleLike(evt, data._id, isLiked),
  );
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove(data._id);
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

function handleLike(evt, id, isLiked) {
  evt.target.classList.toggle("card__like-button_active");
  // const isLiked
  api
    .changeLikeStatus(id, isLiked)
    .then((data) => {
      console.log(data.likestatus);
      // cardLikeBtnEl.src = data.likestatus;
    })
    .catch(console.error);
  // 1. check whether card is currently liked or not
  //     const isLiked = ???;
  // 2. call the changeLikeStatus method, passing it the appropriate arguments
  // 3. handle the response (.then and .catch)
  // 4. in the .then, toggle active class
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
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
  //TODO2: implement API

  // Log both values to console (as required)
  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostImageInput.value,
  };

  api.addCard(inputValues).then((newCard) => {
    const cardElement = getCardElement(inputValues);
    cardsList.prepend(cardElement);
    // Close the modal after submission
    closeModal(newPostModal);
    newPostForm.reset();
  });
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  // Change text content to "Saving..."
  const submitBtn = evt.submitter;
  // submitBtn.textContent = "Saving...";
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      // TODO - Use data argument instead of the input value
      profileNameEl.textContent = editProfileNameInput.value;
      profileDescriptionEl.textContent = editProfileDescriptionInput.value;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      // TODO - Call setButtonText instead
      submitBtn.textContent = "Save";
    });
}

// TODO - implement loading text for all other form submissions

function handleCardSubmit(evt) {
  evt.previewCaptionEl();
  const values = { name: newPostCaptionInput.value, link: linkInput.value };
  const cardEl = getCardElement(values);
  cardsList.prepend(cardEl);
  evt.target.reset();
  //disableButton(cardSubmitBtn, settings);
  closeModal(cardModal);
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

// TODO - Finish avatar submission handler
function handleAvatarSubmit(evt) {
  // TODO prevent behavior
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      console.log(data.avatar);
      profileAvatarEl.src = data.avatar;
    })
    .catch(console.error);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(cardInput)
    .then((data) => {
      console.log(data.card);
      cardDeleteBtnEl.src = data.card;
      // TODO
      // remove the card from the DOM
      // close the modal
    })
    .catch(console.error);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    validationConfig,
  );
  openModal(editProfileModal);
});
editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal); // ✅ Use the correct variable name
});
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// TODO - select avatar modal button at top of the page
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) =>
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) closeModal(modal);
  }),
);
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    profileAvatarEl.src = userInfo.avatar;

    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });
  })
  .catch(console.error);

enableValidation(validationConfig);
