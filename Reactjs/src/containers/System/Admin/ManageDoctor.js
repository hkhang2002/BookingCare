import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ManageDoctor.scss"
import * as actions from "../../../store/actions"
import { CRUD_ACTIONS, languages } from "../../../utils"

// import react, react-markdown-editor-lite, and a markdown parser you like


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';

import { getDetailInfoDoctor } from '../../../services/userService';



// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);




class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: '',
            hasOldData: false,


            //Save to docto info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            selectClinic: "",
            selectSpecialty: "",
            nameClinic: "",
            addressClinic: "",
            note: "",
            clinicId: "",
            specialtyId: ""
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getRequiredDoctorInfor()

    }


    buildDataInputSelect = (inputData, type) => {
        let result = []
        let language = this.props.language

        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName} `

                    object.label = language === languages.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'PRICE') {

                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi} VNĐ`
                    let labelEn = `${item.valueEn} USD`

                    object.label = language === languages.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })

            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn} `

                    object.label = language === languages.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if (type === "SPECIALTY") {
                inputData.map((item, index) => {
                    let object = {}

                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === "CLINIC") {
                inputData.map((item, index) => {
                    let object = {}

                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }

        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelected = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelected
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelected = this.buildDataInputSelect(this.props.allDoctors, 'USERS')

            this.setState({
                listDoctors: dataSelected
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSectedSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSectedClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
                listSpecialty: dataSectedSpecialty,
                listClinic: dataSectedClinic
            })
        }
        if (prevProps.language !== this.props.language) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
            })
        }

    }


    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })

    }

    handleSaveContentMarkdown = () => {
        let hasOldData = this.state.hasOldData
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectClinic && this.state.selectClinic.value ? this.state.selectClinic.value : "",
            specialtyId: this.state.selectSpecialty.value
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state
        let res = await getDetailInfoDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown

            let addressClinic = ''
            let nameClinic = ''
            let note = ''
            let paymentId = ''
            let priceId = ''
            let provinceId = ''
            let specialtyId = ''
            let clinicId = ''

            let selectedPayment = ''
            let selectedPrice = ''
            let selectedProvince = ''
            let selectClinic = ""
            let selectSpecialty = ""

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.nameClinic
                note = res.data.Doctor_Infor.note
                priceId = res.data.Doctor_Infor.priceId
                paymentId = res.data.Doctor_Infor.paymentId
                provinceId = res.data.Doctor_Infor.provinceId
                specialtyId = res.data.Doctor_Infor.specialtyId
                clinicId = res.data.Doctor_Infor.clinicId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })

            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectSpecialty: selectSpecialty,
                selectClinic: selectClinic
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectSpecialty: '',
                selectClinic: ''
            })
        }
    };

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name
        let stateCoppy = { ...this.state }
        stateCoppy[stateName] = selectedOption
        this.setState({
            ...stateCoppy
        })

        console.log("check new selec", selectedOption, stateName);
    }

    handleOnChangTextDescription = (event, id) => {
        let stateCoppy = { ...this.state }
        stateCoppy[id] = event.target.value
        this.setState({
            ...stateCoppy
        })
    }

    render() {
        console.log("state", this.state);
        let hasOldData = this.state.hasOldData
        let listSpecialty = this.state.listSpecialty
        const { selectedOption } = this.state;

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor" />
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label> <FormattedMessage id="admin.select-doctor" /> </label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.select-doctor" />}

                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.intro" /></label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnChangTextDescription(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.price" />}
                            name="selectedPrice"

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.payment" />}
                            name="selectedPayment"

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.province" />}
                            name="selectedProvince"

                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.name-clinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangTextDescription(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.address-clinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangTextDescription(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangTextDescription(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.specialty" /></label>
                        <Select
                            value={this.state.selectSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.specialty" />}
                            name="selectSpecialty"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.clinic" /></label>
                        <Select
                            value={this.state.selectClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.clinic" />}
                            name="selectClinic"
                        />
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px', marginTop: "20px" }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>


                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                >
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.save" /> </span>
                        :
                        <span><FormattedMessage id="admin.add" /></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);