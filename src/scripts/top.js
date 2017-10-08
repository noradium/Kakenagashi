import renderApp from './app';
import SessionStorage from "./storage/SessionStorage";

const oauthAccessToken = SessionStorage.get('access_token');
if (!oauthAccessToken) {
  location.href = 'https://app.onsen.ag/users/sign_in';
}
document.body.innerHTML = '<div id="app-root"></div>';
renderApp('#app-root', {oauthAccessToken});
