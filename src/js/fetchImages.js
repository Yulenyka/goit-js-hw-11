import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const requestParam = 'image_type=photo&orientation=horizontal&safesearch=true';

export async function fetchImages(searchQuery, page) {
  const KEY = '30988799-bc2877f62696d6c83d6999662';
  const response = await axios.get(
    `?key=${KEY}&q=${searchQuery}&${requestParam}&page=${page}&per_page=40`
  );
  return response.data;
}
