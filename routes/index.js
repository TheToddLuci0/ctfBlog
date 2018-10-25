var express = require('express');
var router = express.Router();
const {Pool, Client} = require('pg');
const pool = new Pool({
    'user': 'ctfbloguser',
    'host': 'localhost',
    'database': 'ctfblog2',
    'password': 'RGBGamingDesktop',
    'port': 5432,
})
const client = new Client({
    'user': 'ctfbloguser',
    'host': 'localhost',
    'database': 'ctfblog2',
    'password': 'RGBGamingDesktop',
    'port': 5432,
})
client.connect()

/* GET home page. */
router.get('/', function(req, res, next) {
    client.query('SELECT * FROM posts ORDER BY id DESC', null, function (sql_err, sql_res) {
      let posts = new Object();
      // Object.assign(posts, {'posts':[]})
      for ( let i of sql_res.rows){
        posts[i.id]= {title: i.title, content: i.content}
      }
      console.log(JSON.stringify(posts));
        res.render('index', {title: 'Express', activeSection: 'home', postList: posts});
    })
});

module.exports = router;
