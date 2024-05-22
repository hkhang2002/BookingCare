import db from "../models"


let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64 || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {
                await db.Clinics.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML: data.descriptionHTML
                })
                resolve({
                    errCode: 0,
                    errMessage: "ok!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinics.findAll()
            if (data && data.length > 0) {
                // console.log("check data", data);

                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })
            }
            resolve({
                errCode: 0,
                errMessage: "ok!",
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {

                let data = await db.Clinics.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
                })

                if (data) {
                    let doctorClinic = []

                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId']
                    })


                    data.doctorClinic = doctorClinic
                } else data = {}

                resolve({
                    errCode: 0,
                    errMessage: "ok!",
                    data
                })

            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
}