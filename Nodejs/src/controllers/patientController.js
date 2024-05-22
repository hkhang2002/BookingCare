import patientServices from "../services/patientServices"

let postBookAppoinment = async (req, res) => {
    try {
        let info = await patientServices.postBookAppoinment(req.body)
        return res.status(200).json(info)
    } catch {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }
}


let postVerifyBookAppoinment = async (req, res) => {
    try {
        let info = await patientServices.postVerifyBookAppoinment(req.body)
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
    postBookAppoinment: postBookAppoinment,
    postVerifyBookAppoinment: postVerifyBookAppoinment
}