const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: "CHANGE_LANGUAGE",


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    FETCH_GENDER_START: "FETCH_GENDER_START",
    FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
    FETCH_GENDER_FAIDE: "FETCH_GENDER_FAIDE",

    //Postion
    FETCH_POSITION_START: "FETCH_POSITION_START",
    FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
    FETCH_POSITION_FAIDE: "FETCH_POSITION_FAIDE",

    //RoleID
    FETCH_ROLE_START: "FETCH_ROLE_START",
    FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
    FETCH_ROLE_FAIDE: "FETCH_ROLE_FAIDE",

    //Create
    CREATE_USER_START: "CREATE_USER_START",
    CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
    CREATE_USER_FAIDE: "CREATE_USER_FAIDE",

    //get all
    CREATE_ALL_USERS_START: "CREATE_ALL_USERS_START",
    CREATE_ALL_USERS_SUCCESS: "CREATE_ALL_USERS_SUCCESS",
    CREATE_ALL_USERS_FAIDE: "CREATE_ALL_USERS_FAIDE",

    //delete
    DELETE_USER_START: "DELETE_USER_START",
    DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
    DELETE_USER_FAIDE: "DELETE_USER_FAIDE",

    //Edit
    EDIT_USER_START: "EDIT_USER_START",
    EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
    EDIT_USER_FAIDE: "EDIT_USER_FAIDE",

    // Top Doctor
    FETCH_TOP_DOCTOR_SUCCESS: "FETCH_TOP_DOCTOR_SUCCESS",
    FETCH_TOP_DOCTOR_FAIDE: "FETCH_TOP_DOCTOR_FAIDE",

    // get all doctors
    FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
    FETCH_ALL_DOCTOR_FAIDE: "FETCH_ALL_DOCTOR_FAIDE",

    //save detal doctor
    SAVE_DETAIL_DOCTOR_SUCCESS: "SAVE_DETAIL_DOCTOR_SUCCESS",
    SAVE_DETAIL_DOCTOR_FAIDE: "SAVE_DETAIL_DOCTOR_FAIDE",

    //fecth all time
    FETCH_ALL_SCHEDULE_TIME_SUCCESS: "FETCH_ALL_SCHEDULE_TIME_SUCCESS",
    FETCH_ALL_SCHEDULE_TIME_FAIDE: "FETCH_ALL_SCHEDULE_TIME_FAIDE",

    //Required Doctor Infor
    FETCH_REQUIRED_DOCTOR_INFOR_START: "FETCH_REQUIRED_DOCTOR_INFOR_START",
    FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS: "FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS",
    FETCH_REQUIRED_DOCTOR_INFOR_FAIDE: "FETCH_REQUIRED_DOCTOR_INFOR_FAIDE",
})

export default actionTypes;