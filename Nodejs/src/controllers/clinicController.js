import clinicServices from "../services/clinicServices"

let createClinic = async (req, res) => {
    try {
        let info = await clinicServices.createClinic(req.body)
        return res.status(200).json(info)
    } catch {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let info = await clinicServices.getAllClinic()
        return res.status(200).json(info)
    } catch {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let info = await clinicServices.getDetailClinicById(req.query.id)
        return res.status(200).json(info)
    } catch {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
}