// validator.js

const isValidId = (id) => {
    // Check if the ID is a positive integer
    let_id = parseInt(id);
    return Number.isInteger(id) && id > 0;
  };
  
  module.exports = {
    isValidId: isValidId
  };
  