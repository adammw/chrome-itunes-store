var data = JSON.parse(location.hash.substring(1));
document.getElementById('message').innerText = data.message;
document.getElementById('explanation').innerText = data.explanation;
document.getElementById('signInHyperLink').value = data.okButtonString;
document.getElementById('cancelHyperLink').value = data.cancelButtonString;
document.getElementById('cancelHyperLink').addEventListener('click', function() {
	history.go(-2);
})