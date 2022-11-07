export { renderGallery };

const gallery = document.querySelector('.gallery');

function renderGallery(hits) {
  const markup = hits
    .map(hit => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = hit;
      return `<div class="photo-card">
      <a class="gallery__item" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <p><b>Likes</b> <br>${likes}</br></p>
        </p>
        <p class="info-item">
          <p><b>Views</b> <br>${views}</br></p>
        </p>
        <p class="info-item">
          <p><b>Comments</b> <br>${comments}</br></p>
        </p>
        <p class="info-item">
          <p><b>Downloads</b> <br>${downloads}</br></p>
        </p>
      </div>
      </a>
    </div>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
