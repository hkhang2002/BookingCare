
import specialtyServices from "../services/specialtyServices"
let createSpecialty = async (req, res) => {
    try {
        let info = await specialtyServices.createSpecialty(req.body)
        return res.status(200).json(info)

    } catch {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let info = await specialtyServices.getAllSpecialty()
        return res.status(200).json(info)
    } catch {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let info = await specialtyServices.getDetailSpecialtyById(req.query.id, req.query.location)
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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}