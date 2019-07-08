import React from 'react';
import {Link} from 'react-router-dom';

class CompanyListElement extends React.Component {

    state = {
        info: []
    };

    render() {
        return (
            <tr>
                <td>{ this.props.pk }</td>
                <td><Link to={`company/${this.props.pk}`}>{ this.props.name }</Link></td>
            </tr>
        )
    }
}

export default CompanyListElement;
