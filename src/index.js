import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const seachForm = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load-more');

seachForm.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onBtnLoadMore);

let searchQuery = '';
let page = 1;
let hits = 0;
const perPage = 40;

let simpleLightbox = new SimpleLightbox('.gallery a ', {
  showCounter: false,
  captions: true,
  captionDelay: 250,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
});

async function onSearch(e) {
  e.preventDefault();
  cleanSearch();
  btnHidden();

  try {
    searchQuery = e.currentTarget.searchQuery.value;
    page = 1;

    if (searchQuery === '') {
      return;
    }

    const response = await fetchImages(searchQuery, page);
    hits = response.hits.length;

    if (response.totalHits > 40) {
      btnShown();
    } else {
      btnHidden();
    }

    if (response.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);

      cleanSearch();
      renderGallery(response.hits);
    }
       simpleLightbox.refresh();

    if (response.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      cleanSearch();
      btnHidden();
    }
  } catch {
    console.error();
  }
}

async function onBtnLoadMore() {
  page += 1;
  try {
    const response = await fetchImages(searchQuery, page, perPage);
    renderGallery(response.hits);

      const totalPages = Math.ceil(response.totalHits / perPage);
 
    if (page >= totalPages) {
      btnHidden();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      renderGallery(response.hits);
      const totalHits = Math.ceil(response.totalHits - (page - 1) * perPage);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      simpleLightbox.refresh();
    }
  } catch (error) {
      console.log(error);
  }

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}

function btnHidden() {
  btnLoadMore.classList.add('is-hidden');
}
function btnShown() {
  btnLoadMore.classList.remove('is-hidden');
}

function cleanSearch() {
  gallery.innerHTML = '';
}

