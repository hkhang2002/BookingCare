import React, { Component } from 'react';
import { connect } from "react-redux";
import { postVerifyBookAppoinment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import { FormattedMessage } from 'react-intl';
import './VerifyEmail.scss'


class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stateVerify: false,
            errCode: 0
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            console.log("token:", token, doctorId);

            let res = await postVerifyBookAppoinment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    stateVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    stateVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }

        if (this.props.match && this.props.match.params && this.props.match.params.id) {


        }


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {


        }
    }




    render() {
        let stateVerify = this.state.stateVerify
        let errCode = this.state.errCode
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {stateVerify === false ?
                        <div>
                            Loading data....
                        </div>
                        :
                        <div>
                            {
                                +errCode === 0 ?
                                    <div className='info-booking-v'><FormattedMessage id="patient.booking-modal.confirm-email" /></div>
                                    :
                                    <div className='info-booking-x'><FormattedMessage id="patient.booking-modal.confirm-email-x" /></div>
                            }
                        </div>

                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);