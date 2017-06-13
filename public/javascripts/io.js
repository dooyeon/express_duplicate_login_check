/**
 * Created by donga_dev on 2017-06-12.
 */
var socket = io();

var email = 'mkhong@donga.com';
// var key = location.search.substring(1).substring(4);
var key = '';
var info = {
    email : '',
    key : ''
};
location.search.substring(1).split('&').map(function(valueString){
    var valueArr = valueString.split('=');
    info[valueArr[0]] = valueArr[1];
});
if (info['email']) {
    email = info['email'];
}
if (info['key']) {
    key = info['key'];
}
$(document).ready(function(){
    checkDuppLogin(email, socket);
});

console.log(email, key)


var checkDuppLogin = function(em, sc){

    sc.emit('loginInit', {
        email: em,
        key : key
    });
    sc.on('loginInit', function(data) {
        console.log('loginInit');
        console.log(data);
        console.log(key)
    });
    sc.on('logout', function(next) {
        if (typeof next === "function") {
            next();
        }
        alert('logout');
    })
};