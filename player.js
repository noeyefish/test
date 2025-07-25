const urlParams = new URLSearchParams(window.location.search);
const src = urlParams.get('src');
const video = document.getElementById('video');

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(src);
  hls.attachMedia(video);
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = src;
} else {
  document.body.innerHTML = '<p style="color:white;text-align:center;">⚠ הדפדפן לא תומך ב־HLS</p>';
}
