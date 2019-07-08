import React from 'react';
import { Field, reduxForm, initialize, change } from 'redux-form';
import api from "../../../provider/api";
import {Link} from "react-router-dom";
import _ from "lodash";
import {addOrganizations, editOrganization, setOrganizationData} from "../../../store/companies/actions";
import {connect} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import * as reducer from "../../../store/companies/reducers";
import DatepickerWidget from '../../form/DatepickerWidget';
import CheckboxWidget from '../../form/CheckboxWidget';
import TextInputWidget from '../../form/TextInputWidget';
import SelectWidget from '../../form/SelectWidget';
import {bindActionCreators} from "redux";

class EditForm extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        info: null
    };

    componentDidMount() {
        console.log(this.props)
        const {companies} = this.props;

        let companyID = this.props.match.params.pk;

        if (companies.length === 0) {

            api.getCompanyList().then(response => {
                const companiesPk = _.keyBy(response.data.result, (item) => item.pk)

                this.props.dispatch(addOrganizations(companiesPk))

                const companyInfo = _.get(this.props.companies, companyID)

                this.props.dispatch(setOrganizationData(companyInfo, companyID))

                this.setState({info: companyInfo})
            }).catch(error => {
                // действие в случае ошибки
                console.log(error.response.data)
            })

        } else {
            this.setState({info: _.get(this.props.companies, companyID)});
            this.props.dispatch(setOrganizationData(_.get(this.props.companies, companyID)))
        }
    }

    handleSubmit = values => {
        let companyID = values.pk;

        api.setCompanyInfo(companyID, values).then(response => {
            this.props.dispatch(editOrganization(values.pk, values));
        }).catch(error => {
            // действие на случай ошибки
            console.log(error.response.data.error.message)
        })
    };

    render() {
        const { info } = this.state;

        if (info === null) {
            return null;
        }

        const { handleSubmit, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="type">Форма собственности</label></td>
                            <td>
                                <Field component={SelectWidget} id="type" type="select" name="type">
                                    <option value="1">ИП</option>
                                    <option value="2">ООО</option>
                                </Field>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="name">Название</label></td>
                            <td>
                                <Field component={TextInputWidget} name="name" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="reg_number">ОГРН</label></td>
                            <td><Field component={TextInputWidget} name="reg_number" type="text" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="created">Дата регистрации</label></td>
                            {/*<td><Field component={DatepickerWidget} selected={this.state.info.created} name="created" /></td>*/}
                        </tr>
                        <tr>
                            <td><label htmlFor="is_active">Активность</label></td>
                            <td><Field component={CheckboxWidget} name="is_active" type="checkbox" /></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">
                                <Link to={`/`}>К списку</Link> | <button type="submit">Изменить</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </form>
        )
    }
}

EditForm = reduxForm({
    form: 'editCompany',
    enableReinitialize : true
})(EditForm);

function mapStateToProps(state) {
    return {
        companies: reducer.getList(state),
        initialValues: reducer.getOrganizationData(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        change: bindActionCreators(change, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
