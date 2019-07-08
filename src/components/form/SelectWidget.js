import React from 'react';

class SelectWidget extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {children, selected, input} = this.props
        return (
            <select {...input} value={input.value.pk}>
                {children.map((option, index) => {
                    return <option key={index} value={option.props.value}>{option.props.children}</option>
                })}
            </select>
        )
    }
}

export default SelectWidget;
