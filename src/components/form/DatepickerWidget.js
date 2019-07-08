import React from 'react'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css"

class DatepickerWidget extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    state = {
        selected: new Date(this.props.selected)
    }

    handleChange = date => {
        this.setState({
            selected: new Date(date),
        });
        this.props.input.onChange(date.toJSON())
    }

    render() {
        const { input, selected } = this.props
        return <DatePicker dateFormat="dd/MM/yyyy"
                           onChange={this.handleChange}
                           selected={this.state.selected} />
    }
}

export default DatepickerWidget;
