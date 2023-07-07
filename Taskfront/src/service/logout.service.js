const logOut = () => {
    return fetch("http://localhost:3333/logout",
    {
        method: "POST",
        headers: {
           "X-Authorization": localStorage.getItem("session_token")
        }
       
    })
    .then((response) => {
        if(response.status === 200){
            localStorage.removeItem("user_id")
            localStorage.removeItem("session_token")
            localStorage.removeItem("first_name")
            localStorage.removeItem("last_name")
            return 
        }else if(response.status === 401){
            throw "Please Login"
        }else{
            throw "Something went wrong"
        }
   
    })
    .catch((error) =>{
        console.log("Err", error)
        return Promise.reject(error)
    })
}

export const logoutService = {
    logOut,
    
}