var Hello = React.createClass({

    getInitialState: function(){
        return ({tong: this.props.dem})
    },
    tinhTong: function(){
        this.state.tong = this.state.tong*1 + 1;
        this.setState(this.state);
    },
    render: function(){
        return(
            <button onClick={this.tinhTong}>Hello {this.state.tong=='0'?'':this.state.tong}</button>
        );
    }
})

ReactDOM.render(
    <Hello dem="0"/>,
    document.getElementById('root')
)