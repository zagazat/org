import React from 'react'

class CheckboxWidget extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {input} = this.props
        return <input type="checkbox" {...input} />
    }

}

export default CheckboxWidget;
