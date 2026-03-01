import React from "react";

class Contact extends React.Component {

    constructor(props){
        super(props)
        // console.log(this.props);
        this.state={
            count:0
        }
        
    }

    render() {
        return (
            <div className="user-profile">
                <h1>Name : {this.props.name}</h1>
                <h3>Add : {this.props.add}</h3>
                <h3>Add : {this.state.count}</h3>
                <button onClick={()=>this.setState({count:this.state.count+1    })}>clicl</button>
            </div>
        )
    }
}


export default Contact
