var Album = React.createClass({
    getInitialState: function(){
        return ({hinh: 1});
    },
    prev: function(){
        this.state.hinh = this.state.hinh - 1;
        this.state.hinh = this.state.hinh==0?8:this.state.hinh;
        this.setState(this.state);
    },
    next: function(){
        this.state.hinh = this.state.hinh + 1;
        this.state.hinh = this.state.hinh==9?1:this.state.hinh;
        this.setState(this.state);
    },
    render: function(){
        return(
            <div>
                <img src={"images/"+this.state.hinh+".png"} />
                <hr/>
                <button onClick={this.prev}>Prev</button><button onClick={this.next}>Next</button>
            </div>
        );
    }
});

ReactDOM.render(
    <Album></Album>,
    document.getElementById('root')
);