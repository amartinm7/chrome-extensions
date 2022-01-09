const color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color })
    console.log('Default background color set to %cgreen', `color: ${color}`);
})

function runShortcutExtension(name) {
    alert(`"${name}" executed`);
    console.log(`"${name}" executed`)
    chrome.browserAction.setIcon(
        details,
        function() {/**/}
    );
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: runShortcutExtension,
        args: ['action'],
    });
});

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
});
