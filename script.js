class App extends React.Component {
    constructor() {
        super()
        this.trackInput = this.trackInput.bind(this);
        this.addWord = this.addWord.bind(this);
        this.validateAndAddWord = this.validateAndAddWord.bind(this);
        this.removeWord = this.removeWord.bind(this);
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

    removeWord(index){
        let list = this.state.list.slice();
        list.splice(index,1);
        this.setState({
            list: list
        })
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
                    removeWord={ this.removeWord }
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
    mapList(){
        return this.props.list.map((item, index) => {
            return (
                <ListItem 
                    item={ item } 
                    index={ index }
                    key={ index + item }
                    removeWord={ this.props.removeWord }
                />
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
                    { this.mapList() }
                </tbody>
            </table>

            </div>
        )
    }
}

class ListItem extends React.Component{
    applyHoverClass(e){
        e.target.className = "bg-secondary text-white col-1 float-right align-center"
    }

    removeHoverClass(e){
        e.target.className = "text-black-50 col-1 float-right"
    }

    render(){
        return(
            <tr 
                className="d-flex"
            >
                <td className="col-1">{ this.props.index + 1 }</td>
                <td className="col-10">{ this.props.item }</td>
                <td 
                    className="text-black-50 col-1 float-right"
                    onMouseLeave={ e => { this.removeHoverClass(e) }}
                    onMouseOver={ e => { this.applyHoverClass(e) }}
                    onClick={ () => { this.props.removeWord(this.props.index) }}
                >x</td>
            </tr>
        )
    }
}

ReactDOM.render( 
    <App /> ,
    document.getElementById('root')
);