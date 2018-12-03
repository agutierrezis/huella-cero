document.getElementById("login-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const passwordField = document.getElementById('password');
    if (passwordField.value == "12345678") {
    	document.getElementById('login-error').style.display = 'none'
    	window.location.href = "/calculo.html"
    } else {
    	document.getElementById('login-error').style.display = 'block'
    }
});