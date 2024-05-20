// Add a listener for the keyboard shortcut
chrome.commands.onCommand.addListener(function (command) {
  if (command === "saveTextShortcut" || command === "saveTextWithCtrlQ") {
    // Get the selected text from the current page
    let selectionText = window.getSelection().toString();
    // Send the selected text to the background script
    chrome.runtime.sendMessage({
      action: "getSelectedText",
      text: selectionText,
    });
  }
});

// Add a listener for the keyboard shortcut
chrome.commands.onCommand.addListener(function (command) {
  if (command === "saveTextShortcut" || command === "saveTextWithCtrlQ") {
    // Get the selected text from the current page
    let selectionText = window.getSelection().toString();
    // Send the selected text to the background script
    chrome.runtime.sendMessage({
      action: "updateContextMenu",
      text: selectionText,
    });
  }
});

// Update the context menu item with the new number of saved texts
function updateContextMenu(text) {
  chrome.runtime.sendMessage({
    action: "updateContextMenu",
    text: text,
  });
}