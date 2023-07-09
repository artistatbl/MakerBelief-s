

const verifyEmail = (verificationToken) => {
	return fetch("http://localhost:3333/verify-email/" +verificationToken)
	  .then((response) => {
	    if (response.status === 200) {
		 return response.json();
	    } else {
		 throw new Error("Email verification failed");
	    }
	  })
	  .then((resJson) => {
	    return resJson;
	  })
	  .catch((error) => {
	    console.log("Error:", error);
	    return Promise.reject(error);
	  });
   };
   








  export const emailService = {
	verifyEmail,

	
 }
   