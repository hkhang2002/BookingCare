import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { languages } from "../../../utils"
import localization from "moment/locale/vi"
import moment from 'moment';
import BookingModal from './Modal/BookingModal';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvalabelTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}

            if (language === languages.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi)
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                }

            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object)
        }
        return allDays

    }

    async componentDidMount() {

        let allDays = this.getArrDays(this.props.language)
        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvalabelTime: res.data ? res.data : []
            })
        }



        this.setState({
            allDays: allDays,
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvalabelTime: res.data ? res.data : []
            })

        }
    }

    handleOnChangeSelect = async (event) => {

        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)

            let allTime = []
            if (res && res.errCode === 0) {
                let data = res.data

                this.setState({
                    allAvalabelTime: res.data ? res.data : []
                })
            }

        }

    }

    handleCLickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingClose = () => {
        this.setState({
            isOpenModalBooking: false,
        })
    }

    render() {
        let allDays = this.state.allDays
        let allAvalabelTime = this.state.allAvalabelTime
        let language = this.props.language
        let isOpenModalBooking = this.state.isOpenModalBooking
        let dataScheduleTimeModal = this.state.dataScheduleTimeModal
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })

                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calender'>
                            <i className="fas fa-calendar-alt"><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                        </div>
                        <div className='time-content'>
                            {allAvalabelTime && allAvalabelTime.length > 0 ?
                                <React.Fragment>
                                    <div className='time-content-btn'>
                                        {allAvalabelTime.map((item, index) => {
                                            let timeDisplay = language === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => this.handleCLickScheduleTime(item)}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })
                                        }
                                    </div>

                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className="far fa-hand-point-up"></i>
                                            <FormattedMessage id="patient.detail-doctor.book" />
                                        </span>
                                    </div>
                                </React.Fragment>
                                :
                                <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingClose={this.closeBookingClose}
                    dataTime={dataScheduleTimeModal}
                />
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);