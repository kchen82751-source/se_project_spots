const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const addBtn = document.querySelector(".profile__add-btn");
const addModal = document.querySelector("#new-post-modal");
const addCloseBtn = addModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

addBtn.addEventListener("click", function () {
  addModal.classList.add("modal_is-opened");
});

addCloseBtn.addEventListener("click", function () {
  addModal.classList.remove("modal_is-opened");
});
