
fetch('https://raw.githubusercontent.com/RokuIL/Live-From-Israel/refs/heads/master/Channels.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('channelList');
    data.Channels.forEach(channel => {
      if (!channel.StreamUrls || channel.StreamUrls.length === 0) return;

      const div = document.createElement('div');
      div.className = 'channel';
      div.innerHTML = `
        <img src="${channel.Logo}" alt="${channel.Title}">
        <span>${channel.Title}</span>
      `;
      div.onclick = () => {
        const url = channel.StreamUrls[0].replace(/^@@.*?@@/g, '');
        window.open(`player.html?src=${encodeURIComponent(url)}`, '_blank');
      };
      container.appendChild(div);
    });
  });
