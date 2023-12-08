document.addEventListener("DOMContentLoaded", function() {

  // Load saved texts
  loadSavedTexts();

  // Copy button click
  document.getElementById("textList").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      copyToClipboard(event.target.previousSibling.textContent); 
    }
  });

  // Copy all texts
  document.getElementById("copyAll").addEventListener("click", function() {
    
    var allText = "";
    var lis = document.querySelectorAll("#textList li");
    lis.forEach(function(li) {
      allText += li.textContent + "\n";
    });
    
    copyToClipboard(allText);
    
  });

  // Clear all saved texts
  document.getElementById("clearAll").addEventListener("click", function() {
    
    savedTexts = [];
    localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
    loadSavedTexts();
    
  });

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
    var removeButton = document.createElement("button");
    
    // Populate
    li.textContent = text;
    copyButton.textContent = "Copy";  
  
    
    // Append
    li.appendChild(copyButton);
   
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