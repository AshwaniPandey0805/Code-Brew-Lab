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
    const selectAllCheckbox = document.getElementById('selectAll');
    const deleteSelectedButton = document.querySelector('.delete-selected');
    let deleteCheckboxes = document.querySelectorAll('.delete-checkbox');
    // -------------------------------------------------------------
    const deleteRowButtons = document.querySelectorAll('.delete-row');
    // ---------------------------------------------------------
    
    // startdate EventListner
    startDate.addEventListener('input', function () {
        endDate.min = startDate.value;
    });

    // reset form ---------------------------------
    resetButton.addEventListener('click', resetForm);
    // --------------------------------------------
    //onSubmit button click 
    form.addEventListener('submit', onFormSubmit)
    function onFormSubmit(e){
        e.preventDefault();
        const formData = loadFormDataIntoAnObject();

        // if (isFormValid()) {
        //     // Add data to the table
        //     addDataToTable(formData);
        //     //resetForm();
        //     tfoot.style.visibility = "visible"
        // }
        
        
        //Validate unique email in the form
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
    // function to load form data to an object
    function loadFormDataIntoAnObject(){
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

     //Function to check if the email is unique
    function isEmailUnique(emailValue) {
        const row = document.querySelectorAll('.data-table tbody td:nth-child(3)')
         const existingEmails = Array.from(row).map(td => td.textContent); // email ka array return kerke dy rha h
        return !existingEmails.includes(emailValue);
    }

    //Function to check if the number is unique
    function isNumberUnique(number) {
        const row = document.querySelectorAll('.data-table tbody td:nth-child(4)')
        const existingNumber = Array.from(row).map(td => td.textContent); // phone number ka array return kerke dy rha h
        return !existingNumber.includes(number.toString());
    } 
    
    // Show error function
    function showError(input, Message){
        const parentElement = input.parentElement;
        parentElement.className = 'form-control1 error';
        const smallElement = parentElement.querySelector('small');
        smallElement.innerText = Message

    }

    // Show success function
    function showSuccess(input){
        const parentElement = input.parentElement;
        parentElement.className = 'form-control1 success';
    }

    // Validating Form Inputs
    function isFormValid(){
        validateUsername();
        validateEmail(); 
        validatePhoneNumber();
        validatePassword();
        validateConfirmPassword();
        validateSubject();
        validateGender();
        validateDates();
        const errorElements = document.querySelectorAll('.error');
        return errorElements.length === 0;
    }

    // Array of Object
    let userDataArray = [];
    function addDataToTable(data) {
        const tbody = document.querySelector("tbody");
        userDataArray.push(data); // Array main data jaa rha
        console.log(userDataArray);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input type="checkbox" class="delete-checkbox"></td>
            <td id="username" >${data.username}</td>
            <td>${data.email}</td>
            <td>${data.phoneNumber}</td>
            <td>${data.subjects}</td>
            <td>${data.gender}</td>
            <td>${data.startDate}</td>
            <td>${data.endDate}</td>
            <td>
                <button type="button" class="edit-row" onclick="onclick(this.parentNode.parentNode)">Edit</button>
                <button class="delete-row">Delete</button>
            </td> `;

        tbody.appendChild(tr);

        // Update the NodeList after adding the new row
        updateDeleteCheckboxes();
    }

    function onclick(ele){
        console.log("Sb thik hai, Jamilwa gandu");
    }
    


     // Validating Form Inputs
     function isModalFormValid(){
        validateUpdateUsername();
        validateUpdatedEmail();
        const errorElements = document.querySelectorAll('.error');
        return errorElements.length === 0;
    }

    // username
    username.addEventListener('input', validateUsername)
    function validateUsername(){
         const userNameValue = username.value.trim();
         if(userNameValue === ""){
             showError(username, "Please Enter Username")
         }else if(userNameValue.length < 3){
             showError(username, "Username Must be atleast 3 characters long") 
         }else if(userNameValue.length > 20){
             showError(username, "Username cannot be exceed 20 characters")
         }else if(!/^[a-zA-Z0-9 ]+$/.test(userNameValue)) {
             showError(username,"Username can only contain letters and numbers");
         }else if (userNameValue.includes(" ")) {
             showError(username,"Username cannot contain spaces");
         }else{
             showSuccess(username)
         }
    }
    
    // Username of Update Modal
    const updatedUserName = document.getElementById('updateUsername');
    updatedUserName.addEventListener('input', validateUpdateUsername)
    function validateUpdateUsername(){
        const userNameValue = updatedUserName.value.trim();
        if(userNameValue === ""){
            showError(username, "Please Enter Username")
        }else if(userNameValue.length < 3){
            showError(updatedUserName, "Username Must be atleast 3 characters long") 
        }else if(userNameValue.length > 20){
            showError(updatedUserName, "Username cannot be exceed 20 characters")
        }else if(!/^[a-zA-Z0-9 ]+$/.test(userNameValue)) {
            showError(updatedUserName,"Username can only contain letters and numbers");
        }else if (userNameValue.includes(" ")) {
            showError(updatedUserName,"Username cannot contain spaces");
        }else{
            showSuccess(updatedUserName)
        }
    }

    // Email Validation
    email.addEventListener('input', validateEmail);
    function validateEmail(){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailValue = email.value.trim();
        if(emailValue === ""){
            showError(email, "Please Enter Email")
        }else if(!emailRegex.test(emailValue)){
            showError(email, "Invalid Email format")
        }else if(emailValue.length > 30){
            showError(email, "Email cannot be more than 30 characters")
        }else{
            showSuccess(email);
        }
    }

    // update input Email Validation
    const updatedEmail = document.getElementById('updateEmail');
    updatedEmail.addEventListener('input', validateUpdatedEmail);
    function validateUpdatedEmail(){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailValue = updatedEmail.value.trim();
        if(emailValue === ""){
            showError(updatedEmail, "Please Enter Email")
        }else if(!emailRegex.test(emailValue)){
            showError(updatedEmail, "Invalid Email format")
        }else if(emailValue.length > 30){
            showError(updatedEmail, "Email cannot be more than 30 characters")
        }else{
            showSuccess(updatedEmail);
        }
    }

    // Validate Phone number
    phoneNumber.addEventListener('input', validatePhoneNumber);
    function validatePhoneNumber(){
        const phoneRegex = /^\+?[0-9\s\-]{10,15}$/;
        const phoneNumberValue = phoneNumber.value.trim();
        if(phoneNumberValue === ""){
            showError(phoneNumber, "Please Enter Phone Number");
        }else if(!phoneRegex.test(phoneNumberValue)){
            showError(phoneNumber,"Invalid phone number format")
        }else{
            showSuccess(phoneNumber);
        }
    }

    //validate password
    password.addEventListener('input', validatePassword);
    function validatePassword(){
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
        }else{
            showSuccess(password);
        }
    }

    // Validate confirm passowrd
    cpassword.addEventListener("input", validateConfirmPassword);
    function validateConfirmPassword(){
        const passwordValue = password.value.trim();
        const cpasswordValue = cpassword.value.trim();
        if(cpasswordValue === ""){
            showError(cpassword, "Please Enter to confirm passowrd");
        }else if(cpasswordValue !== passwordValue){
            showError(cpassword, "Password do not match")
        }else{
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
        inputContainer.className = 'form-control1 error';
        errorElement.innerText = message;
    }

    // for success-message for date
    function showSuccessDate(inputContainer) {
        inputContainer.className = 'form-control1 success';
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
        if(isEmailUnique(formData.email)){
            userIsNowAvilable(email, "Email is available");
        }
        function isEmailUnique(emailValue) {
        const existingEmails = Array.from(row).map(td => td.textContent);
        return !existingEmails.includes(emailValue);
        }
    }

    // Edit User Detail functionality
    const tbaleEL2 = document.querySelector('table');

    tbaleEL2.addEventListener('click', onUpdate);
    function onUpdate(e){
        if(!e.target.classList.contains("edit-row")){
            return;
        }

        const allRows = document.querySelectorAll('.data-table tbody tr');
    
        allRows.forEach(row => {
            row.classList.remove('edit-row-selected');
        }); 
        const selectedRow = e.target.closest('tr');
        selectedRow.classList.add('edit-row-selected');
        
        // calling  Modal on clicking edit button
        $("#myModal").modal("show");
        moveDataFromTableToForm(selectedRow);
        
    }

    

    //function to move data from the table
    function moveDataFromTableToForm(btn){
       // console.log(btn);

        const updatePasswordBtn = document.getElementById("updatePassword");
        const updateCPasswordBtn = document.getElementById("updateCPassword");
        
        // make password and confirm paswword disable
        updatePasswordBtn.disabled = true;
        updateCPasswordBtn.disabled = true;

        // importing data form table to form
        const toUpdateUser = btn.children[1].textContent;
        const toUpdateEmail = btn.children[2].textContent;
        const toUpdatePhone = btn.children[3].textContent;
        const toUpdateSubject = btn.children[4].textContent;
        const toUpdateGender = btn.children[5].textContent;
        const toUpdateStartDate = btn.children[6].textContent;
        const toUpdateEndData = btn.children[6].textContent;

        // sending data to the form
        document.getElementById("updateUsername").value = toUpdateUser;
        document.getElementById("updateEmail").value = toUpdateEmail;
        document.getElementById("updatePhone").value = toUpdatePhone;

        const subjectsSelect = document.getElementById("updateSubject");
        for (let i = 0; i < subjectsSelect.options.length; i++) {
            if (subjectsSelect.options[i].text === toUpdateSubject) {
                subjectsSelect.options[i].selected = true;
                break;
            }
        }
        document.getElementById("updateStartDate").value = toUpdateStartDate;
        document.getElementById("updateEndDate").value = toUpdateEndData

        
    }


    // Update button add eventListner
    const updatebtn = document.getElementById("model-update-button");
    updatebtn.addEventListener("click", updateUserDetail);
    function updateUserDetail(){
        // getting selected row form the table with particular className
        const selectedRow2 = getSelectedRow();
        //console.log(typeof selectedRow2);
        console.log(selectedRow2);
        

        // geeting updated data as an object form the modal box
        const updatedUserDetailObject = updateUserDataField();

        updateRowWithData(selectedRow2, updatedUserDetailObject);

        
            
        // after update the form reset the main form
        resetForm();
        
    }


    // Function to get the selected row
    function getSelectedRow() {
        return document.querySelector('.edit-row-selected');
    }

    // updating user data field
    function updateUserDataField(){
        const updatedUserName = document.getElementById('updateUsername').value;
        const updatedEmail = document.getElementById('updateEmail').value;
        const updatedPhoneNumber = document.getElementById('updatePhone').value;
        const updatedSubject = document.getElementById('updateSubject').value;
        const updatedStartDate = document.getElementById('updateStartDate').value;
        const updatedEndDate = document.getElementById('updateEndDate').value;

        // storing updated data into an object
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

    // function to update the selected row fomr the table with particular
    function updateRowWithData(row, data) {
        const cells = row.querySelectorAll('td');
        cells[1].textContent= data.updatedUserName;
        cells[2].textContent = data.updatedEmail;
        cells[3].textContent = data.updatedPhoneNumber;
        cells[4].textContent = data.updatedSubject;
        cells[5].textContent = data.updatedGender;
        cells[6].textContent = data.updatedStartDate;
        cells[7].textContent = data.updatedEndDate;
    }

    // function to show that user is now avaialbe while deleting exitisng user detail
    function userIsNowAvilable(input, Message){
        const parentElement = input.parentElement;
        parentElement.className = 'form-control1 successAvaialbe';
        const smallElement = parentElement.querySelector('small');
        smallElement.innerText = Message
    }

    // Delete Functionality 
    
    function updateDeleteCheckboxes() {
        deleteCheckboxes = document.querySelectorAll('.delete-checkbox');
    }
    

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


    // from reset functionality
    function resetForm() {
        form.reset();
        resetField(username, genderContainer, genderError);
        resetField(email, startDateContainer);
        resetField(phoneNumber);
        resetField(password);
        resetField(cpassword);      
        resetField(subject)
        genderContainer.className = 'form-control2';
        genderError.innerText = "";
        startDateContainer.className = 'form-control1';
        endDateContainer.className = 'form-control1';
    }

    // function to reset all fields
    function resetField(inputField, ...additionalContainers) {
        inputField.parentElement.className = 'form-control1';
        const smallElement = inputField.parentElement.querySelector('small');
        if (smallElement) {
            smallElement.innerText = "";
        }
        additionalContainers.forEach(container => {
            container.className = 'form-control1';
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

            // reset
            resetForm();
        }
    }

    // Add event listeners for filter input fields
    const filterUsernameInput = document.getElementById("filterUsername");
    const filterEmailInput = document.getElementById("filterEmail");
    const filterPhoneNumber = document.getElementById("filterPhoneNumber");
    const filterSubject = document.getElementById("filterSubjects")
    const filterGender = document.getElementById("filterGender");

    filterEmailInput.addEventListener('input', filterTable);
    filterUsernameInput.addEventListener('input', filterTable);
    filterPhoneNumber.addEventListener("input", filterTable);
    filterSubject.addEventListener("input", filterTable);
    filterGender.addEventListener("input", filterTable);


    function filterTable(){
        const filterUsername = filterUsernameInput.value.toLowerCase();
        const filterEmail = filterEmailInput.value.toLowerCase();
        const filterPhoneNumberValue = filterPhoneNumber.value;
        const filterSubjectValue = filterSubject.value.toLowerCase();
        const filterGenderValue = filterGender.value.toLowerCase();
        const rows = document.querySelectorAll('.data-table tbody tr');
        console.log(rows);
        rows.forEach(row => {
            const username = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            const phoneNumber = row.querySelector('td:nth-child(4)').textContent;
            const subject = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
            const gender = row.querySelector('td:nth-child(6)').textContent.toLowerCase();
            if (username.includes(filterUsername) && email.includes(filterEmail) && phoneNumber.includes(filterPhoneNumberValue) && subject.includes(filterSubjectValue) && gender.includes(filterGenderValue)){
                row.style.display = "";
            } else {
                row.style.display = "none"; 
            }
        });
    }

    const edit = document.querySelector("edit-row");
    edit.addEventListener("click", ()=>{
        console.log("Sb thik jamilwa");
    })

    // addDataToTable(data) {
    
    //     var tr = document.createElement("tr");

    //     const td1  = tr.appendChild(document.createElement("td"));
    //     const td2  = tr.appendChild(document.createElement("td"));
    //     const td3  = tr.appendChild(document.createElement("td"));
    //     const td4  = tr.appendChild(document.createElement("td"));
    //     const td5  = tr.appendChild(document.createElement("td"));
    //     const td6  = tr.appendChild(document.createElement("td"));
    //     const td7  = tr.appendChild(document.createElement("td"));
    //     const td8  = tr.appendChild(document.createElement("td"));
    //     const td9  = tr.appendChild(document.createElement("td"));
    //     
    //     
    //
    //     td1.innerHTML  = '<input type="checkbox" class="delete-checkbox">';
    //     td2.innerHTML  = data.username;
    //     td3.innerHTML  = data.email;
    //     td4.innerHTML  = data.phoneNumber;
    //     td5.innerHTML  = data.subjects;
    //     td6.innerHTML  = data.gender;
    //     td7.innerHTML  = data.startDate;
    //     td8.innerHTML  = data.endDate;
    //     td9.innerHTML  = 
    //    `<button type='button' id="+id+"  class='delete-row' >Delete</button>
    //     <button type='button' id="+id+"  class='edit'  >EDIT</button>`;

    //     document.getElementById("tbody").appendChild(tr);
    // }
});
