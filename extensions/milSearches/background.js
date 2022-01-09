// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.
const MA_ENCODED = 'aHR0cHM6Ly9taWxhbnVuY2lvcy5jb20='
const MA = atob(MA_ENCODED)

chrome.runtime.onInstalled.addListener(async () => {
    console.log('running app!!!')
});

// experimental, only for testing purposes
// this info is public, you can access it from anywhere

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener((text) => {
    // Encode user input for special characters , / ? : @ & = + $ #
    let newURL = `${MA}/anuncios/?s=${encodeURIComponent(text)}&fromSearch=1&fromSuggester=1&suggestionUsed=0`
    chrome.tabs.create({ url: newURL });
});

