document.addEventListener("DOMContentLoaded", () => {

  // Load saved texts
  loadSavedTexts();

  // Text list click event
  document.getElementById("textList").addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON") {
      const textItem = target.parentNode;

      if (target.classList.contains("copyBtn")) {
        copyToClipboard(textItem.textContent);
        showToast("Copied!");
      } else if (target.classList.contains("clearBtn")) {
        clearText(textItem);
        loadSavedTexts();
      }
    }
  });

  // Copy all texts
  document.getElementById("copyAll").addEventListener("click", () => {
    const allText = "";
    const textItems = document.querySelectorAll("#textList li");
    textItems.forEach((li) => {
      allText += li.textContent + "\n";
    });
    copyToClipboard(allText);
    showToast("Copied all!");
  });

  // Clear all saved texts
  document.getElementById("clearAll").addEventListener("click", () => {
    savedTexts = [];
    localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
    loadSavedTexts();
  });
});

// Existing functions
function loadSavedTexts() {
  // Get saved texts
  const savedTexts = JSON.parse(localStorage.getItem("savedTexts")) || [];

  // Clear and populate text list
  const textList = document.getElementById("textList");
  textList.innerHTML = "";
  savedTexts.forEach((text) => {
    const li = document.createElement("li");
    const copyButton = document.createElement("button");
    const clearButton = document.createElement("button");

    li.textContent = text;
    copyButton.textContent = "Copy";
    clearButton.textContent = "Clear";

    copyButton.classList.add("copyBtn");
    clearButton.classList.add("clearBtn");

    li.appendChild(copyButton);
    li.appendChild(clearButton);
    textList.appendChild(li);
  });
}

function clearText(textItem) {
  // Remove the text content and element from the DOM
  textItem.textContent = "";
  textItem.parentNode.removeChild(textItem);

  // Update saved texts and local storage
  const text = textItem.textContent;
  savedTexts = savedTexts.filter((savedText) => savedText !== text);
  localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
}
