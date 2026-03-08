import React from "react";

class Contact extends React.Component {

    constructor(props){
        super(props)
        this.state={
            data:{}
        }
        
    }

    componentDidMount(){
        const apiData=async()=>{
            const feachData = await fetch("https://api.github.com/users/zaid154");
            const jsonData=await feachData.json()
            this.setState({data : jsonData})
            // console.log(jsonData);
            
        }
        let a=0;
        this.zaid=setInterval(()=>{
            console.log(a++);
        },1000)
        apiData()
    }
    componentWillUnmount(){
        clearInterval(this.zaid)
    };

    render() {
        const {add}=this.props
        const {avatar_url,name,created_at}=this.state.data
        return (
            <>
            <h1></h1>
            <div className="user-profile">
                <img src={avatar_url}></img>
                <h1>Name : {name}</h1>
                <h1>created_at : {created_at}</h1>

            </div>
            </>
        )
    }
}


export default Contact
