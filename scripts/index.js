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
const newPostModal = document.querySelector("#new-post-modal"); // What is newPostModal
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn"); // What is addModal
const newPostForm = document.querySelector("#new-post-modal .modal__form");
const newPostImageInput = newPostForm.querySelector("#card-image-input");
const newPostCaptionInput = newPostForm.querySelector(
  "#new-post-caption-input",
); // or whatever the ID is
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const closeButtons = document.querySelectorAll(".modal__close-btn");
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
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

//editProfileCloseBtn.addEventListener("click", function () {
//  closeModal(editProfileModal);
//});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Stop the page from reloading

  // Log both values to console (as required)
  console.log("Image link:", newPostImageInput.value);
  console.log("Description:", newPostCaptionInput.value);

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

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
