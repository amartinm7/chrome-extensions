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
    console.log('running app!!!')
})

function setRedBackgroundPage(){
    function setBackgroundColor() {
        document.body.style.backgroundColor = '#13C1AC'
    }

    function changeMain() {
        let myHeader = document.getElementsByClassName('ma-LogoMilanuncios')
        if (myHeader && myHeader.item(0) && myHeader.item(0).childNodes[0]) {
            console.log(">>>changeMain...")
            myHeader.item(0).removeChild(myHeader.item(0).childNodes[0])
            let elem = document.createElement("img");
            elem.src = 'https://es.wallapop.com/images/logos/img_logo_footer.png';
            myHeader.item(0).appendChild(elem)
        }
    }

    function changeAnuncios() {
        let myHeader = document.getElementsByClassName('maLogo')
        if (myHeader && myHeader.item(0) && myHeader.item(0).childNodes[1] && myHeader.item(0).childNodes[1].children[0]) {
            console.log(">>>changeAnuncios...")
            myHeader.item(0).childNodes[1].children[0].src = 'https://es.wallapop.com/images/logos/img_logo_footer.png';
        }
    }
    setBackgroundColor()
    changeMain()
    changeAnuncios()
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: setRedBackgroundPage
    })
})
