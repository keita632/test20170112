var React = require('react');
var ReactDOM = require('react-dom'); //findDOMNodeのため必須
var request = require('superagent'); //ajax通信を実現
//var UserBox = require('./userbox.jsx');

//Body <= index.js
var Body = React.createClass({
  render: function(){
    return (
        <h1>ポータル画面(bodyコンポーネント)</h1>
    );
  }
});

//<UserBox/>

module.exports = Body;