import React, { Component } from 'react';
import { connect } from "react-redux";
import './DefaulClass.scss';

class DefaulClass extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    componentDidMount() {



    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {


        }
    }




    render() {
        return (

            <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaulClass);