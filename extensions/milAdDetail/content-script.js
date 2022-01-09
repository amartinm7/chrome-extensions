// document.body.style.backgroundColor = 'orange';

const getAdId = function (text) {
  if (text.includes('r')) return text.substring(1)
  return text
}

document.addEventListener('click', async function(event) {
  if (event.target.className === 'ma-AdCard-adId') {
    chrome.runtime.sendMessage({ message: 'OPEN_TAB', adId: getAdId(event.target.innerText) })
  }
})
