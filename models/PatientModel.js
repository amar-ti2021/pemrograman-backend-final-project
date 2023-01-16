const Model = require("../core/Model");
class PatientModel extends Model {
  static table = "patients";
}

module.exports = PatientModel;
