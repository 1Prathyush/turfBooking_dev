let BookingStates = [
  {
    bookdate: "2021-06-25",
    TimeSlot: [
      {
        SixAM: " ",
        SevenAM: " ",
        EightAM: " ",
        SixPM: " ",
        SevenPM: "1151s",
        EightPM: " ",
        NinePM: " ",
        TenPM: " ",
        ElevenPM: " ",
      },
    ],
  },
  {
    bookdate: "2021-06-22",
    TimeSlot: [
      {
        SixAM: " ",
        SevenAM: " ",
        EightAM: "1151s",
        SixPM: " ",
        SevenPM: "1151s",
        EightPM: "",
        NinePM: "",
        TenPM: " ",
        ElevenPM: "",
      },
    ],
  },
];
var x = null; /* BookingStates.length + 1; */
let container = document.getElementById("container");
let date = document.getElementById("date");
let heading = [
  "6 AM",
  "7 AM",
  "8 AM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];
let table = document.createElement("table");
table.className = "gridtable";
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let headRow = document.createElement("tr");
let bodyrow = document.createElement('tr');

heading.forEach((ele) => {
  let th = document.createElement("th");
  th.appendChild(document.createTextNode(ele));
  headRow.appendChild(th);
});
thead.appendChild(headRow);
table.appendChild(thead);
container.appendChild(table);

date.addEventListener("change", (_e) => {
  console.log(date.value);
  console.log(BookingStates[0].bookdate);
  for(let i=0;i<BookingStates.length;i++){
    if(BookingStates[i].bookdate == date.value){
          x=i;
      break;
    }
  }
 // console.log(x);
  if(x !=null){
    console.log(x);
    console.log(BookingStates[x].TimeSlot[0].SixAM)
    //BookingStates[x].TimeSlot[0].forEach((ele)=>{
    //  console.log(ele);
    //})
    //console.log(Object.entries(BookingStates[x].TimeSlot[0]));
    for (const [key, value] of Object.entries(BookingStates[x].TimeSlot[0])) {
      let td = document.createElement('td');
      td.className = key;
      if(value==' ' || value== null){
        let button = document.createElement('button');
        button.value = key;
        button.innerHTML = " BOOK !"
        button.id = key;
        td.appendChild(button);
        bodyrow.appendChild(td);
      }
      else{
        td.appendChild(document.createTextNode("booked"));
        bodyrow.appendChild(td);
      }
      
      console.log(`${key}: ${value}`);
    }
    
    tbody.appendChild(bodyrow);
    table.appendChild(tbody);
  }
  else{
    console.log("new date found");
    for (const [key, value] of Object.entries(BookingStates[x].TimeSlot[0])) {
      let td = document.createElement('td');
      td.className = key;
      //if(value==' ' || value== null){
        let button = document.createElement('button');
        button.value = key;
        button.innerHTML = " BOOK !"
        button.id = key;
        td.appendChild(button);
        bodyrow.appendChild(td);
      }
      tbody.appendChild(bodyrow);
      table.appendChild(tbody);
    
  }
});

