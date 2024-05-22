import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import { FacebookShareButton, FacebookIcon } from 'react-share';
// import LikeAndShare from '../../Patient/SocailPlugin/LikeAndShare';
// Import css files
import "./about.scss"

class About extends Component {


    render() {

        return (
            <React.Fragment>
                <div className='section-share section-About'>
                    <div className='about-container'>
                        <div className='section-about-header'>
                            <FormattedMessage id="homepage.about" />
                        </div>
                        <div className='section-about-content'>
                            <div className='content-left'>
                                <iframe
                                    width="100% "
                                    height="320"
                                    src="https://www.youtube.com/embed/7tiR7SI4CkI"
                                    title="BookingCare trên VTV1 ngày 21/02/2018 - Chương trình Cà phê khởi nghiệp"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen                            >

                                </iframe>
                            </div>
                            <div className='content-right'>
                                <p>
                                    <FormattedMessage id="about.content" />
                                </p>
                                {/* <div className='like-share-plugin'>
                                    <LikeAndShare/>
                            </div>  */}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);