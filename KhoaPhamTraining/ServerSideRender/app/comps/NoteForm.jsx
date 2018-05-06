var React = require('react');
var NoteForm = React.createClass({
    add(){
        var v = this.refs.txt.value;
        this.refs.txt.value = '';
        this.props.addNote(v);
    },
    render(){
        return (
            <div>
                <input type="text" ref="txt" placeholder="Enter your note"/>
                <br/>
                <button onClick={this.add}>Add</button>
            </div>
        )
    }
});

module.exports = NoteForm;