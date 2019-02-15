class List extends React.Component {
    constructor() {
        super()
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            list: [],
            word: ""
        }
    }

    changeHandler(event) {
        this.setState({
            word: event.target.value
        });
        console.log("change", event.target.value);
    }

    render() {
        return ( 
            <div className = "list">
                <input 
                    onChange = { this.changeHandler }
                    value = { this.state.word }
                /> 
                <button> add item </button>
            </div>
        );
    }
}

ReactDOM.render( 
    <List /> ,
    document.getElementById('root')
);