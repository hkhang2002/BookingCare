import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils';
import { getProfileDoctorById } from '../../../services/userService';
import NumericFormat from 'react-number-format';
import _ from "lodash"
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });

        }
    }

    rederTimeBooking = (dataTime) => {
        let language = this.props.language
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === languages.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
            return (
                <>
                    <div><i className="far fa-clock"></i> {time}</div>
                    <div><i className="far fa-calendar-check"></i> {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking" /></div>
                </>
            )
        }
        return <></>
    }


    render() {
        console.log("profile state", this.state);
        let dataProfile = this.state.dataProfile

        let language = this.props.language
        let dataTime = this.props.dataTime
        let isShowDescriptionDoctor = this.props.isShowDescriptionDoctor
        let isShowLinhDetail = this.props.isShowLinhDetail
        let isShowPrice = this.props.isShowPrice
        let doctorId = this.props.doctorId

        let nameVi = ''
        let nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`
        }
        return (
            <>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ""})` }}
                    >

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === languages.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span>
                                            {
                                                dataProfile.Markdown.description
                                            }
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.rederTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                {isShowLinhDetail === true &&
                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`}><FormattedMessage id="homepage.more-info" /></Link>

                    </div>}

                {isShowPrice === true &&
                    <div className='Price'>
                        <span><FormattedMessage id="patient.extra-infor-doctor.price" />:</span>
                        {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData && language === languages.VI
                            &&
                            <NumericFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                className='number-price'
                                suffix={'VND'}
                            />
                        }

                        {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData && language === languages.EN
                            &&
                            <NumericFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                className='number-price'
                                suffix={'$'}
                            />
                        }
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);