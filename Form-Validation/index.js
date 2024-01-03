document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phone");
    const password = document.getElementById("password");
    const cpassword = document.getElementById("cpassword");
    const subject = document.getElementById("subjects");
    const genderRadios = document.getElementsByName("gender");
    const genderContainer = document.getElementById("genderContainer");
    const genderError = document.getElementById("genderError");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const startDateContainer = document.getElementById("startDateContainer");
    const endDateContainer = document.getElementById("endDateContainer");
    const startDateError = document.getElementById("startDateError");
    const endDateError = document.getElementById("endDateError");
    const resetButton = document.querySelector('button[type="reset"]');
    const deleteAllButton = document.querySelector(".delete-all")
    const tfoot = document.querySelector(".tfoot");
    

    form.addEventListener('submit', onFormSubmit)

    startDate.addEventListener('input', function () {
        endDate.min = startDate.value;
        
       
    });

    resetButton.addEventListener('click', resetForm);

    

    function onFormSubmit(e){

        e.preventDefault();

        const formData = loadFormDataIntoAnObject();
        console.log(formData);

        

        
       
    

    //    // Validate unique email in the form
        if (isEmailUnique(formData.email)) {
            // Validate unique number form data
                if( isNumberUnique(formData.phoneNumber)){
                    //vakidate form
                    if (isFormValid()) {
                        // Add data to the table
                        addDataToTable(formData);
                        // resetForm();
            
                        tfoot.style.visibility = "visible"
                    }


                }else{
                    const phoneNumber = document.getElementById("phone");
                    showError(phoneNumber, "Phone number already exits");

                }
            } 
            else {
            // Show error if email already exists
                const email = document.getElementById("email");
                showError(email, "Email already exits")
            
        }
    }

        //Function to check if the email is unique
        function isEmailUnique(emailValue) {
            console.log("check")
            // getting all email from the table

            const row = document.querySelectorAll('.data-table tbody td:nth-child(3)')
            //console.log(row)

            const existingEmails = Array.from(row).map(td => td.textContent);
            //console.log(existingEmails);
            return !existingEmails.includes(emailValue);
        }
        
        //Function to check if the number is unique
        function isNumberUnique(number) {
            console.log("check")
            // getting all email from the table
            const row = document.querySelectorAll('.data-table tbody td:nth-child(4)')
            const existingNumber = Array.from(row).map(td => td.textContent);
            console.log(existingNumber)
            return !existingNumber.includes(number.toString());
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
            subjects : subject.value,
            gender: document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "",
            startDate : startDate.value,
            endDate : endDate.value,


        }

        // console.log(formData);

        return formData;
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

    // Show userIsAvailable now
    

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
        validateConfirmPassword()

        // validate subject field
        validateSubject();

        // Validate gender
        validateGender();

        // Validate Start and End Dates
        validateDates();


        const errorElements = document.querySelectorAll('.error');
        return errorElements.length === 0;

        
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
        }else if(emailValue.length > 30){
            showError(email, "Email cannot be more than 30 characters")
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

    // Subject Validation
    function validateSubject() {
        const subjectValue = subject.value;
        

        if (subjectValue === "") {
            showError(subject, "Please select a subject");
        } else {
            showSuccess(subject);
        }
    }

    // validate Gender
    function validateGender() {
        const selectedGender = Array.from(genderRadios).some(radio => radio.checked);

        if (!selectedGender) {
            showErrorGender(genderContainer, genderError, "Please select a gender");
        } else {
            showSuccessGender(genderContainer);
        }
    }

    function showErrorGender(inputContainer, errorElement, message) {
        inputContainer.className = 'form-control2 error';
        errorElement.innerText = message;
    }

    function showSuccessGender(inputContainer) {
        inputContainer.className = 'form-control2 success';
    }

    // validate date
    function validateDates() {
        const startDateValue = startDate.value;
        const endDateValue = endDate.value;

        if (startDateValue === "") {
            showErrorDate(startDateContainer, startDateError, "Please select a start date");
        } else {
            showSuccessDate(startDateContainer);
        }

        if (endDateValue === "") {
            showErrorDate(endDateContainer, endDateError, "Please select an end date");
        } else {
            showSuccessDate(endDateContainer);
        }

        // Additional validation for end date being later than start date
        if (startDateValue !== "" && endDateValue !== "") {
            const startDateObj = new Date(startDateValue);
            const endDateObj = new Date(endDateValue);

            if (startDateObj > endDateObj) {
                showErrorDate(endDateContainer, endDateError, "End date must be later than the start date");
            } else {
                showSuccessDate(endDateContainer);
            }
        }
    }

    function showErrorDate(inputContainer, errorElement, message) {
        inputContainer.className = 'form-control error';
        errorElement.innerText = message;
    }

    function showSuccessDate(inputContainer) {
        inputContainer.className = 'form-control success';
    }


    function addDataToTable(data) {
        const tbody = document.querySelector("tbody");
    
        const tr = document.createElement("tr");
    
        tr.innerHTML = `
            <td><input type="checkbox" class="delete-checkbox"></td>
            <td>${data.username}</td>
            <td>${data.email}</td>
            <td>${data.phoneNumber}</td>
            <td>${data.subjects}</td>
            <td>${data.gender}</td>
            <td>${data.startDate}</td>
            <td>${data.endDate}</td>
            <td>
                <button class="delete-row">Delete</button>
            </td>
        `;
    
        tbody.appendChild(tr);
    
        // Update the NodeList after adding the new row
        updateDeleteCheckboxes();
    }


    const tableEl = document.querySelector('table');

    tableEl.addEventListener('click', onDeleteRow);

    function onDeleteRow(e){
        if(!e.target.classList.contains("delete-row")){
            return;
        }

        const btn = e.target;
        btn.closest('tr').remove();

        // make user email available for the uer
        userIsNowAvilable(email, "Email is available");

        

    }
 
    // function to make user is now Available for register
    function userIsNowAvilable(input, Message){
        const parentElement = input.parentElement;
        parentElement.className = 'form-control successAvaialbe';
        const smallElement = parentElement.querySelector('small');
        smallElement.innerText = Message

    }
    
    // Function to update the deleteCheckboxes NodeList
    function updateDeleteCheckboxes() {
        deleteCheckboxes = document.querySelectorAll('.delete-checkbox');
    }
    
    // delete functionality
    const selectAllCheckbox = document.getElementById('selectAll');
    const deleteSelectedButton = document.querySelector('.delete-selected');
    let deleteCheckboxes = document.querySelectorAll('.delete-checkbox');
    const deleteRowButtons = document.querySelectorAll('.delete-row');
    
    // Event listener for "Select All" checkbox
    selectAllCheckbox.addEventListener('change', function () {
        const isChecked = selectAllCheckbox.checked;
        deleteCheckboxes.forEach(checkbox => (checkbox.checked = isChecked));
    });
    
    // Event listener for individual row checkboxes
    deleteCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const allChecked = [...deleteCheckboxes].every(checkbox => checkbox.checked);
            selectAllCheckbox.checked = allChecked;
        });
    });
    
    // Event listener for Delete selected button
    deleteSelectedButton.addEventListener('click', function () {
        const checkedRows = [...deleteCheckboxes].filter(checkbox => checkbox.checked);
        checkedRows.forEach(checkbox => checkbox.closest('tr').remove());
        selectAllCheckbox.checked = false;
    
        // Update the NodeList after deleting rows
        updateDeleteCheckboxes();
    });
    
    // Event listener for individual row "Delete" buttons
    deleteRowButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            row.remove();
            
            const allChecked = [...deleteCheckboxes].every(checkbox => checkbox.checked);
            selectAllCheckbox.checked = allChecked;
    
            // Update the NodeList after deleting a row
            updateDeleteCheckboxes();
        });
    });


    // from reset functionality
    
    function resetForm() {
        form.reset();
    
        // Reset error styles and messages
        resetField(username, genderContainer, genderError);
        resetField(email, startDateContainer);
        resetField(phoneNumber);
        resetField(password);
        resetField(cpassword);      
        resetField(subject)

        genderContainer.className = 'form-control2';
        genderError.innerText = "";
        startDateContainer.className = 'form-control';
        endDateContainer.className = 'form-control';
    
        // Additional fields can be added in a similar manner
    }

    function resetField(inputField, ...additionalContainers) {
        // Reset individual field
        inputField.parentElement.className = 'form-control';
        const smallElement = inputField.parentElement.querySelector('small');
        if (smallElement) {
            smallElement.innerText = "";
        }
    
        // Reset additional containers if provided
        additionalContainers.forEach(container => {
            container.className = 'form-control';
            const errorElement = container.querySelector('small');
            if (errorElement) {
                errorElement.innerText = "";
            }
        });
    }

    // delete all fucntionality
    deleteAllButton.addEventListener("click", deleteAllRows);
    
    function deleteAllRows(){

        const askForDelete = prompt('Are you sure, you want to delete all')

            if(askForDelete === "yes" || askForDelete === "YES" || askForDelete === "Yes"){
                const tbody = document.querySelector('tbody');
                tbody.innerHTML = "";
                tfoot.style.visibility = "hidden"

                resetForm();

            }
            
        }

});
