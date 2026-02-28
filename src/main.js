import { createApp } from 'vue';  // ← no need onMounted here
import { createPinia } from 'pinia';
import { persistPlugin } from './stores/persistPlugin';
import App from './App.vue';
import "./assets/main.css";
import 'remixicon/fonts/remixicon.css';
import router from './router/router';
import UIPlugin from './plugins/ui.compunent';
import i18n from './i18n.js';


const app = createApp(App);
const pinia = createPinia();
pinia.use(persistPlugin);

app.use(UIPlugin);
app.use(router);
app.use(pinia);
app.use(i18n);

app.mount('#app');
