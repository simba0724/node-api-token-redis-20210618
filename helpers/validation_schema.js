const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.client_id = !isEmpty(data.client_id) ? data.client_id : "";
  data.client_secret = !isEmpty(data.client_secret) ? data.client_secret : "";
  data.audience = !isEmpty(data.audience) ? data.audience : "";
  data.grant_type = !isEmpty(data.grant_type) ? data.grant_type : "";

  // Password checks
  if (Validator.isEmpty(data.client_id)) {
    errors.client_id = "Client_id field is required";
  }

  if (Validator.isEmpty(data.client_secret)) {
    errors.client_secret = "Client_secret field is required";
  }

  if (Validator.isEmpty(data.audience)) {
    errors.audience = "Audience field is required";
  }

  if (Validator.isEmpty(data.grant_type)) {
    errors.grant_type = "Grant_type field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
