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

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent; // Current line
  editProfileDescriptionInput.value = profileDescriptionEl.textContent; // Add this line!
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

const newPostForm = document.querySelector("#new-post-modal .modal__form");
const newPostTitleInput = newPostForm.querySelector("#card-title-input"); // or whatever the ID is
const newPostDescriptionInput = newPostForm.querySelector(
  "#new-post-description-input",
); // or whatever the ID is

// Then add the submit event listener
newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Stop the page from reloading

  // Log both values to console (as required)
  console.log("Title:", newPostTitleInput.value);
  console.log("Description:", newPostDescriptionInput.value);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value; // Updates name
  profileDescriptionEl.textContent = editProfileDescriptionInput.value; // Updates description
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
