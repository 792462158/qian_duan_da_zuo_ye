function message6(){
    window.location.href="register.html";
}

function trip(obj, trip) {
    document.getElementById(obj).innerHTML = "<b>" + trip + "</b>";
}
 
function message7(){
    var uname=getElementById("username").value;
    if (uname.length < 1 || uname.length > 10) {
        trip("name_trip", "账号长度为1-10位!!");
        return false;
    } else {
        trip("name_trip", "OK!!");
        return true; 
    }
}

function message8(){
    var pd=getElementById("password").value;
    if (pd.length < 6) {
        trip("password_trip", "密码要>6位!!");
        return false;
    } else {
        trip("password_trip", "OK!!");
        return true;
    }
}

function message9(){
    if(message7&&message8){
        alert("登录成功!!");
    }else{
        alert("登录失败!!");
    }
}