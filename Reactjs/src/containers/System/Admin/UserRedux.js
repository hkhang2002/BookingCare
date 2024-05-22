import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService"
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import { times } from 'lodash';
import * as actions from "../../../store/actions"
import TableManageUser from "./TableManageUser"
import "./UserRedux.scss"

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImg: "",
            isOpen: false,


            email: '',
            password: "",
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: "",
            userEditId: ""
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ""
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ""
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ""
            })
        }
        if (prevProps.listUser !== this.props.listUser) {
            let arrGender = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            let arrRole = this.props.roleRedux
            this.setState({
                email: '',
                password: "",
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
                avatar: '',
                previewImg: "",
                action: CRUD_ACTIONS.CREATE
            })
        }

    }
    handleChangeImg = async (event) => {
        let data = event.target.files
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log(base64);
            let ObjectUrl = URL.createObjectURL(file)
            this.setState({
                previewImg: ObjectUrl,
                avatar: base64
            })
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return
        let action = this.state.action
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.CreateNewUserStart({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                phonenumber: this.state.phoneNumber,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.EditAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                phonenumber: this.state.phoneNumber,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

        // fire redux actions

        setTimeout(() => {
            this.props.fechUserRedux()
        }, 1000);

    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('this is input required:' + arrCheck[i])
                break;
            }
        }
        return isValid
    }

    handleOnChangeInput = (event, id) => {
        let coppyState = { ...this.state }
        coppyState[id] = event.target.value
        this.setState({
            ...coppyState
        }, () => {
            console.log("hieu dz check input onchange:", this.state);
        })
        // email:'',
        // password:"",
        // firstName:'',
        // lastName:'',
        // phoneNumber:'',
        // address:'',
        // gender:'',
        // position:'',
        // role:'',
        // avatar:''
    }

    handleEditUserFromParent = (user) => {
        console.log(user);
        let imageBase64 = ""
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: "HARDCODE",
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: "",
            previewImg: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {

        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language
        let getGender = this.props.isLoadingGender
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state
        return (
            <div className='user-redux-container'>
                <div className='title'>CRUD USER</div>
                <div className="user-redux-body" >
                    <div className='container mb-5'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-12 '>{getGender === true ? "Loading gender" : ""}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => this.handleOnChangeInput(event, "email")}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => this.handleOnChangeInput(event, "password")}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstName" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastName" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phoneNumber" /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => this.handleOnChangeInput(event, "address")}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, "gender")}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === languages.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })

                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.postion" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, "position")}
                                    value={position}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === languages.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })

                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleId" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, "role")}
                                    value={role}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === languages.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })

                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg'
                                        type='file'
                                        hidden
                                        onChange={(event) => this.handleChangeImg(event)}
                                    ></input>
                                    <label htmlFor='previewImg' className='label-upload'> Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-img'
                                        style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                    style={{ padding: "0px 5px", fontWeight: "500" }}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>

                        </div>

                        <TableManageUser
                            handleEditUserFromParentKey={this.handleEditUserFromParent}
                            action={this.state.action}
                        />
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        CreateNewUserStart: (data) => dispatch(actions.CreateNewUserStart(data)),
        fechUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        EditAUserRedux: (data) => dispatch(actions.EditAUserStart(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changelanguageAppRedux:(language)=>dispatch(actions.changelanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);