const Adminbtn = document.getElementById('admin')
const Loginbtn = document.getElementById('Login')


Loginbtn.addEventListener('click', () => {
    window.location.href = 'index.html'
});

Adminbtn.addEventListener('click', () => {
    window.location.href = 'admin.html'
});


if(!navigator.cookieEnabled){
    let newAlert = $("#message");
    message = 'This site uses cookies in order to ensure secure login and logout. Please enable cookies in your browser and comeback..'
    newAlert.html(`
        <div class="fade-in text-center m-0 alert alert-warning fade show" role="alert">
            <i class="fa fa-exclamation-circle alert-warning" aria-hidden="true"></i> ${message}
        </div>`);
}

