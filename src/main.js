// Цей рядок імпортує бібліотеку iziToast — це популярна JavaScript-бібліотека для створення гарних сповіщень (тостів) у вебдодатках.
import iziToast from 'izitoast';

// Цей рядок імпортує CSS-стилі iziToast.
// Вони потрібні, щоб зробити візуальне оформлення сповіщень відповідно до дизайну iziToast (кольори, анімації, розташування тостів тощо).
import 'izitoast/dist/css/iziToast.min.css';

// // Бібліотека з гарними індикаторами завантаження css-loader
import './css/loader.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoaderAdd,
  hideLoaderAdd,
} from './js/render-functions';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const loaderAdd = document.querySelector('.loader-add');

let currentQuery = '';
let currentPage = 1;
let totalPages = 0;

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  const query = event.target.elements.query.value.trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  try {
    showLoader(); // Показуємо лоадер
    hideLoadMoreButton(); // Приховуємо кнопку "Load more"
    showLoaderAdd(); // При натисканні кнопок "Search" з'являється повідомлення "Loading images, please wait..."
    clearGallery(); // Очищаємо попередню галерею

    const data = await getImagesByQuery(currentQuery, currentPage);
    console.log(data);

    if (data.hits.length === 0) {
      //  Метод бібліотеки iziToast, який показує інформаційне (info) повідомлення. Якщо бекенд повертає порожній масив, це означає, що нічого підходящого не було знайдено. У такому випадку відображай повідомлення з текстом:
      //  'Sorry, there are no images matching your search query. Please try again!'
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    console.log(data.hits);

    totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader(); // Ховаємо лоадер, навіть при помилці
    hideLoaderAdd(); // Ховаємо повідомлення "Loading images, please wait..."
  }
  event.target.reset();
}

async function handleLoadMore() {
  currentPage += 1;
  // console.log(currentPage);

  try {
    showLoader(); // Показуємо лоадер
    hideLoadMoreButton(); // Приховуємо кнопку "Load more"
    showLoaderAdd(); // При натисканні кнопок "Search" з'являється повідомлення "Loading images, please wait..."

    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    // Знаходимо перший елемент на сторінці з класом gallery-item.
    const galleryItem = document.querySelector('.gallery-item');

    //     Отримуємо розміри та позицію елемента відносно вікна перегляду.
    // Беремо тільки висоту (height).
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2, // Прокручує сторінку вниз на величину height * 200 пікселів з плавною анімацією "smooth":
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage >= totalPages) {
      hideLoadMoreButton(); // Приховуємо кнопку "Load more"

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader(); // Ховаємо лоадер
    hideLoaderAdd(); // Ховаємо повідомлення "Loading images, please wait..."
  }
}
