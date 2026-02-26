import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { persistPlugin } from './stores/persistPlugin';
import App from './App.vue';
import "./assets/main.css";
import "./assets/fonts.css"
import 'remixicon/fonts/remixicon.css';


import router from './router/router';
import UIPlugin from './plugin/ui.compunent'
import i18n from './i18n.js';

const app = createApp(App);
const pinia = createPinia();
pinia.use(persistPlugin);
app.use(UIPlugin);
app.use(router);
app.use(pinia);
app.use(i18n)
app.mount('#app');
