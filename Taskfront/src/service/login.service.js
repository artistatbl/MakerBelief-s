const login = (email, password) => {
    return fetch("http://localhost:3333/login",
    {
        method: "POST",
        headers: {
            "content-Type": "application/json"

        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })

    })
    .then((response) => {
        if(response.status === 200){
            return response.json();
        }else if(response.status === 400){
            throw "Invalid Email or Passwords"
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        localStorage.setItem("user_id", resJson.user_id);
        localStorage.setItem("session_token", resJson.session_token);
        localStorage.setItem("first_name", resJson.first_name);
        localStorage.setItem("last_name", resJson.last_name);
        
        //Updatee the UI or DOM elemeenst with user information
        //updateUserInfo(resJson);

        return resJson;
    })
    .catch((error) =>{
        console.log("Err", error);
        return Promise.reject(error);
    })
}

// // Function to update the UI with user information
// const updateUserInfo = (userInfo) => {
//   const welcomeMsg = document.getElementById("welcome-msg");
//   welcomeMsg.innerText = `Welcome ${userInfo.first_name} ${userInfo.last_name}!`;

//   // Update other UI elements as needed
// };


export const usersService = {
    login,
   // updateUserInfo,
    
}