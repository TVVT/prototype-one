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

            if (req.headers['user-agent'].indexOf("windows") > 0) {
                exec("mkdir public/prototypes/" + path.basename(req.files.file.name, '.zip') + " && python uploads/myzip -x -d public/prototypes/" + path.basename(req.files.file.name, '.zip') + " uploads/" + req.files.file.name + " && rm -rf public/prototypes/" + path.basename(req.files.file.name, '.zip') + "/__MACOSX*", function(err, stdout, stderr) {
                    if (err) {
                        throw err;
                    } else {
                        exec("rm " + req.files.file.path);
                        fs.readdir(__dirname + '/../public/prototypes/' + path.basename(req.files.file.name, '.zip'), function(err, list) {
                            console.log(list);
                            res.send({
                                res_code: 1,
                                path: '/prototypes/' + path.basename(req.files.file.name, '.zip'),
                                list: list
                            });
                        })
                    }
                });
            } else {
                exec("unzip " + req.files.file.path + " -d public/prototypes/" + path.basename(req.files.file.name, '.zip') + " && rm -rf public/prototypes/" + path.basename(req.files.file.name, '.zip') + "/__MACOSX*", function(err, stdout, stderr) {
                    if (err) {
                        throw err;
                    } else {
                        exec("rm " + req.files.file.path);
                        fs.readdir(__dirname + '/../public/prototypes/' + path.basename(req.files.file.name, '.zip'), function(err, list) {
                            console.log(list);
                            res.send({
                                res_code: 1,
                                path: '/prototypes/' + path.basename(req.files.file.name, '.zip'),
                                list: list
                            });
                        })
                    }
                })
            }


        } else {
            res.send("上传文件格式不正确！");
        }
    } else {
        res.send("上传文件格式不正确！");
    }
})

router.get('/list', function(req, res) {

    var realPath = path.join(__dirname, '../public/prototypes/');

    fs.readdir(realPath, function(err, files) {
        if (err) {
            res.send({
                res_code: 0
            })
            throw err;
        } else {
            res.send({
                res_code: 1,
                list: files
            })
        }
    })
})


//解压

function getGzipped(url, callback) {
    // buffer to store the streamed decompression
    var buffer = [];
    console.log(url)
    http.get(url, function(res) {
        console.log(res)
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createUnzip();
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            callback(null, buffer.join(""));

        }).on("error", function(e) {
            callback(e);
        })
    }).on('error', function(e) {
        callback(e)
    });
}

module.exports = router;
