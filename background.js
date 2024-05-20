chrome.runtime.onInstalled.addListener(function () {
  // Create a context menu item
  createContextMenu();
});

// Add a listener for the context menu item
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "saveText" && info.selectionText) {
    // Save the selected text to local storage
    saveText(info.selectionText);
  }
});

// Add a listener for messages from content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateContextMenu") {
    // Update the context menu item with the new number of saved texts
    updateContextMenu(request.text);
  }
});

// Add a listener for the keyboard shortcut
chrome.commands.onCommand.addListener(function (command) {
  if (command === "saveTextShortcut" || command === "saveTextWithCtrlQ") {
    // Get the currently active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Get the selected text from the active tab
      chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedText" }, function (response) {
        if (response && response.text) {
          // Save the selected text to local storage
          saveText(response.text);
        }
      });
    });
  }
});

function createContextMenu() {
  // Create a context menu item
  chrome.contextMenus.create({
    id: "saveText",
    title: "Save Text",
    contexts: ["selection"],
  });
}

function saveText(text) {
  // Get existing saved texts or initialize an empty array
  let savedTexts = JSON.parse(localStorage.getItem("savedTexts")) || [];

  // Add the new text to the array
  savedTexts.push(text);

  // Save the updated array back to local storage
  localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
}

function updateContextMenu(text) {
  // Update the context menu item dynamically based on the selected text
  chrome.contextMenus.update("saveText", {
    title: "Save Text: " + text,
  });
}