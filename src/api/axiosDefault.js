import axios from 'axios';

axios.defaults.baseURL =
    'https://drf-social-media-api-2b8e2f3d56a6.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;
