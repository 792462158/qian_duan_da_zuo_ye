function trip(obj, trip) {
    document.getElementById(obj).innerHTML = "<b>" + trip + "</b>";
}
 
function message1(){
    var uname = document.getElementById("username").value;
    if (uname.length < 1 || uname.length > 10) {
        trip("name_trip", "账号长度为1-10位!!");
        return false;
    } else {
        trip("name_trip", "OK!!");
        return true; 
    }
}

function message2(){
    var userPass = document.getElementById("password").value;
    if (userPass.length < 6) {
        trip("password_trip", "密码要>6位!!");
        return false;
    } else {
        trip("password_trip", "OK!!");
        return true;
    }
}

function message3(){
    var spass = document.getElementById("spassword").value;
    var userPass = document.getElementById("password").value;
    if (userPass != spass) {
        trip("spassword_trip", "两次密码不一致!!");
        return false;
    }else{
        trip("spassword_trip","OK!!");
        return true;
    }
}

function message4(){
    var uemail = document.getElementById("emial").value;
    var emreg =/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;;
    if (emreg.test(uemail)==false) {
        trip("emial_trip", "邮箱不合法!!");
        return false;
    } else {
        trip("emial_trip", "OK!!");
        return true;
    }
}

function message5()
{
    var uph=document.getElementById("phone").value;
    var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    if(reg.test(uph)==false)
    {
       trip("phone_trip","输入的手机号不合法");
        return false;
    }else{
        trip("phone_trip","OK!!");
        return true;
    }
}

function checkForm(){
    if(message1()&&message2&&message3&&message4&&message5())
    {
        alert("注册成功");
        return true;
    }else{
        alert("注册失败!!有输入不合法");
        return false;
    }    
}

