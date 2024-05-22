import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeHeader.scss"
import { FormattedMessage } from 'react-intl';
import { languages } from "../../utils"
import { changelanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
// import Search from './Section/search';

class HomeHeader extends Component {

    changelanguage = (language) => {
        this.props.changelanguageAppRedux(language)
    }

    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() {
        let language = this.props.language
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo' onClick={() => this.returnHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.specialist" /></b></div>
                                <div className='sub-title' ><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.chooseHospital" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.chooseDoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.package" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.General" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className={language === languages.VI ? "language-vi active" : "language-vi"}><span onClick={() => this.changelanguage(languages.VI)}>VN</span></div>
                            <div className={language === languages.EN ? "language-en active" : "language-en"}><span onClick={() => this.changelanguage(languages.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {/* {this.props.isshowBanner === true && */}
                <div className='home-header-banner'>
                    <div className='content-up'>
                        {/* <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><FormattedMessage id="banner.title2" /></div> */}
                        <div className='search'>
                            {/* <i className="fas fa-search"></i>
                            <input className='text' placeholder="Tìm kiếm"/> */}
                            {/* <Search /> */}
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='options-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.specialized" /></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.remote" /></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.general" /></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className="fas fa-flask"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.test" /></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.mental" /></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.dental" /></div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* } */}
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfor: state.user.userInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changelanguageAppRedux: (language) => dispatch(changelanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));