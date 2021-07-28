let date = document.getElementById("date");
let sub = document.getElementById("submit");
let container = document.getElementById('container');
var heading = ["6 AM","7 AM","8 AM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"];
var keys = ["SixAM","SevenAM","EightAM","SixPM","SevenPM","EightPM","NinePM","TenPM","ElevenPM"];
let path = window.location.pathname.split("/");
let turfid = path.pop();
console.log(turfid);
let mail = sessionStorage.getItem("ClientMail");

let table =  document.createElement('table');
table.className = "gridtable";
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');
let headRow = document.createElement("tr");
let bodyrow = document.createElement('tr');

heading.forEach((ele)=>{
  let th = document.createElement("th");
  th.appendChild(document.createTextNode(ele));
  headRow.appendChild(th);
})
thead.appendChild(headRow);
table.appendChild(thead);
container.appendChild(table);

var turfdata = null;
fetch("/api/bookeddetails", {
  method: "GET",
  headers: {
    turf: turfid,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    turfdata = data; 
   // availableTurf(data);
  })
  .catch((err) => {
    console.log(err);
  });




date.addEventListener('change',(_e)=>{
  console.log(date.value);
  console.log(turfdata.BookingStates);
  keys.forEach((ele)=>{
    let td = document.createElement('td');
      td.className = ele;
        let button = document.createElement('button');
        button.value = ele;
        button.innerHTML = " BOOK !"
        button.id = "btnp" ;
        button.className ="btnp";
        button.addEventListener('click',e=>{
              let confirmed = confirm("are you sure");
              if(confirmed){
                e.preventDefault();
                //console.log(e.target.value);
                bookit(e.target.value,date.value);
              }
        })
        td.appendChild(button);
        bodyrow.appendChild(td);

  })
  tbody.appendChild(bodyrow);
  table.appendChild(tbody);

})


function bookit(time,date){
  console.log(time);
  console.log(date);
  console.log(mail);
  fetch("/api/book",{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      tid :turfid,
    },
    body:JSON.stringify({
      bmail:mail,
      btime:time,
      bdate:date
    })
  })// .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}