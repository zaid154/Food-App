import React from "react";

class Contact extends React.Component {

    constructor(props){
        super(props)
        console.log(this.props);
        
    }

    render() {
        return (
            <div className="user-profile">
                <h1>Name : {this.props.name}</h1>
                <h3>Add : {this.props.add}</h3>
                
            </div>
        )
    }
}


export default Contact
