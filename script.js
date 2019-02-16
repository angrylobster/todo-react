class App extends React.Component {
    constructor() {
        super()
        this.trackInput = this.trackInput.bind(this);
        this.addWord = this.addWord.bind(this);
        this.validateAndAddWord = this.validateAndAddWord.bind(this);
        this.state = {
            list: [],
            errors: [],
            word: ""
        }
    }

    trackInput(event) {
        this.setState({
            word: event.target.value
        });
    }

    validateAndAddWord(){
        if (this.state.word.length < 1 || this.state.word.length > 200){
            this.addError("Invalid word length. Items must be between 0 and 200 characters.");
        } else {
            this.clearErrors();
            this.addWord();
        }
    }

    addWord(){
        let list = this.state.list.slice()
        list.push(this.state.word)
        this.setState({
            list: list,
        })
    }

    addError(errorMessage){
        let errors = this.state.errors.slice();
        errors.includes(errorMessage) ? null : errors.push(errorMessage);
        this.setState({
            errors: errors
        })
    }

    clearErrors(){
        this.setState({
            errors: []
        })
    }

    render() {
        return ( 
            <div className = "list">
                <Form 
                    trackInput={ this.trackInput }
                    validateAndAddWord={ this.validateAndAddWord }
                    errors={ this.state.errors }
                />
                <List
                    list= { this.state.list }
                />
            </div>
        );
    }
}

class Form extends React.Component {

    displayErrors(){
        if (this.props.errors.length !== 0) {
            return (
                <div className="p-3 mb-2 bg-danger text-white">
                    { this.props.errors[this.props.errors.length - 1] }
                </div>
            )
        }
    }

    render() {
        return(
            <React.Fragment>
                { this.displayErrors() }
                <input 
                    onChange={ this.props.trackInput }
                /> 
                <button onClick={ this.props.validateAndAddWord }> add item </button>
            </React.Fragment>
        )
    }
}

class List extends React.Component {
    mappedList(){
        return this.props.list.map((item, index) => {
            return (
                <tr key={ (index + 1) + item }>
                    <td>{ index + 1 }</td>
                    <td>{ item }</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <table striped='true'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                    { this.mappedList() }
                </tbody>
            </table>
        )
    }
}

ReactDOM.render( 
    <App /> ,
    document.getElementById('root')
);