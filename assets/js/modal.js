// JS For the modal window, wanted to implement first to ensure it was functioning correctly

// as stated in css=, created using this tutorial ->  https://www.youtube.com/watch?v=XH5OW46yO8I

// Modal variables to handle modal opening
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const modalContainer = document.getElementById("modal-container");

// Open Modal
openModal.addEventListener("click", () => {
  modalContainer.classList.add("show-modal");
});

// Close Modal
closeModal.addEventListener("click", () => {
  modalContainer.classList.remove("show-modal");
});

// potential bug? js validator shows warnings on arrow functions, this was discussed with mentor previously that it doesn't understand arrow functions properly. will look to fix in a later update
