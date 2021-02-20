document.getElementById("LogOutbtn").addEventListener("click", () => {
    logout();
});

async function logout() {
    setTimeout(() => {
      custom_alert("success", "Logging out")
      window.localStorage.clear()
      window.location.href = "../index.html";
    }, 2000);
  }
  
  checklogin();

async function checklogin() {
  const email = window.localStorage.getItem("email");
  const jwt = window.localStorage.getItem("jwt");
  const data = {
    email: email,
    jwt: jwt
  };
  let response = await fetch("https://wetrack-backend.herokuapp.com/checklogin", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  if (res.type_ != "success") {
    custom_alert("danger", "Unauthorized Login..");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 800);
  }
  else{
      showcoordinates()
  }
}

document.getElementById("userId").innerHTML = window.localStorage.getItem("name")

function custom_alert(type, message) {
    let newAlert = $("#message");
    if (type === "success") {
      newAlert.html(`
          <div class="fade-in text-center m-0 alert alert-${type} fade show" role="alert">
              <i class="fa fa-check-circle alert-success" aria-hidden="true"></i> ${message}
          </div>`);
    } else if (type === "warning") {
      newAlert.html(`
          <div class="fade-in text-center m-0 alert alert-${type} fade show" role="alert">
              <i class="fa fa-exclamation-circle alert-warning" aria-hidden="true"></i> ${message}
          </div>`);
    } else {
      newAlert.html(`
          <div class="fade-in text-center m-0 alert alert-${type} fade show" role="alert">
              <i class="fa fa-times-circle alert-danger" aria-hidden="true"></i> ${message}
          </div>`);
    }
  
    setTimeout(() => {
      newAlert.html("");
    }, 3000);
  }
  
  function showcoordinates(){
      console.log('hello')
  }