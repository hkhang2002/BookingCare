import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { languages } from '../../../utils';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrdoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeService("PROVINCE")

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data
                let arrdoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrdoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resProvince.data

                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: "ALL",
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc'
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrdoctorId: arrdoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }


    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleOnChangeSelect = async (event) => {
        console.log("check onchange", event.target.value);
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = event.target.value


            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            })


            if (res && res.errCode === 0) {
                let data = res.data
                let arrdoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrdoctorId.push(item.doctorId)
                        })
                    }
                }


                this.setState({
                    dataDetailSpecialty: res.data,
                    arrdoctorId: arrdoctorId,
                })
            }

        }
    }


    render() {
        console.log("check res", this.state);
        let { arrdoctorId, dataDetailSpecialty, listProvince } = this.state
        let language = this.props.language
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='description-specialty'>
                    <div className='description-sp-content'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&

                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>

                            </div>
                        }
                    </div>
                </div>
                <div className='search-sp-doctor'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {listProvince && listProvince.length > 0 &&
                            listProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                    </option>
                                )
                            })

                        }
                    </select>
                </div>
                <div>
                    {arrdoctorId && arrdoctorId.length > 0 &&
                        arrdoctorId.map((item, index) => {
                            return (
                                <div className='each-dcotor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinhDetail={true}
                                                isShowPrice={false}
                                            // dataTime={}
                                            />
                                        </div>
                                    </div>

                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-info'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);