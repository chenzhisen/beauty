var keythereum = require("keythereum");
var fs = require('fs');

function run() {

    var params = {keyBytes: 32, ivBytes: 16}

    var dk = keythereum.create(params);
    console.log("---------------------------")

    var password = "ltk100.vip";

    var options = {
        kdf: "scrypt",
        cipher: "aes-128-ctr",
        kdfparams: {
            dklen: 32,
            n: 4096,
            r: 8,
            p: 6,
        }
    };
    var keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);
    var addr = keyObject.address

    var star = isStar(addr, keyObject)

    if (star){
        setTimeout(function () {
            run();
        }, 2000)
    }else{
        setTimeout(function () {
            run();
        }, 200)
    }

}


function exportKeystore(keyObject, path) {

    if (!keyObject) {
        console.log("no keyObject")
        return;
    }
    if (!path) {
        console.log("exportToFile")
        keythereum.exportToFile(keyObject);
    } else {
        var json = JSON.stringify(keyObject);
        var outfile = keythereum.generateKeystoreFilename(keyObject.address);

        var outpath = path + "/" + outfile;
        console.log(path);
        console.log(outpath);

        fs.exists(path, function (exists) {
            console.log(exists)
            var retTxt = exists ? retTxt = '存在' : '不存在';
            console.log(path + retTxt)
            if (retTxt == '存在') {
                fs.writeFile(outpath, json, function (err) {
                    if (err) {
                        console.log("error:" + outpath);
                        console.log(err)
                    } else {
                        console.log("success:" + outpath);
                    }
                });
            } else {
                fs.mkdir(path, function (err) {
                    fs.writeFile(outpath, json, function (err) {
                        if (err) {
                            console.log("error:" + outpath);
                            console.log(err)
                        } else {
                            console.log("success:" + outpath);
                        }
                    });
                })
            }
        })

    }
}

regex_mobile_exact = "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$";

function isStar(addr, keyObject) {
    //只对比后11位
    addr = addr.substr(40 - 11, 11)
    var code = "";
    console.log(addr)
    if (addr.match(regex_mobile_exact) != null) {
        code = "phone";
        exportKeystore(keyObject, "/root/ltk100/block/keystore/phone")
    }

    var phone = addr
    var reg =""

    reg = new RegExp('(.)\\1{3}', "g");
    if (phone.match(reg) != null) {

        code = 'AAAA';
        exportKeystore(keyObject, "/root/ltk100/block/keystore/" + code)
    }
    reg = new RegExp('(.)\\1{4}', "g");
    if (phone.match(reg) != null) {

        code = 'AAAAA';
        exportKeystore(keyObject, "/root/ltk100/block/keystore/" + code)
    }
    reg = new RegExp('(.)\\1{5}', "g");
    if (phone.match(reg) != null) {

        code = 'AAAAAA';
        exportKeystore(keyObject, "/root/ltk100/block/keystore/" + code)
    }
    reg = new RegExp('(.)\\1{6}', "g");
    if (phone.match(reg) != null) {

        code = 'AAAAAAA';
        exportKeystore(keyObject, "/root/ltk100/block/keystore/" + code)
    }
    reg = new RegExp('(.)\\1{7}', "g");
    if (phone.match(reg) != null) {

        code = 'AAAAAAAA';
        exportKeystore(keyObject, "/root/ltk100/block/keystore/" + code)
    }

    return code;
}

run();
