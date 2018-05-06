var React = require('react');
var Note = require('./Note.jsx');
var NoteForm = require('./NoteForm.jsx');

var List = React.createClass({
    del(index){
        this.state.mang.splice(index, 1);
        this.setState(this.state);
    },
    add(text){
        this.state.mang.push(text);
        this.setState(this.state);
    },
    getInitialState(){
        return {mang: ["Android", "IOS", "NodeJS"]}
    },
    render(){
        return (
            <div>
                <NoteForm addNote={this.add}></NoteForm>
                {this.state.mang.map((e, i) => {
                    return <Note key={i} remove={this.del} index={i}>{e}</Note>
                })}
            </div>
        );
    }
});

module.exports = List;