function decode(text) {
  let decoded = '';
  const chars = '1234567890qwertyuiopasdfghjklzxcvbnm .,?!)(:;-_|';
  for (let i = 0; i < text.length; i += 2) {
    const nums = parseFloat(text.charAt(i) + text.charAt(i + 1));
    decoded += chars.charAt(nums - 1);
  }
  console.log(`Decoded: ${decoded}`);
  const splitString = decoded.split('|');
  if (splitString.length === 2) {
    return splitString;
  } else {
    return ['', ''];
  }
}

function refresh () {
  document.getElementById('link').href = `https://scratch.mit.edu/projects/${document.getElementById('server').value}`
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://clouddata.scratch.mit.edu/logs?projectid=807628538&limit=100&offset=0')}`).then((r) => r.json()).then((j) => {
    console.log(`Fetched: ${j}`)
    let dataHTML = ''
    for (let x = 0; x < j.length; x++) {
      const user = decode(j[x].value)[0];
      const text = decode(j[x].value)[1];
      const date = new Date(j[x].timestamp);
      const datestring = timeago().format(date);
      dataHTML += `<p><a href='https://scratch.mit.edu/users/${user}'>${user}</a>: ${text} <i style='color:#ddd'>${datestring}</i></p>`;
      console.log(`${user}: ${text}`);
    }
    document.getElementById('data').innerHTML = dataHTML;
    console.log(dataHTML);
    const d = new Date();
    document.getElementById('refresh').innerHTML = `Refreshed at: ${d.toTimeString()}`;
    console.log(`Refreshed at: ${d.toTimeString()}`);
  });
}
window.addEventListener('load', () => {
  refresh();
  setInterval(refresh, 10000);
});
