function getName(name){
    alert(name);
}

var MauVang = React.createClass({
    layThongTin: function(){
        alert(this.props.children)
    },
    getInitialState: function(){
        return {tongHocVien: this.props.tongHocVien}
    },
    themHocVien: function(){
        this.state.tongHocVien = parseInt(this.state.tongHocVien) + 1;
        this.setState(this.state);
    },
    render: function(){
        return(
            <div>
                <div className='mauvang'>{this.props.name}</div>
                <p>{this.props.children}</p>
                <p>Tong hoc vien: {this.state.tongHocVien}</p>
                <button onClick={this.layThongTin}>Bat Su Kien Trong</button>
                <button onClick={()=>{getName(this.props.name)}}>Bat Su kien Ngoai</button>
                <button onClick={this.themHocVien}>Them Hoc Vien</button>
                <KhoaHoc></KhoaHoc>
            </div>
        );
    }
});

var KhoaHoc = React.createClass({
    render: function(){
        return(
            <div>Khoa Hoc</div>
        );
    }
});

var Reference = React.createClass({
    hienThi: function(){
        var value = this.refs.txt.value;
        alert(value);
    },
    render: function(){
        return(
            <div>
                <input type="text" ref="txt" />
                <button onClick={this.hienThi}>Hien Thi</button>
            </div>
        );
    }
})

ReactDOM.render(
    <div>
        <Reference></Reference>
        <MauVang name='ReactJS' tongHocVien='10'>Children 1</MauVang>
        <MauVang name='NodeJS' tongHocVien='20'>Children 2</MauVang>
        <MauVang tongHocVien='30'>Children 3</MauVang>
    </div>    
    , document.getElementById('root')
);