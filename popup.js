document.addEventListener("DOMContentLoaded", function() {

  // Load saved texts
  loadSavedTexts();

  // Copy and delete button click
 document.getElementById("textList").addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    if (event.target.classList.contains("copyBtn")) {
      copyToClipboard(event.target.previousSibling.textContent);
      showToast("Copied!");
    } else if (event.target.classList.contains("deleteBtn")) {
      deleteText(event.target.parentNode.firstChild.textContent); // Select only textNode
      loadSavedTexts();
    }
  }
});
  // Copy all textsdocument.getElementById("copyAll").addEventListener("click", function() {
  var allText = "";
  var lis = document.querySelectorAll("#textList li");
  lis.forEach(function(li) {
    allText += li.childNodes[0].textContent + "\n\n"; // Changed from li.textContent to li.childNodes[0].textContent, and added an extra "\n"
  });
  
  copyToClipboard(allText);
  showToast("Copied all!");

});

  // Clear all saved texts
  document.getElementById("clearAll").addEventListener("click", function() {
    
    savedTexts = [];
    localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
    loadSavedTexts();
    
  });



// Existing functions
function loadSavedTexts() {

  // Get saved texts
  let savedTexts = JSON.parse(localStorage.getItem("savedTexts")) || [];

  // Populate text list
  var textList = document.getElementById("textList");
  textList.innerHTML = "";
  savedTexts.forEach(function(text) {
    
    // Create elements
    var li = document.createElement("li");
    var copyButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    
    // Populate
    li.textContent = text;
    copyButton.textContent = "Copy";
    deleteButton.textContent = "Delete";
    
    // Add classes
    copyButton.classList.add("copyBtn");
    deleteButton.classList.add("deleteBtn");
  
    // Append
    li.appendChild(copyButton);
    li.appendChild(deleteButton);
   
    textList.appendChild(li);
  });

}


function copyToClipboard(text) {

  var textarea = document.createElement("textarea");
  textarea.value = text;
  
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function deleteText(text) {
  // Get saved texts
  let savedTexts = JSON.parse(localStorage.getItem("savedTexts")) || [];
  
  // Remove the text from the array
  const index = savedTexts.indexOf(text);
  if (index !== -1) {
    savedTexts.splice(index, 1);
  }

  // Update local storage
  localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
}
