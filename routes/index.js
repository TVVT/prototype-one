var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/upload', function(req, res) {
    if (req.files.file) {
        if (req.files.file.extension == "zip") {
           exec("unzip "+req.files.file.path+" -d public/prototypes/"+path.basename(req.files.file.name,'.zip'),function(err,stdout, stderr){
                if (err) {
                    throw err;
                }else{
                    res.send({
                        res_code:1,
                        path:'/prototypes/'+path.basename(req.files.file.name,'.zip')
                    });
                    exec("rm -rf "+req.files.file.path);
                }
           })
        } else {
            res.send("上传文件格式不正确！");
        }
    } else {
        res.send("上传文件格式不正确！");
    }
})

router.get('/list', function(req, res) {

    var realPath = path.join(__dirname,'../public/prototypes/');
    console.log(realPath);

    fs.readdir(realPath, function(err,files){
        if (err) {
            res.send({
                res_code:0
            })
            throw err;
        }else{
            res.send({
                res_code:1,
                list:files
            })
        }
    })
})

module.exports = router;
