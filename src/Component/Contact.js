import React from "react";

class Contact extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }

    }

    componentDidMount() {
        const apiData = async () => {
            const feachData = await fetch("https://api.github.com/users/zaid154");
            const jsonData = await feachData.json()
            this.setState({ data: jsonData })
            // console.log(jsonData);

        }
        let a = 0;
        this.zaid = setInterval(() => {
            console.log(a++);
        }, 1000)
        apiData()
    }
    componentWillUnmount() {
        clearInterval(this.zaid)
    };

    render() {
        const { add } = this.props
        const { avatar_url, name, created_at } = this.state.data
        return (
            <>

                <div className="display flex flex-col items-center">
                    {/* <img
                        src={avatar_url}
                        className="rounded-full w-80 h-80 m-4"
                    />
                    <h1><b>Name :</b> {name}</h1>
                    <h1><b>Created At :</b> {created_at}</h1>
                    <h1><b>Mail ID :</b> zaidm1323@gmail.com</h1> */}

                    <input placeholder="Enter your email" className="border border-black rounded p-2 m-2" ></input>
                    <input placeholder="Enter your message" className="border border-black rounded p-2 m-2" ></input>
                    <button className="bg-gray-400 px-19 mt-4 pt-3 py-2 rounded text-white">Submit</button>
                </div>
            </>
        )
    }
}


export default Contact
