import React from 'react';
import CompanyListElement from "../CompanyListElement";
import api from "../../../provider/api";
import {addOrganizations} from "../../../store/companies/actions";
import { connect } from 'react-redux';
import * as reducer from "../../../store/companies/reducers";
import _ from 'lodash';

class CompanyList extends React.Component {

    componentDidMount() {
        if (this.props.companies.length === 0) {
            api.getCompanyList().then(response => {
                const companiesPk = _.keyBy(response.data.result, (item) => item.pk);
                this.props.dispatch(addOrganizations(companiesPk));
            }).catch(error => {
                // действие в случае ошибки
                console.log(error.response.data)
            });
        }
    };

    render() {
        if (!this.props.companies) {
            return this.renderLoading();
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                    </tr>
                </thead>
                <tbody>
                {_.map(this.props.companies, item=>{
                    return (
                        <CompanyListElement key={item.pk} pk={item.pk} name={item.name} />
                    )
                })}
                </tbody>
            </table>
        )
    };

    renderLoading () {
        return (
            <p>Loading...</p>
        );
    }
}

function mapStateToProps(state) {
    return {
        companies: reducer.getList(state)
    }
}

export default connect(mapStateToProps)(CompanyList);
