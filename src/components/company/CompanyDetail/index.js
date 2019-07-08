import React from "react";
import api from "../../../provider/api";
import Moment from "react-moment";
import {Link} from 'react-router-dom';
import * as reducer from "../../../store/companies/reducers";
import {connect} from "react-redux";
import _ from 'lodash';
import {addOrganizations} from "../../../store/companies/actions";

class CompanyDetail extends React.Component {
    state = {
        info: null
    };

    componentDidMount() {
        const {companies} = this.props;

        let companyID = this.props.match.params.pk;

        if (companies.length === 0) {

            api.getCompanyList().then(response => {
                const companiesPk = _.keyBy(response.data.result, (item) => item.pk);

                this.props.dispatch(addOrganizations(companiesPk));

                this.setState({info: _.get(this.props.companies, companyID)});
            }).catch(error => {
                // действие в случае ошибки
                console.log(error.response.data)
            });

        } else {
            this.setState({info: _.get(this.props.companies, companyID)});
        }
    }

    render() {
        const { info } = this.state;

        if (info === null) {
            return null;
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <td>Форма собственности</td>
                        <td>{this.state.info.type.pk === 1 ? 'ИП' : 'ООО'}</td>
                    </tr>
                    <tr>
                        <td>Название</td>
                        <td>{this.state.info.name}</td>
                    </tr>
                    <tr>
                        <td>ОГРН</td>
                        <td>{this.state.info.reg_number}</td>
                    </tr>
                    <tr>
                        <td>Дата регистрации</td>
                        <td><Moment format="DD/MM/YYYY">{ this.state.info.created }</Moment></td>
                    </tr>
                    <tr>
                        <td>Активность</td>
                        <td>{ this.state.info.is_active ? 'Да' : 'Нет' }</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">
                            <Link to={`/`}>К списку</Link>
                            |
                            <Link to={`edit/${this.state.info.pk}`}>Изменить</Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        )
    }
}

function mapStateToProps(state) {
    return {
        companies: reducer.getList(state)
    }
}

export default connect(mapStateToProps)(CompanyDetail);
