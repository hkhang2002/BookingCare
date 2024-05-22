import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import "./ManageSchedule.scss"
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, languages, dateFormat } from "../../../utils"
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelected = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelected
            })
        }
        if (prevProps.allScheduletime !== this.props.allScheduletime) {
            let data = this.props.allScheduletime
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelected = false;
                    return item

                })
            }
            this.setState({
                rangeTime: data
            })
        }
        // if(prevProps.language !== this.props.language){
        //     let dataSelected= this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelected
        //     })
        // }
    }

    buildDataInputSelect = (inputData) => {
        let result = []
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName} `

                object.label = language === languages.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });

    };


    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let rangeTime = this.state.rangeTime
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!currentDate) {
            toast.error("Ivalid date!");
            return
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Ivalid selected Doctor!");
            return
        }
        // let FomatedDate=moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let FomatedDate=moment(currentDate).unix()
        let FomatedDate = new Date(currentDate).getTime()

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected == true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = FomatedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                })
            } else {
                toast.error("Ivalid selected Time!");
                return
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            FomatedDate: FomatedDate
        })

        if (res && res.errCode === 0) {
            toast.success("Success save Info!");
        } else {
            toast.error("Error save Bulk Schedule Doctor!");
        }
        console.log((result));
    }

    render() {
        console.log("check ", this.state.rangeTime);
        let rangeTime = this.state.rangeTime
        let language = this.props.language
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}

                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}

                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <div
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule hover'}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === languages.VI ? item.valueVi : item.valueEn}

                                        </div>
                                    )
                                })


                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary '
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduletime: state.admin.allScheduletime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);