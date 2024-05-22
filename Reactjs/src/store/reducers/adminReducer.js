import actionTypes from '../actions/actionTypes';


const initialState = {
    isLoadingGender: false,
    genders: [],
    positions: [],
    roles: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduletime: [],

    allRequiredDoctorInfor: []

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //Gender
        case actionTypes.FETCH_GENDER_START:

            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIDE:

            state.isLoadingGender = false
            state.genders = []
            return {
                ...state,
            }

        //Postion
        case actionTypes.FETCH_POSITION_START:

            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data

            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIDE:

            state.positions = []
            return {
                ...state,
            }
        //Role
        case actionTypes.FETCH_ROLE_START:


            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data


            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIDE:

            state.roles = []
            return {
                ...state,
            }

        //All user
        case actionTypes.CREATE_ALL_USERS_START:
            return {
                ...state,
            }
        case actionTypes.CREATE_ALL_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state
            }
        case actionTypes.CREATE_ALL_USERS_FAIDE:
            state.users = []
            return {
                ...state,
            }

        //Top doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIDE:
            state.topDoctors = []
            return {
                ...state,
            }

        //All doctor
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDr
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIDE:
            state.allDoctors = []
            return {
                ...state,
            }

        //All Time
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
            state.allScheduletime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAIDE:
            state.allScheduletime = []
            return {
                ...state,
            }
        // all Required Doctor Info
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDE:
            state.allRequiredDoctorInfor = []
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;