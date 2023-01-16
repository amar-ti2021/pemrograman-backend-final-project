class Validator {
  validate(data, rules) {
    let isValid = true;
    let error = [];
    for (const [key, value] of Object.entries(rules)) {
      let element = data[key];
      value.forEach((rule) => {
        switch (true) {
          case rule == "required":
            if (!this.required(element)) {
              error.push(`${key} is required`);
              isValid = false;
            }
            break;
          case rule == "numeric":
            if (!this.numeric(element)) {
              error.push(`${key} must be a valid number`);
              isValid = false;
            }
            break;
          case rule == "date":
            if (!this.date(element)) {
              error.push(`${key} must be a valid date`);
              isValid = false;
            } else {
              data[key] = new Date(element);
            }
            break;
          default:
            break;
        }
      });
    }
    if (!isValid) return { errors: error };
    return data;
  }
  required(data) {
    if (!data) {
      return false;
    }
    return true;
  }

  numeric(data) {
    if (isNaN(data)) {
      return false;
    }
    return true;
  }

  date(data) {
    data = Date.parse(data);
    return this.numeric(data);
  }
}
module.exports = Validator;
