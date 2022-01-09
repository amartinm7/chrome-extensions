const color = '#3aa757';
const SEARCH_API_GATEWAY_ENCODED = 'aHR0cHM6Ly9zZWFyY2hhcGkuZ3cubWlsYW51bmNpb3MuY29t'
const SEARCH_API_GATEWAY = atob(SEARCH_API_GATEWAY_ENCODED)

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse){
    if (request.message === 'OPEN_TAB'){
        await chrome.tabs.create( { url: `${SEARCH_API_GATEWAY}/v1/ads/?ids=${request.adId}`} )
    }
})
