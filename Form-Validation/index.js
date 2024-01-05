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

    // reset form ---------------------------------
    resetButton.addEventListener('click', resetForm);
    // --------------------------------------------
    function onFormSubmit(e){
        e.preventDefault();
        const formData = loadFormDataIntoAnObject();
        
        // Validate unique email in the form
        if (isEmailUnique(formData.email)) {
            // Validate unique number form data
            if( isNumberUnique(formData.phoneNumber)){
                //vakidate form
                if (isFormValid()) {
                    // Add data to the table
                    addDataToTable(formData);
                    resetForm();
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
            // console.log("check")
            // getting all email from the table

            const row = document.querySelectorAll('.data-table tbody td:nth-child(3)')
            //console.log(row)

            const existingEmails = Array.from(row).map(td => td.textContent); // email ka array return kerke dy rha h
            //console.log(existingEmails);
            return !existingEmails.includes(emailValue);
        }
        
        //Function to check if the number is unique
        function isNumberUnique(number) {
            // console.log("check")
            // getting all email from the table
            const row = document.querySelectorAll('.data-table tbody td:nth-child(4)')
            const existingNumber = Array.from(row).map(td => td.textContent); // phone number ka array return kerke dy rha h
            // console.log(existingNumber)
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

    // Validating Form Inputs
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
        
        // check any error class exits or not
        const errorElements = document.querySelectorAll('.error');
        return errorElements.length === 0;
    }

    //Real Time Validation 
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

    // Function to showErrorGender
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

    // for error-message for date
    function showErrorDate(inputContainer, errorElement, message) {
        inputContainer.className = 'form-control error';
        errorElement.innerText = message;
    }
    // for success-message for date
    function showSuccessDate(inputContainer) {
        inputContainer.className = 'form-control success';
    }

    // Adding data dynamically to the table
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
            <td><button class="edit-row">Edit</button>
                <button class="delete-row">Delete</button></td>`;
        tbody.appendChild(tr);
        // Update the NodeList after adding the new row
        updateDeleteCheckboxes();
    }

    // EventListner to remove particular row
    const tableEl1 = document.querySelector('table');
    tableEl1.addEventListener('click', onDeleteRow);

    function onDeleteRow(e){
        if(!e.target.classList.contains("delete-row")){
            return;
        }

        const btn = e.target;
        btn.closest('tr').remove();

        const formData = loadFormDataIntoAnObject();

        const row = document.querySelectorAll('.data-table tbody td:nth-child(3)')
        console.log(row);
        console.log(row.length);

        if(isEmailUnique(formData.email)){
            // make user email available for the uer
            userIsNowAvilable(email, "Email is available");
            // if(row.length > 0){
            //     // userIsNowAvilable(email, "Email is available");
            // }
        }else{
            // add functionality
        }


        //Function to check if the email is unique
        function isEmailUnique(emailValue) {
        const existingEmails = Array.from(row).map(td => td.textContent); // email ka array return kerke dy rha h
        //console.log(existingEmails);
        return !existingEmails.includes(emailValue);
        }
        
    }


    // Edit User Detail functionality
    const tbaleEL2 = document.querySelector('table');
    tbaleEL2.addEventListener('click', onUpdate);

    function onUpdate(e){
        // Check if the clicked element has the class "edit-row"
        if(!e.target.classList.contains("edit-row")){
            return;
        }
        // Remove the "edit-row-selected" class from all rows
        const allRows = document.querySelectorAll('.data-table tbody tr');
        allRows.forEach(row => {
            row.classList.remove('edit-row-selected');
        });
        // getting tr element
        const selectedRow = e.target.closest('tr');
        selectedRow.classList.add('edit-row-selected');
        // move data form table to form
        moveDataFromTableToForm(selectedRow);

        
    }

        

        

    // function to move data table to form
    function moveDataFromTableToForm(btn){

        //update button
        const updateBtn = document.getElementById('update-btn');

        //making update button visible while pressing edit button
        updateBtn.style.visibility = "visible";
        updateBtn.style.position = "relative"

        // disable password and confirm password 
        const password = document.getElementById("password");
        const cpassword = document.getElementById("cpassword");

        //making submit button hidden
        const submitBtn = document.getElementById("submit-btn");
        submitBtn.style.visibility = "hidden";
        submitBtn.style.position = "absolute"
        password.disabled = true;
        cpassword.disabled = true;

        // importing data form table to form
        const user = btn.children[1].textContent;
        console.log("User :", user);
        const email = btn.children[2].textContent;
        console.log("Email: ", email);
        const phone = btn.children[3].textContent;
        console.log("Phone: ", phone);
        const Subject = btn.children[4].textContent;
        console.log("Subject: ", Subject );
        const gender = btn.children[5].textContent;
        console.log("Gender: ", gender);
        const startDate = btn.children[6].textContent;
        console.log("StartDate: ", startDate);
        const endData = btn.children[6].textContent;
        console.log("EndData: ", endData);

        // sending data to the form
        document.getElementById("username").value = user;
        document.getElementById("email").value = email;
        document.getElementById("phone").value = phone;
        
        // Set the selected option for the "subjects" select element
        const subjectsSelect = document.getElementById("subjects");
        for (let i = 0; i < subjectsSelect.options.length; i++) {
            if (subjectsSelect.options[i].text === Subject) {
                subjectsSelect.options[i].selected = true;
                break;
            }
        }
        // document.getElementById("male").value = user;
        document.getElementById("startDate").value = startDate;
        document.getElementById("endDate").value = endData

    }
    
    // Update button add eventListner
    const updatebtn = document.getElementById("update-btn");
    
    updatebtn.addEventListener("click", updateUserDetail);
    function updateUserDetail(e){
        e.preventDefault();

        const selectedRow2 = getSelectedRow();

        const updatedUserDetailObject = updateUserDataField();
        console.log(updatedUserDetailObject)
        updateRowWithData(selectedRow2, updatedUserDetailObject);
        resetForm();


        // make update button hidde 
        updatebtn.style.visibility = "hidden";
        updatebtn.style.position = "absolute"


        //making submit button visible
        const submitBtn = document.getElementById("submit-btn");
        submitBtn.style.visibility = "visible";
        submitBtn.style.position = "relative"

        // make password and confirm paswword enable
        password.disabled = false;
        cpassword.disabled = false;

        
        
       

    }

    // Function to get the selected row
    function getSelectedRow() {
        return document.querySelector('.edit-row-selected');
    }
    
     // updating user data field
    function updateUserDataField(){
        const updatedUserName = document.getElementById('username').value;
        const updatedEmail = document.getElementById('email').value;
        const updatedPhoneNumber = document.getElementById('phone').value;
        const updatedSubject = document.getElementById('subjects').value;
        const updatedStartDate = document.getElementById('startDate').value;
        const updatedEndDate = document.getElementById('endDate').value;

        const updatedFormData = {
            updatedUserName : updatedUserName,
            updatedEmail : updatedEmail,
            updatedPhoneNumber : updatedPhoneNumber,
            updatedGender : document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "",
            updatedSubject : updatedSubject,
            updatedStartDate : updatedStartDate,
            updatedEndDate : updatedEndDate,
        }

        return updatedFormData;
    }

    function updateRowWithData(row, data) {
        // Update each cell in the row with the new data
        console.log("Checking data for table",data);
        const cells = row.querySelectorAll('td');
        cells[1].textContent= data.updatedUserName;
        cells[2].textContent = data.updatedEmail;
        cells[3].textContent = data.updatedPhoneNumber;
        cells[4].textContent = data.updatedSubject;
        cells[5].textContent = data.updatedGender;
        cells[6].textContent = data.updatedStartDate;
        cells[7].textContent = data.updatedEndDate;

        console.log(cells)
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
    // -------------------------------------------------------------
    const deleteRowButtons = document.querySelectorAll('.delete-row');
    // ---------------------------------------------------------
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

    //------------------------------------------------------------------
    // Event listener for individual row "Delete" buttons
    // deleteRowButtons.forEach(button => {
    //     button.addEventListener('click', function () {
    //         const row = button.closest('tr');
    //         row.remove();
            
    //         const allChecked = [...deleteCheckboxes].every(checkbox => checkbox.checked);
    //         selectAllCheckbox.checked = allChecked;
    
    //         // Update the NodeList after deleting a row
    //         updateDeleteCheckboxes();
    //     });
    // });
    //------------------------------------------------------------------



    // Edit User Functionality
    // const editRow = document.querySelectorAll(".edit-row");
    // console.log(editRow);

    // editRow.forEach(button => {
    //         button.addEventListener('click', function(){
    //             console.log(button);
    //             alert("clicked");

    //             updateDeleteCheckboxes();
    //         });
    // });
    


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
            // make update button hidde 
            updatebtn.style.visibility = "hidden";
            updatebtn.style.position = "absolute"

            //making submit button visible
            const submitBtn = document.getElementById("submit-btn");
            submitBtn.style.visibility = "visible";
            submitBtn.style.position = "relative"

            // make password and confirm paswword enable
            password.disabled = false;
            cpassword.disabled = false;

            

            resetForm();

        }
            
    }

    
    //     function editUpdateButton(){
    //     // Update user data functionality
    //     EditRow.forEach(button => {
    //         button.addEventListener("click", editCurrentRow);

    //     })
    //     }
    // function editCurrentRow(){
    //     console.log("hdhjdhdhdhdhdh");
    // }

    // Sir ne edit kiya tha ye
    // id="edit-row-${data.email}"

});
