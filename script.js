class App extends React.Component {
    constructor() {
        super()
        this.trackInput = this.trackInput.bind(this);
        this.addWord = this.addWord.bind(this);
        this.validateAndAddWord = this.validateAndAddWord.bind(this);
        this.removeWord = this.removeWord.bind(this);
        this.editWord = this.editWord.bind(this);
        this.addDone = this.addDone.bind(this);

        this.state = {
            list: [],
            doneList: [],
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
        let list = this.state.list.slice();
        list.push(this.state.word);
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

    addDone(done){
        let doneList = this.state.doneList.slice();
        doneList.push(done);
        this.setState({
            doneList: doneList
        })
    }

    editWord(index, editedWord){
        let list = [...this.state.list];
        list.splice(index,1,editedWord);
        this.setState({
            list: list
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
                    list={ this.state.list }
                    doneList={ this.state.doneList }
                    removeWord={ this.removeWord }
                    editWord={ this.editWord }
                    addDone={ this.addDone }
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
                    onKeyDown={ e => { e.keyCode === 13 ? this.props.validateAndAddWord() : null }}
                /> 
                <button onClick={ this.props.validateAndAddWord }> add item </button>
            </React.Fragment>
        )
    }
}

class List extends React.Component {

    onDragOver(e){
        e.preventDefault();
    }

    onDrop(e){
        let listItem = JSON.parse(e.dataTransfer.getData('ListItem'));
        this.props.removeWord(listItem.index);
        this.props.addDone(listItem.item);
    }

    mapList(list){
        return list.map((item, index) => {
            return (
                <ListItem 
                    item={ item } 
                    index={ index }
                    key={ index + item }
                    removeWord={ this.props.removeWord }
                    editWord={ this.props.editWord }
                />
            )
        })
    }

    render(){
        return(
            <div className="container-fluid">
                <table className="table mt-5">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1">#</th>
                            <th className="col-11" colSpan="2">Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.mapList(this.props.list) }
                    </tbody>
                </table>
                <table 
                    className="table mt-5"
                    onDragOver={ e => { this.onDragOver(e) }}
                    onDrop={ e => { this.onDrop(e, 'dropped') }}
                >
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1">#</th>
                            <th className="col-11" colSpan="2">Items Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.mapList(this.props.doneList) }
                    </tbody>
                </table>
            </div>
        )
    }
}

class ListItem extends React.Component{
    constructor(){
        super()
        this.startEdit = this.startEdit.bind(this)
        this.state = {
            isEditing: false
        }
    }

    applyHoverClass(e){
        e.target.className = "bg-secondary text-white col-1 float-right align-center"
    }

    removeHoverClass(e){
        e.target.className = "text-black-50 col-1 float-right"
    }

    startEdit(){
        this.setState({
            isEditing: true
        })
    }

    doEdit(e){
        this.props.editWord(this.props.index, e.target.value);
        this.setState({
            isEditing: false
        })
    }

    onDragStart(e){
        e.dataTransfer.setData('ListItem', JSON.stringify(this.props))
    }

    showInputOrItem(){
        if (this.state.isEditing){
            return (
                <input 
                    defaultValue={this.props.item}
                    onBlur={ e => {
                        this.doEdit(e);
                    }}
                    onKeyDown={ e => {
                        if(e.keyCode === 13){
                            this.doEdit(e);
                        }
                    }}
                />
            )
        } else {
            return (
                this.props.item
            )
        }
    }

    render(){
        return(
            <tr 
                className="d-flex"
                onDragStart={ e => { this.onDragStart(e) }}
                draggable
            >
                <td className="col-1">{ this.props.index + 1 }</td>
                <td 
                    className="col-10"
                    onClick={ e => { this.startEdit(e) }}
                >
                    { this.showInputOrItem() }
                </td>
                <td 
                    className="text-black-50 col-1 float-right"
                    onMouseLeave={ e => { this.removeHoverClass(e) }}
                    onMouseOver={ e => { this.applyHoverClass(e) }}
                    onClick={ () => { this.props.removeWord(this.props.index) }}
                >
                    x
                </td>
            </tr>
        )
    }
}

ReactDOM.render( 
    <App /> ,
    document.getElementById('root')
);