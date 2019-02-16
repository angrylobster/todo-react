class List extends React.Component {
    constructor() {
        super()
        this.trackInput = this.trackInput.bind(this);
        this.addWord = this.addWord.bind(this);
        this.state = {
            list: [],
            word: ""
        }
    }

    trackInput(event) {
        this.setState({
            word: event.target.value
        });
    }

    addWord(){
        let list = this.state.list.slice()
        list.push(this.state.word)
        this.setState({
            list: list,
        })
    }

    render() {
        return ( 
            <div className = "list">
                <Form 
                    trackInput={ this.trackInput }
                    addWord={ this.addWord }
                />
                {this.state.list}
            </div>
        );
    }
}

class Form extends React.Component {
    render() {
        return(
            <React.Fragment>
                <input 
                    onChange = { this.props.trackInput }
                /> 
                <button onClick={ this.props.addWord }> add item </button>
            </React.Fragment>
        )
    }
}

ReactDOM.render( 
    <List /> ,
    document.getElementById('root')
);