import {useState} from "react";

const MyInput = ({obj}) => {

    const [state, setState] = useState({value: ''});

    const handleInputChange = e => {
        setState({value:e.target.value})
        obj.name = e.target.value
    }
    return (
        <input onChange={handleInputChange} value={state.value}/>

    )
}

export default MyInput

/*
class MyInput extends Component {
    constructor() {
        super();
        this.state = {value: ""};
    }

    update = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <input onChange={this.update} value={this.state.value} />
        );
    }
}*/
