const url = "https://kingdomofnorway.kvistnes.one/wp-json/wp/v2/pages/123";
const contact = document.querySelector(".contact-content");
const loader = document.querySelector(".loader");

// API CALL
async function fetchContact(){
    try {
        const search = await fetch(url);
        const content = await search.json();
        console.log(content);    
       
        contact.innerHTML += `
        <div>
            <h1>${content.title.rendered}</h1>
            <p>${content.content.rendered}</p>
            <p class="signature">John Doe</p>
        </div>`;
        
        if(content){
            loader.style.display = "none";
        }

    }

    catch(error){
        console.log(error);
        contact.innerHTML = `
        <h1>Something went wrong. Please try again later</h1>
        <p class="signature">John Doe</p>`;
    }

    finally{
        console.log("finally");
    }
}
fetchContact()

// Contact form validation 
const form = document.querySelector(".contact-form");
const userName = document.querySelector("#name");
const email = document.querySelector("#e-mail");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const button = document.querySelector(".message-submit");

form.addEventListener("submit", e => {
	e.preventDefault();
	
	controlInputs();
});

// Form input validations
function controlInputs() {    	
    if(!validateLen(userName.value, 4)){
		setErrorFor(userName, "Must be more than 5 characters long");
	} else {
	    setSuccessFor(userName);}
	
    if(!validateLen(subject.value, 14)){
		setErrorFor(subject, "Must be more than 15 characters long");
	} else {
		setSuccessFor(subject);
	}

    if(!validateLen(message.value, 24)){
		setErrorFor(message, "Must be more than 25 characters long");
	} else {
		setSuccessFor(message);
	}
	
	if(!validateEmail(email.value, 0)){
		setErrorFor(email, "Must be a valid email");
	} else {
		setSuccessFor(email);
	}

    // A message is alerted to the user, indicating that their message was sent
    button.onclick = function(){
        if(validateLen(userName.value, 4) && validateLen(subject.value, 14) && validateLen(message.value, 24) && validateEmail(email.value, 0)) {
            alert("Your message was sent! I will answer you when I have access to internet. Thank you!");
            location.href = "https://kingdomofnorway.netlify.app/contact.html";
        } else {
            console.log("Not Yet");
        }
    }
}

function validateLen(value, len){
    if(value.trim().length > len){
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function setErrorFor(input, text) {
	const formItem = input.parentElement;
	const small = formItem.querySelector("small");
	formItem.className = "form-item error";
	small.innerText = text;
}

function setSuccessFor(input) {
	const formItem = input.parentElement;
	formItem.className = "form-item success";
}
	

