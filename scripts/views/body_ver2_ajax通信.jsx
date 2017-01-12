var React = require('react');
var ReactDOM = require('react-dom'); //findDOMNodeのため必須
var request = require('superagent'); //ajax通信を実現

//Body <= index.js
var Body = React.createClass({
  render: function(){
    return (
        <UserBox/>
    );
  }
});

//UserBox <= Body
var UserBox = React.createClass({
    //states(userData)の宣言
  getInitialState:function(){
    return {
        userData:[]
    };
  },
    //自作関数、nameとmailをここで定義し、中身は子供で決める。
  handleAddUser:function(name, mail){
      var url = "/post_user";

      //ajax通信
      request
        .post(url)
        .send({name: name, mail: mail})
        .end(function(err,res){
            if(err){
                alert(res.text);
            }
            var map = JSON.parse(res.text);
            //serverから帰ってくるobjのtext部分をJSON形式に変換して受け取る
            
            //表示値の更新
            this.setState({userData: map});
        }
        .bind(this));
      
  },
  componentDidMount:function(){
    var url = "/get_users";
    
    //ajax通信
    request
      .get(url)
      .query({})
      .end(function(err, res){
        if (err) {
          alert(res.text);
        }
        var map = JSON.parse(res.text);
        //serverから帰ってくるobjのtext部分をJSON形式に変換して受け取る
        
        //表示されている値を更新
        this.setState({userData: map});
      }
      .bind(this));
  },
  render:function(){
    return(
      <div style={{width:"300px"}}>
        <UserForm addUser={this.handleAddUser}/>
        <hr/>
        <UserList userData={this.state.userData}/>
      </div>
    );
  }
});

//UserForm(addUser) <= UserBox
var UserForm = React.createClass({
  propTypes:{
    addUser:React.PropTypes.func.isRequired
  },
    //自作関数
  handleSubmit:function(){
    var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    var mail = ReactDOM.findDOMNode(this.refs.mail).value.trim();
    if (!name){
      return;
    }
    this.props.addUser(name, mail);
      //上で取得したname,mailを引数に渡してaddUserを起動する
    ReactDOM.findDOMNode(this.refs.name).value = "";
    ReactDOM.findDOMNode(this.refs.mail).value = "";
  },
  render:function(){
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <label>名前</label>
              </td>
              <td>
                <input type="text" ref="name"/>
              </td>
            </tr>
            <tr>
              <td>
                <label>メールアドレス</label>
              </td>
              <td>
                <input type="text" ref="mail"/>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{textAlign:"right"}}>
          <button onClick={this.handleSubmit}>追加</button>
        </div>
      </div>
    );
  }
});

//UserList(userData) <= UserBox
var UserList = React.createClass({
  propTypes:{
    userData:React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  render:function(){
    var UserNodes = this.props.userData.map(function(user, index){
      return (
        <User name={user.name} mail={user.mail} key={index}/>
      );
    });
      //user=userData
      //map関数で、連想配列userの全ての値をUserコンポーネントで取得し結合する。
      //indexは、map関数を利用すると自動で取得できるという解釈でよいですか？
    return (
      <table>
        <tbody>
          <tr>
            <th>名前</th>
            <th>メールアドレス</th>
          </tr>
          {UserNodes}
        </tbody>
      </table>
    );
  }
});

//User(name,mail,key) <= UserList
var User = React.createClass({
  propTypes:{
    name: React.PropTypes.string.isRequired,
    mail: React.PropTypes.string
  },
  render:function(){
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.mail}</td>
      </tr>
    );
  }
});



module.exports = Body;