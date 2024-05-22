import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInfoDoctor } from "../../../services/userService"
import { languages } from "../../../utils"
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
// import Comment from '../SocailPlugin/Comment';
// import LikeAndShare from '../SocailPlugin/LikeAndShare';



class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentDoctorId: id
            })

            let res = await getDetailInfoDoctor(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }


            // imageBase64=new Buffer(user.image, 'base64').toString('binary')
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        let language = this.props.language
        let { detailDoctor } = this.state
        let nameVi = ''
        let nameEn = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }
        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "https://bookingcare.vn/" : window.location.href
        console.log("check curentURL", window.location.href);
        return (
            <React.Fragment>
                <HomeHeader isshowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ""})` }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === languages.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <span>
                                        {
                                            detailDoctor.Markdown.description
                                        }
                                    </span>
                                }
                                <div className='like-share-plugin' >
                                    {/* <LikeAndShare
                                        dataHref={currentURL}
                                    >

                                    </LikeAndShare> */}
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className='comment-doctor'>
                        {/* <Comment
                            dataHref={currentURL}
                            width={"100%"}
                        >

                        </Comment> */}
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);