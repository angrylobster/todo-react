class List extends React.Component {
    constructor() {
        super()
        this.changeHandler = this.changeHandler.bind(this);
        this.registerWord = this.registerWord.bind(this);
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

    addWord(){
        let list = this.state.list.slice()
        list.push(this.state.word)
        this.setState({
            list: list,
            word: ""
        })
    }

    render() {
        return ( 
            <div className = "list">
                <input 
                    onChange = { this.changeHandler }
                    value = { this.state.word }
                /> 
                <button onClick={ this.addWord }> add item </button>
                <br/>
                { this.state.list }
            </div>
        );
    }
}

ReactDOM.render( 
    <List /> ,
    document.getElementById('root')
);