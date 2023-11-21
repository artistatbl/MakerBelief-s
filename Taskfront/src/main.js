import { createApp } from 'vue';
import App from './components/App.vue';
// import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';

import router from "./router";


import "./assets/input.css";

const app = createApp(App);

app.use(router);


app.mount('#app');
