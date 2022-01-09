// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.
chrome.runtime.onInstalled.addListener(async () => {
    console.log('xcurl running app!!!')
});

const SEARCH_API_GATEWAY_ENCODED = 'aHR0cHM6Ly9zZWFyY2hhcGkuZ3cubWlsYW51bmNpb3MuY29t'
const ADS_API_GATEWAY_ENCODED = 'aHR0cHM6Ly9hZGRldGFpbC5ndy5taWxhbnVuY2lvcy5jb20='
const MA_ENCODED = 'aHR0cHM6Ly9taWxhbnVuY2lvcy5jb20='

const SEARCH_API_GATEWAY = atob(SEARCH_API_GATEWAY_ENCODED)
const ADS_API_GATEWAY = atob(ADS_API_GATEWAY_ENCODED)
const MA = atob(MA_ENCODED)

// experimental, only for testing purposes
// this info is public, you can access it from anywhere

const urlByCommand = function (queryParams) {
    const urls = {
        details: (text) => `${ADS_API_GATEWAY}/v2/ads/${text}`,
        ads: (text) => `${SEARCH_API_GATEWAY}/v1/ads/${text}`, // ?ids=xxxx&isCertified=true
        count: (text) => `${SEARCH_API_GATEWAY}/v1/search/count/${text}`, // ?cat=13
        pole: () => `${SEARCH_API_GATEWAY}/v1/pole-position-ads`,
        carousel: (text) => `${SEARCH_API_GATEWAY}/v1/search-listing/carousel/${text}`,
        categories: (text) => `${SEARCH_API_GATEWAY}/v1/categories/${text}`,
        categoryTree: (text) => `${SEARCH_API_GATEWAY}/v1/categories/${text}/category-tree`, // v1/categories/13/category-tree
        categoryHierarchy: (text) => `${SEARCH_API_GATEWAY}/v1/categories/${text}/category-hierarchy`,
        locations: (text) => `${SEARCH_API_GATEWAY}/v1/locations/${text}`, // ?regionId=28&provinceId=28
        urlprocessor: (text) => `${SEARCH_API_GATEWAY}/v1/search-urls/${text}`,
        certificate: (text) => `${SEARCH_API_GATEWAY}/v2/search/${text}/certificate`,
        popularSearches: (text) => `${SEARCH_API_GATEWAY}/v1/popular-searches/detail/${text}`,
        seoTags: (text) => `${SEARCH_API_GATEWAY}/v1/seo-tags/${text}`,
        suggestions: (text) => `${SEARCH_API_GATEWAY}/v1/category-suggestions/${text}`, // ?text=volkswagen
        listadoSNB: (text) => `${MA}/api/v2/snb/listado.php?XDEBUG_SESSION_START=PHPSTORM&pag=1&rpag=30&${text}`,
        info: () => chrome.runtime.getURL("readme.html")
    }
    return urls[queryParams[0] || 'info'](queryParams[1] || '')
}

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(async (text) => {
    const queryParams = text.split(" ")
    const newURL = urlByCommand(queryParams)
    await chrome.tabs.create({ url: newURL });
});

