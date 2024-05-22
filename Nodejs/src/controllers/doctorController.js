import doctorServices from "../services/doctorServices"
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 10
    try {
        let doctors = await doctorServices.getTopDoctorHome(+limit)
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}
let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorServices.getAllDoctors()
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorServices.SaveDetailInforDoctor(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}
let getDetailDoctorById = async (req, res) => {
    try {

        let info = await doctorServices.getDetailDoctorById(req.query.id)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let info = await doctorServices.bulkCreateSchedule(req.body)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let info = await doctorServices.getScheduleByDateService(req.query.doctorId, req.query.date)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}
let getExtraInforDoctorById = async (req, res) => {
    try {
        let info = await doctorServices.getExtraInforDoctorById(req.query.doctorId)
        return res.status(200).json(info)
    } catch {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}
let getProfileDoctorById = async (req, res) => {
    try {
        let info = await doctorServices.getProfileDoctorById(req.query.doctorId)
        return res.status(200).json(info)
    } catch {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

let getListPatientForDoctor = async (req, res) => {
    try {

        let info = await doctorServices.getListPatientForDoctor(req.query.doctorId, req.query.date)
        return res.status(200).json(info)
    } catch (e) {

        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

let sendRemedy = async (req, res) => {
    try {

        let info = await doctorServices.sendRemedy(req.body)
        return res.status(200).json(info)
    } catch (e) {

        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy
}