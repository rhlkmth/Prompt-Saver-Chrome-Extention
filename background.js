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
    // Update the context menu dynamically based on the selected text
    updateContextMenu(request.text);
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

function updateContextMenu(selectedText) {
  // Update the context menu item dynamically based on the selected text
  chrome.contextMenus.update("saveText", {
    title: "Save Text: " + selectedText,
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
