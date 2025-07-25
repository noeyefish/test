const PRIMARY_URL = 'https://raw.githubusercontent.com/RokuIL/Live-From-Israel/refs/heads/master/Channels.json';
const FALLBACK_URL = 'https://raw.githubusercontent.com/noeyefish/test/refs/heads/main/channels.json';

function loadChannels(url) {
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });
}

loadChannels(PRIMARY_URL)
  .catch(err => {
    console.warn('Primary JSON failed, loading fallback:', err);
    return loadChannels(FALLBACK_URL);
  })
  .then(data => {
    const container = document.getElementById('channelList');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    function toggleFavorite(title) {
      const idx = favorites.indexOf(title);
      if (idx > -1) favorites.splice(idx, 1);
      else favorites.push(title);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      renderChannels(data.Channels);
    }

    function renderChannels(channels) {
      container.innerHTML = '';
      // מועדפים קודם
      channels.sort((a, b) => {
        const aFav = favorites.includes(a.Title);
        const bFav = favorites.includes(b.Title);
        return (bFav - aFav);
      });

      channels.forEach(channel => {
        if (!channel.StreamUrls || channel.StreamUrls.length === 0) return;
        const validStream = channel.StreamUrls.find(u => !u.includes('@'));
        if (!validStream) return;

        const isFav = favorites.includes(channel.Title);
        const div = document.createElement('div');
        div.className = 'channel';
        div.innerHTML = `
          <div class="card">
            <img src="${channel.Logo}" alt="${channel.Title}">
            <span>${channel.Title}</span>
            <button class="fav-btn" title="הוסף למועדפים">
              ${isFav ? '⭐' : '☆'}
            </button>
          </div>
        `;

        div.querySelector('img').addEventListener('click', () => {
          window.open(
            `https://www.hlsplayer.org/play?url=${encodeURIComponent(validStream)}`,
            '_blank'
          );
        });

        div.querySelector('.fav-btn').addEventListener('click', e => {
          e.stopPropagation();
          toggleFavorite(channel.Title);
        });

        container.appendChild(div);
      });
    }

    renderChannels(data.Channels);
  })
  .catch(err => {
    document.getElementById('channelList').innerHTML =
      '<p style="color:red;">⚠ שגיאה בטעינת הערוצים</p>';
    console.error('Failed to load any channel list:', err);
  });
