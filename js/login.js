const loginbtn = document.getElementById('loginbtn');

loginbtn.addEventListener('click',()=>{
    loginbtn.innerHTML = "loading..."
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
        custom_alert('warning', 'Please Fill all the Fields...')
        loginbtn.innerHTML = 'Try again'
    } else {
        Check(email, password)
    }
})


async function Check(email, password) {
    let data = {
        email: email,
        password: password
    }
    let response = await fetch('https://wetrack-backend.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let res = await response.json()
    console.log(res)
    custom_alert(res.type_, res.message);
    if (res.type_ == 'success') {
        loginbtn.innerHTML = 'login successful'
        window.localStorage.setItem("email", res.email);  
        window.localStorage.setItem("id", res.id);  
        window.localStorage.setItem("jwt", res.jwt);  
        window.localStorage.setItem("name", res.name);  
        setTimeout(() => {
            window.location.href = 'user/home.html';
        }, 1000);
    } else {
        loginbtn.innerHTML = 'login'
    }
}