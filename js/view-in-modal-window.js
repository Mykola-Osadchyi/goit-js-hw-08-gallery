import images from './gallery-items.js';

const galleryRef = document.querySelector(".js-gallery");
const largePictureRef = document.querySelector(".lightbox__image");
const modalRef = document.querySelector(".lightbox");
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const closeModalOnPressEscape = document.querySelector(".lightbox__content");
let activeIndex;

const createImageList = image => {
  const itemRef = document.createElement('li');
  itemRef.classList.add("gallery__item");

  const linkRef = document.createElement('a');
  linkRef.classList.add("gallery__link");
  linkRef.setAttribute("href", image.original);

  const pictureRef = document.createElement('img');
  pictureRef.classList.add("gallery__image");
  pictureRef.setAttribute("src", image.preview);
  pictureRef.setAttribute("data-source", image.original);
  pictureRef.setAttribute("alt", image.description);
  pictureRef.setAttribute("data-index", images.indexOf(image));

  linkRef.appendChild(pictureRef);
  itemRef.appendChild(linkRef);
  return itemRef;
}

const photoGallery = images.map(image => createImageList(image))
galleryRef.append(...photoGallery);


galleryRef.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
closeModalOnPressEscape.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
});

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  };
  largePictureRef.setAttribute("src", event.target.dataset.source);
  modalRef.classList.add("is-open");
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onPressArrowLeft);
  window.addEventListener('keydown', onPressArrowRight);
  activeIndex = event.target.dataset.index;
};

function closeModal() {
  modalRef.classList.remove("is-open");
  largePictureRef.setAttribute("src", "");
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onPressArrowLeft);
  window.removeEventListener('keydown', onPressArrowRight);
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  };
};

function onPressArrowLeft() {
  if (event.code === 'ArrowLeft') {
    if (activeIndex > 0) {
      activeIndex = +activeIndex - 1;
    };
    changeSrc();
  };
};

function onPressArrowRight() {
  if (event.code === 'ArrowRight') {
    if (activeIndex < images.length - 1) {
      activeIndex = +activeIndex + 1;
    };
    changeSrc();
  };
};

function changeSrc() {
  largePictureRef.setAttribute("src", images[activeIndex].original);
};