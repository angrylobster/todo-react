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

    // removeWord(){
    //     let list = this.state.list.slice()
    //     list.
    // }

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
    applyHoverClass(e){
        e.target.className = "bg-secondary text-white col-1 float-right align-center"
    }

    removeHoverClass(e){
        e.target.className = "text-black-50 col-1 float-right"
    }

    mappedList(){
        return this.props.list.map((item, index) => {
            return (
                <tr 
                    className="d-flex"
                    key={ (index + 1) + item }
                >
                    <td className="col-1">{ index + 1 }</td>
                    <td className="col-10">{ item }</td>
                    <td 
                        className="text-black-50 col-1 float-right"
                        onMouseLeave={ e => { this.removeHoverClass(e) }}
                        onMouseOver={ e => { this.applyHoverClass(e) }}
                    >x</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div className="container-fluid">
            <table className="table">
                <thead>
                    <tr className="d-flex">
                        <th className="col-1">#</th>
                        <th className="col-11" colSpan="2">Item</th>
                    </tr>
                </thead>
                <tbody>
                    { this.mappedList() }
                </tbody>
            </table>

            </div>
        )
    }
}

ReactDOM.render( 
    <App /> ,
    document.getElementById('root')
);