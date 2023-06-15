const addUser = (first_name, last_name, email, password) => {
  return fetch('http://localhost:3333/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error('Invalid request');
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(data => {
      // Handle the response data
      console.log(data);
      // Perform any additional actions
      return data;
    })
    .catch(error => {
      // Handle the error
      console.error(error);
      throw error;
    });
};


export const AddUserService = {
  addUser,
  
};
