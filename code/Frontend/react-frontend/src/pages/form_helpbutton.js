window.onload = function() {
    var clickMeButton = document.getElementById('clickme');
    clickMeButton.onclick = youClicked;
}
function youClicked(){
    alert('Please fill in the boxes below.\nIncomplete information will not be submitted.');
}