const subBtnEl = document.getElementById("submitBtn");


$('#submitBtn').click(function(){
    let userNameEl = document.getElementById("userName").value;
    let userEmailEl = document.getElementById("userEmail").value;
    let userLocEl = document.getElementById("userLoc").value;
    let userDOBEl = document.getElementById("userDOB").value;
    console.log(userNameEl);
    console.log(userEmailEl);
    console.log(userLocEl);
    console.log(userDOBEl);

    let userInput = [ userNameEl, userEmailEl, userLocEl, userDOBEl];
    let keyVal = ['name:', 'email:', 'city, State:', 'DOB;'];
    
    for (let i = 0; i < userInput.length; i++) {
    localStorage.setItem(keyVal[i], userInput[i]);
    }
});