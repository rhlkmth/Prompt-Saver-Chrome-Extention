document.addEventListener("mouseup", function () {
  // Get the selected text
  var selectedText = window.getSelection().toString().trim();

  // Send a message to the background script if there is selected text
  if (selectedText !== "") {
    chrome.runtime.sendMessage({ action: "updateContextMenu", text: selectedText });
  }
});
