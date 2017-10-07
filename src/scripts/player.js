var hls;

function playM3u8(url){
  var video = document.getElementById('video');
  if(hls){ hls.destroy(); }
  hls = new Hls({debug:false});
  hls.on(Hls.Events.ERROR, function(event,data) {
    console.error(data);
    if(data.fatal) {
      switch(data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          console.error("fatal network error encountered");
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          console.error("fatal media error encountered, try to recover");
          hls.recoverMediaError();
          break;
        default:
          console.error("fatal cannot recover. destroy hls.");
          hls.destroy();
          break;
      }
    }
  });
  var m3u8Url = decodeURIComponent(url)
  hls.loadSource(m3u8Url);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED,function() {
    video.play();
  });
  document.title = url
}

var s = document.createElement('script');
s.src = chrome.runtime.getURL('hls.js');
s.onload = function() { playM3u8(window.location.href.split("#")[1]); };
(document.head || document.documentElement).appendChild(s);

window.addEventListener('hashchange', function() {
  playM3u8(window.location.href.split("#")[1]);
});
