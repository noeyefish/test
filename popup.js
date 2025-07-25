fetch('https://raw.githubusercontent.com/RokuIL/Live-From-Israel/refs/heads/master/Channels.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('channelList');
    data.Channels.forEach(channel => {
      if (!channel.StreamUrls || channel.StreamUrls.length === 0) return;

      const validStream = channel.StreamUrls.find(url => !url.includes('@'));
      if (!validStream) return;

      const div = document.createElement('div');
      div.className = 'channel';
      div.innerHTML = `
        <div class="card">
          <img src="${channel.Logo}" alt="${channel.Title}">
          <span>${channel.Title}</span>
        </div>
      `;
      div.addEventListener('click', () => {
        window.open(`https://www.hlsplayer.org/play?url=${encodeURIComponent(validStream)}`, '_blank');
      });
      container.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById('channelList').innerHTML = '<p style="color:red;">⚠ שגיאה בטעינת הערוצים</p>';
    console.error('Error:', err);
  });
