import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Can not be empty!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    let users = await userService.handleGetAllUsers(id);
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing Id",
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}



module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}