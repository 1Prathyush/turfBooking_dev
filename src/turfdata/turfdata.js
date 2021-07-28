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
  




const logout = document.getElementById('logout');
const tname = document.getElementById('tname');
const phone = document.getElementById('ph');
const place = document.getElementById('place');
const pinCode = document.getElementById('pin');
const district = document.getElementById('district');
const submit = document.getElementById('submit');
const lmark = document.getElementById('lmark');
let  useruid = null;

const togglebutton = document.getElementsByClassName("toggle-button")[0];
const navbarlinks = document.getElementsByClassName("navbar-links")[0];
const logoname = document.getElementsByClassName("turfname")[0];
togglebutton.addEventListener("click", () => {
  togglebutton.classList.toggle("open");
  navbarlinks.classList.toggle("active");
  logoname.classList.toggle("hide");
});


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
          useruid = idToken;
         displayData();
        });
    } else {
       document.body.classList.toggle('hide'); 
      console.log("not signed in");
      window.location = '/login'
    }
  });

function displayData(){
  fetch("/api/ownerdetails", {
    method: "GET",
    headers: {
      id: useruid,
    },
  })
    .then((response) => response.json())
    .then((data) => {
     tname.value = data.turfName;
     phone.value = data.PhoneNumber;
     lmark.value = data.landmark;
     place.value = data.turfPlace;
     pin.value = data.pincode;
     district.value = data.district;
     logoname.innerHTML = data.turfName;
    })
    .catch((err) => {
      console.log(err);
    });

}

logout.addEventListener('click',(e)=>{
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      console.log('signin successfull')
      window.location ='/'
    }).catch((error) => {
      console.log(error)
    });
  })

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(useruid);
    fetch('/api/addturfdata',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            id:useruid,

        },
        body: JSON.stringify({
            trname : tname.value,
            phonenumber :phone.value,
            tplace :place.value,
            landMark :lmark.value,
            pin :pinCode.value,
            tdistrict :district.value
        })
    }) // .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
})  