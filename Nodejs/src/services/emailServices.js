
require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Hưng Khang" <phamkhang.412@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: formatEmailSendWhenAskPatientToConfirm(dataSend), // html body
    });

}
let formatEmailSendWhenAskPatientToConfirm = (dataSend) => {
    let mailDetail = "";
    function formatDate(date) {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        return day + '/' + month + '/' + year;
    }
    let timestamp = dataSend.birthday
    let date = new Date(timestamp);
    var dt = formatDate(date)
    console.log("dataSend", dataSend);
    if (dataSend.language === "vi") {
        mailDetail = `
      <h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên trang "Đặt Lịch Khám Online"</p>
      <h4>Thông tin lịch khám:</h4>
      <p>Thời gian: ${dataSend.time}</p>
      <p>Bác sỹ: ${dataSend.doctorName}</p>
      <h4>Thông tin khách hàng:</h4>
      <p>Họ và tên: ${dataSend.patientName}</p>
      <p>Số điện thoại: ${dataSend.phoneNumber}</p>
      <p>Địa chỉ: ${dataSend.address}</p>
      <p>Lí do khám: ${dataSend.reason}</p>
      <p>Ngày sinh: ${dt}</p>
      <p>Nếu thông tin trên là đúng, bạn vui lòng ấn vào đường link bên dưới để xác nhận đặt lịch khám!</p>
      <a href=${dataSend.redireactLink} target="_blank">Xác nhận tại đây</a>
      <p>Trân trọng!</p>
      `;
    }
    if (dataSend.language === "en") {
        mailDetail = `
      <h3>Dear ${dataSend.patientName}!</h3>
      <p>You received this email because you booked an online medical appointment on "Đặt Lịch Khám Online"</p>
      <h4>Information on examination schedule:</h4>
      <p>Time: ${dataSend.time}</p>
      <p>Doctor:${dataSend.doctorName}</p>
      <h4>Customer information:</h4>
      <p>Full name:  ${dataSend.patientName}</p>
      <p>Phone number:  ${dataSend.phoneNumber}</p>
      <p>Address contact:  ${dataSend.address}</p>
      <p>Reason for examination:${dataSend.reason}</p>
      <p>Date of birth: ${dt}</p>
      <p>If the above information is correct, please click on the link below to confirm your appointment!</p>
      <a href=${dataSend.redireactLink} target="_blank">Confirm here</a>
      <p>Best regard!</p>
      `;
    }
    return mailDetail;
};


//-------------------PART2------------------------------------//

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Đặt lịch khám Online 👻" <hieuminh2001s4@gmail.com>',
        to: dataSend.email.email,
        subject: "Kết quả đặt lịch khám",
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${dataSend.patientData}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: "base64"
            },
        ],
    });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
    let mailDetail = "";
    if (dataSend.language === "vi") {
        mailDetail = `
      <h3>Xin chào ${dataSend.patientData}!</h3>
      <p>Lịch khám của bạn đã được xác nhận tại "Đặt lịch khám Online". Dưới đây là thông tin phiếu khám !</p>
      <p>Vui lòng mang theo phiếu khám đến cơ sở khám bệnh</p>
      <p>Trân trọng!</p>
      `;
    }
    if (dataSend.language === "en") {
        mailDetail = `
      <h3>Dear ${dataSend.patientData}!</h3>
      <p>Your health examination schedule has been confirmed in the "Booking Care" section. Below is medical examination information!</p>
    <p>Please bring your health examination form to the medical examination facility</p>
      <p>Best regard!</p>
      `;
    }
    return mailDetail;
};

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}