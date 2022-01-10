const color = '#3aa757';
const SEARCH_API_GATEWAY_ENCODED = 'aHR0cHM6Ly9zZWFyY2hhcGkuZ3cubWlsYW51bmNpb3MuY29t'
const SEARCH_API_GATEWAY = atob(SEARCH_API_GATEWAY_ENCODED)
const SEARCH_API_GATEWAY_PRE_ENCODED = 'aHR0cHM6Ly9zZWFyY2hhcGkuZ3cubWlsYW51bmNpb3MubmV0'
const SEARCH_API_GATEWAY_PRE = atob(SEARCH_API_GATEWAY_PRE_ENCODED)

const getEnvironment = function(env) {
    return (!!env) ? SEARCH_API_GATEWAY : SEARCH_API_GATEWAY_PRE
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse){
    if (request.message === 'OPEN_TAB'){
        const env = getEnvironment(request.env)
        await chrome.tabs.create( { url: `${env}/v1/ads/?ids=${request.adId}`} )
    }
})
