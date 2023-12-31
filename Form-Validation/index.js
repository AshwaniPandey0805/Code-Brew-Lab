document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phone");
    const password = document.getElementById("password");
    const cpassword = document.getElementById("cpassword");

    form.addEventListener('submit', onFormSubmit)

    function onFormSubmit(e){

        e.preventDefault();

        // Load form Data into an object
        loadFormDataIntoAnObject();

        // Validate the form data
        isFormValid();
    }

    
    // function to load form data to an object
    function loadFormDataIntoAnObject(){
        // store form into an object
        const formData = {
            username : username.value,
            email : email.value,
            phoneNumber : Number(phoneNumber.value),
            password : password.value,
            cpassword : cpassword.value,

        }

        console.log(formData);
    }

    // function to validate form data

    // Show error function
    function showError(input, Message){
        const parentElement = input.parentElement;
        parentElement.className = 'form-control error';
        const smallElement = parentElement.querySelector('small');
        smallElement.innerText = Message

    }

    // Show success function
    function showSuccess(input){
        const parentElement = input.parentElement;
        parentElement.className = 'form-control success';

    }

    function isFormValid(){

        // valid username
        validateUsername();

    

        // Validate Email
        validateEmail();



        // validate Phone Numbe 
        validatePhoneNumber();

        // Validate Password
        validatePassword();

        // validate confirm password
        validateConfirmPassword();
    }

    //Real Time Validation

    // Username Name validation 
    username.addEventListener('input', validateUsername)

    function validateUsername(){
         // valid username
         const userNameValue = username.value.trim();
         if(userNameValue === ""){
             showError(username, "Please Enter Username")
         } 
         else if(userNameValue.length < 3){
             showError(username, "Username Must be atleast 3 characters long") 
         }else if(userNameValue.length > 20){
             showError(username, "Username cannot be exceed 20 characters")
         }else if(!/^[a-zA-Z0-9 ]+$/.test(userNameValue)) {
             showError(username,"Username can only contain letters and numbers");
         }else if (userNameValue.includes(" ")) {
             showError(username,"Username cannot contain spaces");
         }
         else{
             showSuccess(username)
         }
    }

    // Email Validation
    email.addEventListener('input', validateEmail);

    function validateEmail(){
        // Validate Email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailValue = email.value.trim();
        if(emailValue === ""){
            showError(email, "Please Enter Email")
        }else if(!emailRegex.test(emailValue)){
            showError(email, "Invalid Email format")
        }
        else{
            showSuccess(email);
        }

    }

    // Validate Phone number
    phoneNumber.addEventListener('input', validatePhoneNumber);

    function validatePhoneNumber(){
        // validate Phone Numbe 
        const phoneRegex = /^\+?[0-9\s\-]{10,15}$/;
        const phoneNumberValue = phoneNumber.value.trim();
        if(phoneNumberValue === ""){
            showError(phoneNumber, "Please Enter Phone Number");
        }else if(!phoneRegex.test(phoneNumberValue)){
            showError(phoneNumber,"Invalid phone number format")
        }
        else{
            showSuccess(phoneNumber);
        }
    }

    //validate password
    password.addEventListener('input', validatePassword);

    function validatePassword(){
        // Validate Password
        const passwordValue = password.value.trim();
        if(passwordValue === ""){
            showError(password, "Please Enter Password");
        }else if(passwordValue.length < 8){
            showError(password, "Password must be at least 8 character long")
        }else if(!/[A-Z]/.test(passwordValue)){
            showError(password, "Password must contain at least one uppercase letter")
        }else if(!/[a-z]/.test(passwordValue)){
            showError(password,"Password must contain at least one lowercase letter")
        }else if(!/\d/.test(passwordValue)){
            showError(password, "Password must contain at least one number")
        }else if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(passwordValue)){
            showError(password, "Password must contain at least one special character" )
        }
        else{
            showSuccess(password);
        }
    }

    // Validate confirm passowrd
    cpassword.addEventListener("input", validateConfirmPassword);

    function validateConfirmPassword(){
        // validate confirm password
        const passwordValue = password.value.trim();
        const cpasswordValue = cpassword.value.trim();
        if(cpasswordValue === ""){
            showError(cpassword, "Please Enter to confirm passowrd");
        }else if(cpasswordValue !== passwordValue){
            showError(cpassword, "Password do not match")
        }
        else{
            showSuccess(cpassword);
        }
    }



});
