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
router.get('/', function (req, res, next) {
    res.render('login', {'err': false});
});

router.post('/', function (req, res, next) {
    console.log("BODY: \n" + JSON.stringify(req.body))
    if (!req.body) {
        res.status(401)
        res.render('login', {'err': true})
    } else {
        client.query('SELECT uname FROM users;', null, function (sql_err, sql_res) {
            if (sql_err) {
                console.log(sql_err)
                res.status(401)
                res.render('login', {'err': true, 'mess': sql_err})
            } else {
                let authed = false;
                for (i of sql_res.rows) {
                    if (i.uname === req.body.uname) {
                        authed = true
                        client.query('SELECT * FROM users WHERE uname = \'' + req.body.uname + '\';', null, function (sql_err, sql_res) {
                            if (sql_err) {
                                console.log(sql_err)
                                // console.log('\'SELECT * FROM users WHERE uname = \'' + req.body.uname + '\';\'')
                                res.status(401)
                                res.render('login', {'err': true, 'mess': JSON.stringify(sql_err)})
                            } else {
                                try {
                                    console.log(sql_res.rows[0].password)
                                    if (sql_res.rows[0].password === req.body.password) {
                                        res.render('addpage')
                                    } else {
                                        res.status(401)
                                        console.dir(sql_res + sql_err)
                                        res.render('login', {
                                            'err': true,
                                            'mess': JSON.stringify(sql_res) + "<br>" + JSON.stringify(sql_err)
                                        })
                                    }
                                } catch (e) {
                                    res.status(401)
                                    res.render('login', {
                                        'err': true,
                                        'mess': JSON.stringify(e + "<br>" + JSON.stringify(sql_err) + "<br>" + JSON.stringify(sql_res))
                                    })
                                }
                                // res.render('login', {"mess": JSON.stringify(sql_res) + "\n" + JSON.stringify(sql_res.rows[0])})
                            }
                        })
                    }
                }
                if (!authed) {
                    res.render('login', {'err': true})
                }
            }
        })


    }
})


module.exports = router;
