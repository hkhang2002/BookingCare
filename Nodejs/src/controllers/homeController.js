import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }

}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('asdsadas')
}

let displayGetCRUD = async (req, res) => {

    let data = await CRUDService.getAllUser();

    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserById(userId);

        return res.render("editCRUD.ejs",
            {
                user: userData,
            })
    }
    else return res.send('User not found')
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allusers = await CRUDService.updateUser(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allusers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDService.deleteUser(id);
        return res.send("deleted")
    }
    else return res.send("deo xoa dc");

}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}