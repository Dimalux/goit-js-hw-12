import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50787945-1edbab8bb6a94afd781f3e3fd';

// Ця функція повинна приймати два параметри query (пошукове слово, яке є рядком) та page (номер сторінки, яка є числом), здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  const response = await axios(BASE_URL, { params });
  return response.data;
}