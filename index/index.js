let submit = document.getElementById('submit');
let email = document.getElementById('mail');
let signin = document.getElementById('signin');
submit.addEventListener('click',e=>{
    e.preventDefault();
    
    if (email.value == ''){
        console.log("enter some thing");
    }
    else{
        console.log(email.value);
       sessionStorage.setItem("ClientMail",email.value);
       window.location = '/h';

    }

})

signin.addEventListener('click',(e)=>{
    window.location = '/login';
})