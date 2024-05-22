import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import { toast } from 'react-toastify';
import { createNewClinic } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
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


    handleOnChangeInput = (event, id) => {
        let stateCoppy = { ...this.state }
        stateCoppy[id] = event.target.value
        this.setState({
            ...stateCoppy
        })
    }

    handleChangeImg = async (event) => {
        let data = event.target.files
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64,
            })
        }
    }


    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })

    }

    handleSaveNewClinic = async () => {
        console.log("check state", this.state);
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success("Add new clinic successs!")
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error("Something wrong!")
        }
    }

    render() {
        return (

            <div className='manage-specialty-container'>
                <div className='ms-title title'><FormattedMessage id="menu.admin.manage-clinic" /></div>

                <div className='add-new-spceilty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.name-clinic" /></label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label className='col-12'><FormattedMessage id="admin.img-clinic" /></label>
                        <input
                            className='form-control-file'
                            type='file'
                            onChange={(event) => this.handleChangeImg(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.address-clinic" /></label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px', marginTop: "20px" }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button
                            className='btn-save-specialty'
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            <FormattedMessage id="manage-schedule.save" />
                        </button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);