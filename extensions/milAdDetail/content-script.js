// document.body.style.backgroundColor = 'orange';

const MA_DOTCOM_ENCODED = 'bWlsYW51bmNpb3MuY29t'
const MA_DOTCOM = atob(MA_DOTCOM_ENCODED)

const getAdId = function (text) {
  if (text.includes('r')) return text.substring(1)
  return text
}

const getEnvironment = function (){
  return document.querySelector('[rel="canonical"]').href.includes(MA_DOTCOM)
}

document.addEventListener('click', async function(event) {
  if (event.target.className === 'ma-AdCard-adId') {
    chrome.runtime.sendMessage({ message: 'OPEN_TAB', adId: getAdId(event.target.innerText), env: getEnvironment() })
  }
})
