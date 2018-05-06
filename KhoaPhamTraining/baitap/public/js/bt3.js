var IntervalAlbum = React.createClass({
    getInitialState: function(){
        return {hinh: 1};
    },
    changeImage: function(){
        this.state.hinh = (this.state.hinh % 8) + 1;
        this.setState(this.state);
    },
    render: function(){
        return (
            <img src={"images/" + this.state.hinh + ".png"} />
        );
    },
    componentDidMount: function(){
        setInterval(this.changeImage, 1000);
    }
});

ReactDOM.render(
    <IntervalAlbum></IntervalAlbum>
    ,
    document.getElementById('root')
);