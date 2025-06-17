// Цей рядок імпортує саму бібліотеку SimpleLightbox — це JavaScript-бібліотека, яка дозволяє легко створювати ефект лайтбоксу (lightbox) для зображень. Тобто, коли користувач натискає на зображення, воно відкривається в модальному вікні з затемненим фоном, стрілками навігації, підписами тощо.
import SimpleLightbox from 'simplelightbox';

// Цей рядок імпортує CSS-стилі, необхідні для коректного відображення лайтбоксу: стилі модального вікна, анімацій, кнопок закриття/навігації тощо.
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

// Створюємо новий екземпляр бібліотеки SimpleLightbox, яка відкриває зображення у модальному вікні (лайтбоксі), коли клікає по зображенню.
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

// Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
export function createGallery(images) {
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${image.likes}</p>
          <p class="info-item"><b>Views</b> ${image.views}</p>
          <p class="info-item"><b>Comments</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads</b> ${image.downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  // Метод lightbox.refresh(); у бібліотеці SimpleLightbox використовується для оновлення галереї після того, як у DOM були додані нові елементи зображень.
  // Без lightbox.refresh() нові зображення просто не відкриватимуться в модальному вікні.
  lightbox.refresh();
}

// Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
export function clearGallery() {
  gallery.innerHTML = '';
}

//  Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('is-hidden');
}

// Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.add('hidden');
}

// Повідомлення  "Loading images, please wait..." при натисканні на кнопку
export function showLoaderAdd() {
  document.querySelector('.loader-add').classList.remove('hidden');
}

export function hideLoaderAdd() {
  document.querySelector('.loader-add').classList.add('hidden');
}
