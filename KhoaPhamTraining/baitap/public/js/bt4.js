var Element = React.createClass({
    render: function(){
        return(
            <h1>{this.props.children}</h1>
        );
    }
});

var List = React.createClass({
    getInitialState: function(){
        return {array: ["Element 1", "Element 2", "Element 3", "Element 4"]};
    },
    addElement: function(){
        this.state.array.push('Element');
        this.setState(this.state);
    },
    render: function(){
        return(
            <div>
                <button onClick={this.addElement}>Add</button>
                {
                    this.state.array.map(function(ele, index){
                        return(<Element key={index}>{ele}</Element>);
                    })
                }
            </div>
        );
    }
});

ReactDOM.render(
    <List></List>
    ,
    document.getElementById('root')
);