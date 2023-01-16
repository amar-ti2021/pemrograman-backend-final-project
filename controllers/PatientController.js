const Patient = require("../models/PatientModel");
const Validator = require("../core/Validator");
class PatientController {
  async index(req, res) {
    const patients = await Patient.all();
    if (patients) {
      const data = {
        message: "Get All Patients",
        data: patients,
      };

      return res.status(200).json(data);
    } else {
      return res.status(200).json({ message: "Data is Empty" });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const patient = await Patient.find(id);
    if (patient) {
      const data = {
        message: "Get Patient with Id " + id,
        data: patient,
      };
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "Patient not Found" });
    }
  }

  async store(req, res) {
    const validator = new Validator();
    const data = validator.validate(
      {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        status: req.body.status,
        in_date_at: req.body.in_date_at,
        out_date_at: req.body.out_date_at,
      },
      {
        name: ["required"],
        phone: ["required", "numeric"],
        address: ["required"],
        status: ["required"],
        in_date_at: ["required", "date"],
        out_date_at: ["date"],
      }
    );

    if (data.errors) {
      const response = {
        messages: "Validation Error",
        errors: data.errors,
      };
      return res.status(402).json(response);
    }
    const patient = await Patient.create(data);
    if (patient) {
      const response = {
        message: `Data of ${data.name} stored successfully`,
        data: data,
      };
      return res.status(201).json(response);
    }
    return res.status(500).json({ message: "Internal server error" });
  }

  async update(req, res) {
    const validator = new Validator();
    const { id } = req.params;
    const patient_data = await Patient.find(id);
    if (patient_data) {
      const data = validator.validate(
        {
          name: req.body.name ?? patient_data.name,
          phone: req.body.phone ?? patient_data.phone,
          address: req.body.address ?? patient_data.address,
          status: req.body.status ?? patient_data.status,
          in_date_at: req.body.in_date_at ?? patient_data.in_date_at,
          out_date_at: req.body.out_date_at ?? patient_data.out_date_at,
        },
        {
          name: ["required"],
          phone: ["required", "numeric"],
          address: ["required"],
          status: ["required"],
          in_date_at: ["required", "date"],
          out_date_at: ["date"],
        }
      );

      if (data.errors) {
        const response = {
          messages: "Validation Error",
          errors: data.errors,
        };
        return res.status(402).json(response);
      }
      const patient = await Patient.edit(id, data);
      if (patient) {
        const response = {
          message: `Data of ${patient_data.name} updated successfully`,
          data: patient,
        };
        return res.status(201).json(response);
      }
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(404).json({ message: "Patient Not Found" });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const patient_data = await Patient.find(id);
    if (patient_data) {
      const patient = await Patient.delete(id);
      if (patient) {
        const response = {
          message: `Data of ${patient_data.name} deleted successfully`,
        };
        return res.status(201).json(response);
      }
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(404).json({ message: "Patient Not Found" });
    }
  }

  async search(req, res) {
    const { name } = req.params;
    const patient = await Patient.where("name", name);
    if (patient) {
      const data = {
        message: "Get Patient with name " + name,
        data: patient,
      };
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "Patient not Found" });
    }
  }

  async positive(req, res) {
    const patient = await Patient.where("status", "positive");
    if (patient) {
      const data = {
        message: "Get positive resources",
        total: patient.length,
        data: patient,
      };
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ message: "No patient with positive status" });
    }
  }

  async recovered(req, res) {
    const patient = await Patient.where("status", "recovered");
    if (patient) {
      const data = {
        message: "Get recovered resources",
        total: patient.length,
        data: patient,
      };
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ message: "No patient with recovered status" });
    }
  }

  async dead(req, res) {
    const patient = await Patient.where("status", "dead");
    if (patient) {
      const data = {
        message: "Get dead resources",
        total: patient.length,
        data: patient,
      };
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "No patient with dead status" });
    }
  }
}
module.exports = new PatientController();
