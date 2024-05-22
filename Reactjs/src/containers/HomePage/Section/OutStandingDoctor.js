import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from "../../../store/actions"
import { languages } from "../../../utils"
import { withRouter } from 'react-router';
import "./OutStandingDoctor.scss"


class OutStandingDotor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctor()
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    render() {
        console.log("check arrdoctor", this.props.topDoctorsRedux);
        let allDoctors = this.state.arrDoctors
        let language = this.props.language
        return (
            <React.Fragment>
                <div className='section-share section-outstanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>
                                <FormattedMessage id="homepage.outstanding-doctor" />
                            </span>
                            <button className='btn-section'>
                                <FormattedMessage id="homepage.more-info" />
                            </button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>

                                {allDoctors && allDoctors.length > 0
                                    && allDoctors.map((item, index) => {
                                        console.log("check item:", item);
                                        let imageBase64 = ""
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                        let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`
                                        return (
                                            <div className='img-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div className='customize-boder outstanding-doctor-child'>
                                                    <div className='outer-bg'>
                                                        <div className='bg-image section-outstanding-doctor '
                                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                                        >
                                                        </div>
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div>{language === languages.VI ? nameVi : nameEn}</div>
                                                        {/* <div>Cơ xương khớp</div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </Slider>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDotor));