const loginPg = {
    htmlTt: '登录 | Login',
    Tt: 'Log In Account',
    input: '<div class="input" ks-tag="left" ks-text="Your username"><input id="usrname" value placeholder="Username" oninput="value=this.value.replace(/[^\\w_]/g,&apos;&apos;);"/></div></div><div class="input" ks-tag="left" ks-text="Your password"><input id="passwd" value placeholder="Password" oninput="value=this.value.replace(/[^\\w_]/g,&apos;&apos;);"/></div><div class="cBox"><input type="checkbox" id="rmberPw"><span style="">Remember me</span></div>',
    btnL: 'Register',
    btnR: 'Sign in!',
}

const regPg = {
    htmlTt: '注册 | Register',
    Tt: "Register Account",
    input: '<div class="input" ks-tag="left" ks-text="Min 6 numbers or letters"><input id="usrname" value placeholder="Username" oninput="value=this.value.replace(/[^\\w_]/g,&apos;&apos;);"/></div><div class="input" ks-tag="left" ks-text="8-16 symbols, numbers & letters"><input id="passwd" value placeholder="Password" oninput="value=this.value.replace(/[^\\w_]/g,&apos;&apos;);"/></div><div class="input" ks-tag="left" ks-text="Your E-mail"><input id="email" value placeholder="E-mail"/></div>',
    btnL: 'Login',
    btnR: 'Sign up!',
}


function counter() {
    let index = 0;
    return (function() {return ++index;})
}


function chDom(page) {
    $('.loginTt').html(page.Tt);
    $('#main').html(page.input);
    $('#btnL').html(page.btnL);
    $('#btnR').html(page.btnR);
    getHt();
}

function chPage(page) {
    async function nyans() {
        document.getElementById("logBox").style.animation = "logout 2s";
        return;
    }
    nyans().then(function() {
        setTimeout(() => {
            $('title').html(page.htmlTt);
            chDom(page);
            errInfo("none");
        }, 1000);
    });
    setTimeout(function() {document.getElementById("logBox").style.animation = ""}, 1500);
}



function vfySignin() {
    var inputVlu = document.getElementsByTagName("input");
    let account = true;
    if (/^[ ]*$/.test(inputVlu[0].value)) {errInfo("your username");account = false}
    else if (/^[ ]*$/.test(inputVlu[1].value)) {errInfo("a password");account = false}
    if (account) {
        let usr = {};
        usr.usrname = inputVlu[0].value;
        usr.passwd = inputVlu[1].value;
        usr.rm = $('#rm').get(0).checked;
        //console.log(JSON.stringify(usr));
        errInfo("none");
        postSignin(usr);
        inputVlu = account = usr = null;
    }
}

function vfySignup() {
    var inputVlu = document.getElementsByTagName("input");
    if (/^[ ]*$/.test(inputVlu[0].value)) {errInfo("your username")} 
    else if (inputVlu[0].value.length < 6) {errInfo("at least 6 letters username")}
    else if (/^[ ]*$/.test(inputVlu[1].value)) {errInfo("a password.")}
    else if (inputVlu[1].value.length < 8 && inputVlu[1].value.length > 16) {}
    else if (/^[ ]*$/.test(inputVlu[2].value)) {errInfo("your email address")} 
    else if (/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/.test(inputVlu[2].value) === false) {errInfo("a correct email")}
    else {
        let regIf = {};
        regIf.usrname = inputVlu[0].value;
        regIf.passwd = inputVlu[1].value;
        regIf.email = inputVlu[2].value;
        console.log(inputVlu[0].value.length);
        postReg(regIf);
    }
}



function errInfo(err) {
    if (err === "none") {$('.err').remove()}
    else{$('#err').html('<span class="err">⚠ &nbsp;Please enter ' + err + '.</span>');}
}






function postSignin(usr) {
    //JSON.stringify(usr);
    xRqst = new XMLHttpRequest();
    xRqst.open('GET', 'http://127.0.0.1:8000/json', true);
    xRqst.send();
    xRqst.onreadystatechange = function() {
        if(xRqst.readyState === 4) {
            if(xRqst.status >= 200 && xRqst.status < 300) {
                let acc = JSON.parse(xRqst.response);
                if(acc.usrname === usr.usrname) {
                    if(acc.passwd === usr.passwd) {
                        $('#err').html('<span class="err">Login success!</span>')
                    } else {$('#err').html('<span class="err">⚠ &nbsp;incorrect password.</span>')}
                } else {$('#err').html('<span class="err">⚠ &nbsp;User is not exists.</span>')}
            }
        }
    }
}

function postReg(usr){
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/server",
        data: JSON.stringify(usr),
        datatype: "html",
        beforeSend:function(){$("#msg").html("logining");},//在请求之前调用的函数
        success:function(data){//成功返回之后调用的函数  
        $("#msg").html(decodeURI(data));       //调用执行后调用的函数     
            }   ,
        complete: function(XMLHttpRequest, textStatus){
            alert(XMLHttpRequest.responseText);
            alert(textStatus);
            //HideLoading();
        },
        error: function(){//调用出错执行的函数
            //请求出错处理
        }         
    });
}
