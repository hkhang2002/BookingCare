import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserServive, getAllUsers,
    DeleteUserServive, UpdateUserServive, getTopDoctorHome,
    getAllDoctors, saveDetaiDoctorService,
    getAllSpecialty, getAllClinic
} from "../../services/userService"
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

//Gender
export const fetchGenderStart = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFaide())
            }

        } catch (e) {
            dispatch(fetchGenderFaide())
            console.log("faidle", e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFaide = () => ({
    type: actionTypes.FETCH_GENDER_FAIDE
})


// Postions
export const fetchPositionStart = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFaide())
            }

        } catch (e) {
            dispatch(fetchPositionFaide())
            console.log("faidle", e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFaide = () => ({
    type: actionTypes.FETCH_POSITION_FAIDE
})


// RoleId
export const fetchRoleStart = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFaide())
            }

        } catch (e) {
            dispatch(fetchRoleFaide())
            console.log("faidle", e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFaide = () => ({
    type: actionTypes.FETCH_ROLE_FAIDE
})

// Create

export const CreateNewUserStart = (data) => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.CREATE_USER_START
            })
            let res = await createNewUserServive(data)
            if (res && res.errCode === 0) {
                toast.success("Create new user success!");
                dispatch(CreateNewUserSuccess(res.data))
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(CreateNewUserFaide())
            }

        } catch (e) {
            dispatch(CreateNewUserFaide())
            console.log("faidle", e);
        }
    }
}

export const CreateNewUserSuccess = (createData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: createData
})

export const CreateNewUserFaide = () => ({
    type: actionTypes.CREATE_USER_FAIDE
})

//get all
export const fetchAllUsersStart = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.CREATE_ALL_USERS_START
            })
            let res = await getAllUsers("ALL")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFaide())
            }

        } catch (e) {
            dispatch(fetchAllUsersFaide())
            console.log("faidle", e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.CREATE_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFaide = () => ({
    type: actionTypes.CREATE_ALL_USERS_FAIDE
})

//delete

export const DeleteUserStart = (userId) => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.DELETE_USER_START
            })
            let res = await DeleteUserServive(userId)
            if (res && res.errCode === 0) {
                toast.success("Delete user success!");
                dispatch(DeleteUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(DeleteUserFaide())
            }

        } catch (e) {
            dispatch(DeleteUserFaide())
            console.log("faidle", e);
        }
    }
}

export const DeleteUserSuccess = (Data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    data: Data
})

export const DeleteUserFaide = () => ({
    type: actionTypes.DELETE_USER_FAIDE
})


// Edit

export const EditAUserStart = (data) => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.EDIT_USER_START
            })
            let res = await UpdateUserServive(data)
            if (res && res.errCode === 0) {
                toast.success("Update a user success!");
                dispatch(EditAUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(EditAUserFaide())
            }

        } catch (e) {
            dispatch(EditAUserFaide())
            console.log("faidle", e);
        }
    }
}

export const EditAUserSuccess = (Data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    data: Data
})

export const EditAUserFaide = () => ({
    type: actionTypes.EDIT_USER_FAIDE
})

//TOP Doctors 
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHome("8")
            console.log('check res', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIDE

                })
            }
        } catch (e) {
            console.log("FETCH_TOP_DOCTOR_FAIDE", e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIDE
            })
        }
    }
}
// All dôctors

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIDE

                })
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTOR_FAIDE", e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIDE
            })
        }
    }
}

//save detal doctor

export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetaiDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success("Save detail doctors success!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                console.log("res", res);
                toast.error("Save detail doctors error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDE

                })
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTOR_FAIDE", e)
            toast.error("Save detail doctors error!");
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDE
            })
        }
    }
}

//fecth all time

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAIDE

                })
            }
        } catch (e) {

            dispatch({
                type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAIDE
            })
        }
    }
}
//Required Doctor Infor
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService("PRICE")
            let resPayment = await getAllCodeService("PAYMENT")
            let resProvince = await getAllCodeService("PROVINCE")
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFaide())
            }

        } catch (e) {
            dispatch(fetchRequiredDoctorInforFaide())
            console.log("faidle", e);
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFaide = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDE
})