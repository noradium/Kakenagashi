import ChromeStorage from './storage/ChromeStorage';
import renderApp from './app';

document.body.innerHTML = '<div id="app-root"></div>';
ChromeStorage.get('access_token')
  .then((oauthAccessToken) => {
    renderApp('#app-root', {oauthAccessToken});
  });
