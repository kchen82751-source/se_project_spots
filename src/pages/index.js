import "./index.css";
import {
  enableValidation,
  validationConfig,
  resetValidation,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";
import { data } from "autoprefixer";

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
const deleteBtn = deleteModal.querySelector(".modal__delete-btn");
const cancelBtn = deleteModal.querySelector(".modal__submit-btn");

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
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-button_active");
  }
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardLikeBtnEl.addEventListener("click", (evt) => {
    const isLiked = cardLikeBtnEl.classList.contains(
      "card__like-button_active",
    );
    handleLike(evt, data._id, isLiked);
  });
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  //const cancelbtn = cardElement.querySelector(".card__delete-button");
  // cardLikeBtnEl.addEventListener("click", (evt) => {
  //   const isLiked = cardLikeBtnEl.classList.contains(
  //     "card__like-button_active",
  //   );
  //   handleLike(evt, data._id, isLiked);
  // });
  //

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
  // const isLiked
  api
    .changeLikeStatus(id, isLiked)
    .then((data) => {
      console.log(data.likestatus);
      evt.target.classList.toggle("card__like-button_active");
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

// editProfileBtn.addEventListener("click", function () {
//   editProfileNameInput.value = profileNameEl.textContent; // Current line
//   editProfileDescriptionInput.value = profileDescriptionEl.textContent; // Add this line!
//   openModal(editProfileModal);
// });
//TODO - set click listener

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  // Log both values to console (as required)
  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostImageInput.value,
  };
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .addCard(inputValues)
    .then((newCard) => {
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);
      // Close the modal after submission
      closeModal(newPostModal);
      newPostForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
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
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      console.log(setButtonText);
      // TODO - Call setButtonText instead
      setButtonText(submitBtn, false);
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
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      console.log(data.avatar);
      profileAvatarEl.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(deleteBtn, "Delete"); // call it here to reset back to "Delete"
    });
}

function handleDeleteSubmit(evt) {
  setButtonText(deleteBtn, true, "Delete", "Deleting...");
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then((data) => {
      console.log(data.card);
      selectedCard.remove();
      closeModal(deleteModal);
      // TODO
      // remove the card from the DOM
      // close the modal
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(deleteBtn, false, "Delete"); // call it here to reset back to "Delete"
    });
}

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

deleteBtn.addEventListener("click", handleDeleteSubmit);
cancelBtn.addEventListener("click", () => {
  closeModal(deleteModal); // ✅ Use the correct variable name
});
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
