var Element = React.createClass({
    render: function(){
        return(
            <div>
                <img src={this.props.src} />
                <div>{this.props.children}</div>
            </div>
        );
    }
});

var List = React.createClass({
    getInitialState: function(){
        return {
            list: [
                {
                    content: "Element 1",
                    src: "images/1.png"
                },
                {
                    content: "Element 2",
                    src: "images/2.png"
                },
                {
                    content: "Element 3",
                    src: "images/3.png"
                },
            ]
        }
    },
    addElement: function(){
        this.state.list.unshift({
            content: "Element",
            src: "images/4.png"
        });
        this.setState(this.state);
    },
    render: function(){
        return(
            <div>
                <button onClick={this.addElement}>Add</button>
                {
                    this.state.list.map(function(ele, index){
                        return(<Element key={index} src={ele.src}>{ele.content}</Element>);
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