const { reject } = require("lodash")
import db from "../models/index"
import bcrypt from 'bcryptjs'
import emailServices from "./emailServices"
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();

let buidUrlEmail = (doctorId, token) => {
    {


        let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`

        return result
    }
}

let postBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.timeType || !data.doctorId || !data.date || !data.fullName || !data.selectedGender || !data.address) {
                console.log("lỗi validate");
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                console.log("data", data);
                await emailServices.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    reason: data.reason,
                    birthday: data.birthday,
                    date: data.date,
                    redireactLink: buidUrlEmail(data.doctorId, token)
                })

                //uppsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3",
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    },

                })
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save infor patient success!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let postVerifyBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let appoinment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appoinment) {
                    appoinment.statusId = 'S2'
                    await appoinment.save()
                    resolve({
                        errCode: 0,
                        errMessage: "Update the appoinment success!"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist!"
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppoinment: postBookAppoinment,
    postVerifyBookAppoinment: postVerifyBookAppoinment
}