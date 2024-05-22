import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import Slider from 'react-slick';

// Import css files
// import { FacebookShareButton, FacebookIcon } from 'react-share';

class HomeFooter extends Component {


    render() {

        return (
            <React.Fragment>
                <div className='homeFooter'>
                    <p>&copy; 2024 Phạm Hưng Khang - 2020600207 </p>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);