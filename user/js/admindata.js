async function register() {
  const email = document.getElementById("email").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const vehicle = document.getElementById("vehicle").value;
  const vtype = document.getElementById("vtype").value;
  const submitbtn = document.getElementById("submitbtn");
  submitbtn.innerHTML = `loading...`;
  submitbtn.disabled = true;
  if(!email || !fname || !lname || !vehicle){
      custom_alert('warning','please fill out all the fields !!!')
  }else{
      const data={
        fname: fname,
        lname: lname,
        email: email,
        registeredby: window.localStorage.getItem('email'),
        vehicle: vehicle.toUpperCase(),
        vtype:vtype
      }
      console.log(data);
      let response = await fetch("https://wetrack-backend.herokuapp.com/admin/register", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await response.json();
      custom_alert(res.type_, res.message);
      submitbtn.innerHTML = `register`;
      submitbtn.disabled = false;
  }
  submitbtn.innerHTML = `register`;
  submitbtn.disabled = false;
}