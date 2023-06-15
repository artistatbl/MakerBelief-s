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
       
        return resJson;
    })
    .catch((error) =>{
        console.log("Err", error);
        return Promise.reject(error);
    })
}


const getUserInfo = (user_id) => {
    return fetch(`http://localhost:3333/users/${user_id}`, {
      method: 'GET',
      headers: {
        "X-Authorization": localStorage.getItem("session_token"),
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          throw "User not found";
        } else {
          throw response.statusText;
        }
      })
      .then((resJson) => {
        return resJson
      })
      .catch((error) => {
        console.log("Err", error)
  
        return Promise.reject(error)
  
      })
  }

export const usersService = {
    login,
    getUserInfo
}