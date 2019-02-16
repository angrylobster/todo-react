class App extends React.Component {
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
                <List
                    list= { this.state.list }
                />
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