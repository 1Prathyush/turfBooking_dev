var firebaseConfig = {
  apiKey: "AIzaSyCiE9XZPS25O5NeiUpalLdz4ZpQfbJZiAQ",
  authDomain: "slot-booking-7095c.firebaseapp.com",
  projectId: "slot-booking-7095c",
  storageBucket: "slot-booking-7095c.appspot.com",
  messagingSenderId: "516455997560",
  appId: "1:516455997560:web:8ffa259431bd2d4fb40d8d",
  measurementId: "G-9XF5V9461C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();




const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

let errorMessage = document.getElementById("error");
let simail = document.getElementById("lemail");
let sipass = document.getElementById("lpassword");
let signin = document.getElementById("lsignin");

let sumail = document.getElementById("smail");
let sname = document.getElementById("sname");
let oldpass = document.getElementById("spassword");
let newpass = document.getElementById("snpassword");

let signup = document.getElementById("ssignup");

signup.addEventListener("click", (e) => {
  e.preventDefault();

  if (oldpass.value == newpass.value) {
    if (sumail.value != " " && sname.value != " ") {
		let name = sname.value;
		let mail = sumail.value;
		let pass = newpass.value;
		console.log(name+" "+ mail +" "+pass )
    fetch("/api/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner: name,
        owner_mail: mail,
        password:pass,
      }),
    })
      // .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
     
    }
  } else {
    errorMessage.classList.remove("hide");
    errorMessage.innerHTML = "Password does not match !";
  }
});

// ------------------ signin-----------------------

signin.addEventListener('click',(e)=>{
  e.preventDefault();
  let email = simail.value;
  let password = sipass.value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    window.location ='/owner';
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });

})