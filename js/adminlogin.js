const sendotpBtn = document.getElementById('sendotp');
const AdminLoginForm = document.getElementById('AdminLogin-Form');

sendotpBtn.addEventListener('click', async () => {
    sendotpBtn.disabled = true;
    sendotpBtn.innerHTML = 'sending...'
    AdminLoginForm.innerHTML = ""
    let response = await fetch('https://wetrack-backend.herokuapp.com/admin/requestLogin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let res = await response.json()
    sendotpBtn.innerHTML = res.message
    if (res.type_ == 'success') {
        const otpdiv = document.createElement('div');
        otpdiv.className = 'otpHandler fade-in'
        otpdiv.innerHTML = `
        <div class="form-group mt-1">
             <label for="password">OTP</label>
             <input type="password" class="form-control" id="password__" required>
        </div>
        <div class="form-group">
                <button type="button" id="adminloginbtn" onclick="adminlogin()" class="btn btn-block">Login</button>
        </div>
        `
        AdminLoginForm.appendChild(otpdiv)
    }
})



function adminlogin() {
    const adminloginbtn = document.getElementById('adminloginbtn');
    adminloginbtn.innerHTML = "loading..."
    const password = document.getElementById('password__').value;
    if (!password) {
        custom_alert('warning', 'Please Fill all the Fields...')
        loginbtn.innerHTML = 'Try again'
    } else {
        Checkotp(password)
    }
}


async function Checkotp(password) {
    const adminloginbtn = document.getElementById('adminloginbtn');
    adminloginbtn.innerHTML = "Loading..."
    let data = {
        otp: password
    }
    adminloginbtn.innerHTML = 'Loading...'
    let response = await fetch('https://wetrack-backend.herokuapp.com/admin/adminlogin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let res = await response.json()
    custom_alert(res.type_, res.message);
    if (res.type_ == 'success') {
        adminloginbtn.innerHTML = 'login successful'
        window.localStorage.setItem("email", res.email);  
        window.localStorage.setItem("id", res.id);  
        window.localStorage.setItem("jwt", res.jwt);  
        window.localStorage.setItem("name", res.name);  
        setTimeout(() => {
            window.location.href = 'user/registeruser.html';
        }, 1000);
    } else {
        adminloginbtn.innerHTML = 'Login'
    }
}