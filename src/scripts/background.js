import URL from 'url';

/**
 * oauth のアクセストークン取得に必要な code が手に入った時点で値が入る変数です。
 * @type {string|null}
 */
let code = null;

chrome.webRequest.onBeforeRedirect.addListener(
  (details) => {
    const url = URL.parse(details.redirectUrl, true);
    if (/^ag.onsen.app:\/\/oauth2callback/.test(url.href)) {
      code = url.query.code;
    }
  },
  {urls: ['<all_urls>']}
);

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    switch (request.command) {
      case 'get_oauth_code':
        sendResponse({code});
        break;
    }
});

// 普通に hls.js を使うだけだと、Access-Control-Allow-Origin で引っかかるのでその対応
// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     // if (details.url.split("?")[0].split("#")[0].endsWith(".m3u8")) {
//     //   const playerUrl = `${chrome.runtime.getURL('player.html')}#${details.url}`;
//     //   console.log('playerurl', playerUrl);
//     //   return { redirectUrl:  playerUrl }
//     // }
//   },
//   {urls: ["*://*/*.m3u8*"], types:["main_frame"]},
//   ["blocking"]
// );
