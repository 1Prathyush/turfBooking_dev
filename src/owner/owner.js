var firebaseConfig = {
  apiKey: "AIzaSyCiE9XZPS25O5NeiUpalLdz4ZpQfbJZiAQ",
  authDomain: "slot-booking-7095c.firebaseapp.com",
  projectId: "slot-booking-7095c",
  storageBucket: "slot-booking-7095c.appspot.com",
  messagingSenderId: "516455997560",
  appId: "1:516455997560:web:8ffa259431bd2d4fb40d8d",
  measurementId: "G-9XF5V9461C",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//------------- variables---------------------//
const logout = document.getElementById('logout');




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
        fetch("/api/ownerdetails", {
          method: "GET",
          headers: {
            id: idToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            logoname.innerHTML = data.turfName;
          })
          .catch((err) => {
            console.log(err);
          });
      });
  } else {
    console.log("not signed in");
    window.location = '/login'
  }
});

logout.addEventListener('click',(e)=>{
  e.preventDefault();
  firebase.auth().signOut().then(() => {
    console.log('signin successfull')
    window.location ='/'
  }).catch((error) => {
    console.log(error)
  });
})