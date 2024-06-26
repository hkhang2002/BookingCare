import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
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

    handleSaveNewSpecialty = async () => {
        console.log("check state", this.state);
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success("Add new specialty successs!")
            this.setState({
                name: '',
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
                <div className='ms-title title'> <FormattedMessage id="menu.admin.manage-specialty" /></div>

                <div className='add-new-spceilty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.name-specialty" /></label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label className='col-12'><FormattedMessage id="admin.img-specialty" /></label>
                        <input
                            className='form-control-file'
                            type='file'
                            onChange={(event) => this.handleChangeImg(event)}
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
                            onClick={() => this.handleSaveNewSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);