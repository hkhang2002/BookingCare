import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { languages } from '../../../utils';


class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrdoctorId: [],
            dataDetailClinic: {},

        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getDetailClinicById({
                id: id,

            })

            if (res && res.errCode === 0) {
                let data = res.data
                let arrdoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrdoctorId.push(item.doctorId)
                        })
                    }
                }


                this.setState({
                    dataDetailClinic: res.data,
                    arrdoctorId: arrdoctorId,

                })
            }
        }


    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {


        }
    }




    render() {
        console.log("check res", this.state);
        let { arrdoctorId, dataDetailClinic } = this.state
        let language = this.props.language
        return (
            <div className='detail-clinic-container'>
                <HomeHeader />
                <div className='description-clinic'>
                    <div className='description-sp-content'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&

                            <>
                                <div className='description-ln-title'>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>

                                </div>
                            </>
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);