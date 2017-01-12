var React = require('react');               //React.jsのライブラリをimport
var ReactDOM = require('react-dom');          //RenderやFind用ライブラリ

var ReactRouter = require('react-router');  //画面遷移用ライブラリ
var Router = ReactRouter.Router;            //Routerコンポーネントとして利用する
var Route = ReactRouter.Route;              //Routeコンポーネントとして利用する
var IndexRoute = ReactRouter.IndexRoute;     //IndexRouteコンポーネントとして利用する

var History = ReactRouter.History;          //画面遷移の履歴管理用コンポーネントとして利用する

var Header = require('./views/header.jsx');
var Body = require('./views/body.jsx');       //ポータル画面
var UserBox = require('./views/userbox.jsx'); //遷移後の入力画面
var Footer = require('./views/footer.jsx');



//index:最初の画面/Routeの子供を表示する
var Index = React.createClass({
  render:function(){
    return (
        <div>
            {this.props.children}
        </div>
        
        /* 画面固定の場合
        <div>
            <Header/>
            <div className="main">
                <Body/>
            </div>
          <Footer/>
        </div>
        */
    );
  }
});

//Top:最初の画面の実体/ログインボタンを表示
var Top = React.createClass({
    mixins: [ History ],    
    handleSubmit:function(e){
        e.preventDefault();
        //↑ログイン処理らしい
        
        this.history.pushState(null, '/portal');
        //ヒストリーを取りながら'/portal'に移動する
        //mixinsをすると、Historyのファンクションを使えるようになる。
    },
    //ログインボタンを押したらhandleSubmitを実行する機能
    render:function(){
        return(
            <div>
                <div className="main">
                    <h1>ログイン</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="userid"/>
                        <input placeholder="password"/>
                        <div style={{textAlign:"center"}}>
                            <button type="submit">ログイン</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

//Main
var Main = React.createClass({
    render:function(){
        return(
            <div>
                <Header/>
                <div className="main">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
});


//ルートの定義
//topや初期画面ならTOPコンポーネント、portalならMainコンポーネント
var Routes = (
    <Route path="/" component={Index}>
        <IndexRoute component={Top}/>
        <Route path="/top" component={Top}/>
        <Route path="/portal" component={Main}>
            <IndexRoute component={Body}/>
            <Route path="/userbox" component={UserBox}/>
        </Route>
    </Route>
);


//id='content'の要素にコンポーネント「Index」の挿入をRoutesに変更してレンダリング
//<index/>→<Router>{Routes}</Router>
ReactDOM.render(
  <Router>{Routes}</Router>,
  document.getElementById('content')
);