fetch('https://raw.githubusercontent.com/RokuIL/Live-From-Israel/refs/heads/master/Channels.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('channelList');
    data.Channels.forEach(channel => {
      // מוצא כתובת סטרים חוקית (ללא @@)
      const cleanUrl = (channel.StreamUrls || []).find(url => !url.includes('@@'));
      if (!cleanUrl) return;

      const div = document.createElement('div');
      div.className = 'channel';
      div.innerHTML = `
        <img src="${channel.Logo}" alt="${channel.Title}">
        <span>${channel.Title}</span>
      `;
      div.onclick = () => {
        window.open(`player.html?src=${encodeURIComponent(cleanUrl)}`, '_blank');
      };
      container.appendChild(div);
    });
  })
  .catch(err => {
    const container = document.getElementById('channelList');
    container.innerHTML = '<p style="color:red;">שגיאה בטעינת הערוצים</p>';
    console.error('Failed to fetch channels:', err);
  });
