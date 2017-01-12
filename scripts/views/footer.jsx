var React = require('react');

//定義
var Footer = React.createClass({
  render: function(){
    return (
        <footer style={{textAlign: "center"}}>
            <hr/>
            <span>footerです</span>
        </footer>
    );
  }
});

module.exports = Footer;