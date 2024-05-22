import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "./Handbook.scss"
// Import css files


class HandBook extends Component {


    render() {

        return (
            <React.Fragment>
                <div className='section-share section-HandBook'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="homepage.handbook" /></span>
                            <button className='btn-section'><FormattedMessage id="homepage.all" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='img-customize'>
                                    <div className='bg-image section-HandBook-1'></div>
                                    <div className='hanbook-content'><FormattedMessage id="handbook.hanbook-1" /></div>
                                </div>
                                <div className='img-customize'>
                                    <div className='bg-image section-HandBook-2'></div>
                                    <div className='hanbook-content'><FormattedMessage id="handbook.hanbook-2" /></div>
                                </div>
                                <div className='img-customize'>
                                    <div className='bg-image section-HandBook-3'></div>
                                    <div className='hanbook-content'><FormattedMessage id="handbook.hanbook-3" /></div>
                                </div>
                                <div className='img-customize'>
                                    <div className='bg-image section-HandBook-4'></div>
                                    <div className='hanbook-content'><FormattedMessage id="handbook.hanbook-4" /></div>
                                </div>
                                <div className='img-customize'>
                                    <div className='bg-image section-HandBook-1'></div>
                                    <div className='hanbook-content'><FormattedMessage id="handbook.hanbook-1" /></div>
                                </div>
                                <div className='img-customize'>
                                    <div className='bg-image section-HandBook-2'></div>
                                    <div className='hanbook-content'><FormattedMessage id="handbook.hanbook-2" /></div>
                                </div>
                                <div className='img-customize'>
                                    <div className='bg-image section-HandBook-3'></div>
                                    <div className='hanbook-content'><FormattedMessage id="handbook.hanbook-3" /></div>
                                </div>
                                <div className='img-customize'>
                                    <div className='bg-image section-HandBook-4'></div>
                                    <div className='hanbook-content'><FormattedMessage id="handbook.hanbook-4" /></div>
                                </div>

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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);