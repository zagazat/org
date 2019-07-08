import React from 'react'
import {change} from "redux-form";
import {connect} from 'react-redux';

class TextInputWidget extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    state = {
        value: this.props.initValue
    }

    handleChange = element => {
        // console.log(element.target.value)
        // this.setState({
        //     value: element.target.value
        // })
        // this.props.dispatch(change('editCompany', element.target.name, element.target.value))
    }

    render() {
        const {input, name, type, meta: {touched, error}} = this.props
        return (
            <div>
                <input {...input} type={type} />
                {/*defaultValue={this.state.value}*/}
            </div>
        )
    }

}

export default TextInputWidget;
