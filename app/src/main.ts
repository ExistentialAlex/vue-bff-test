import './assets/main.css';

import { createApp } from 'vue';
import ui from '@nuxt/ui/vue-plugin';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

console.log(messages);

const i18n = createI18n({
  locale: 'en',
  messages,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ui);
app.use(i18n);

app.mount('#app');
