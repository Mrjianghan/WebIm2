var okVd=document.getElementById("okVd");
var emailTest=document.getElementById("emailTest");
// 忘记密码01

//忘记密码第一步整个表单验证
function checkForgetPsd(){
	if($("#forEmail").val()!=""&&emailTest.style.opacity!=1){

	}else{
		$("#btnNext").attr("disabled","true");
		$("#btnNext").css("backgroundColor","#cbcbcb");
		return;
	}
	if($("#forgetVdShow").val()!=""&&okVd.style.opacity!=1){

	}else{
		$("#btnNext").attr("disabled","true");
		$("#btnNext").css("backgroundColor","#cbcbcb");		
		return;
	}			
	$("#btnNext").css("backgroundColor","#2284ff");
	$("#btnNext").removeAttr("disabled");	
}
// 邮箱
$("#forEmail").focus(function(){
	$("#forEmail").css("border","1px solid #2284ff");
});
$("#forEmail").blur(function(){
	testEmail();
	checkForgetPsd();
});
//获取验证码
$("#imgAuthcode").attr("src",linkAddress+'/captcha/build?t='+(new Date().getTime()));
$("#forgetVdShow").focus(function(){
	$("#relPos").css("border","1px solid #2284ff");
});
// 失去焦点时判断验证码是否正确
$("#forgetVdShow").blur(function(){
	var forgetVdShowValue=$("#forgetVdShow").val();
	if(forgetVdShowValue.length==4){
		axios.get(linkAddress+'/captcha/validate.json?captcha='+forgetVdShowValue).then(function(res){
			console.log(res);
			if(res.data.data==true){
				okVd.style.opacity=0;
				$("#relPos").css("border","1px solid #cbcbcb");	
				checkForgetPsd();						
			}else{
				okVd.style.opacity=1;
				$("#relPos").css("border","1px solid #e15f63");	
				checkForgetPsd();	
			}
		}).catch(function(error){
			console.log(error);
		});
	}
	if(forgetVdShowValue.length!=4){
		okVd.style.opacity=1;
		$("#relPos").css("border","1px solid #e15f63");
	}

});
// 验证码“看不清楚？换一张”显示与隐藏
$("#hoverShow").on("mouseover",function(){
	$("#changeImg").css("display","block");
});
$("#hoverShow").on("mouseout",function(){
	$("#changeImg").css("display","none");
});
$("#imgAuthcode").on("click",function(){
	this.src=linkAddress+'/captcha/build?t='+(new Date().getTime());
});
// “下一步”按钮点击
$("#btnNext").on("click",function(){
	console.log($("#forEmail").val());
	console.log($("#forgetVdShow").val());
	// axios.post().then(function(res){

	// }).catch(function(error){

	// });
	//请求接口成功后跳转页面
	$("#forgetPsdOne").hide();
	$("#forgetPsdTwo").show();
	
});
// 忘记密码02

//"前往邮箱"按钮点击
$("#goEmailAdd").on("click",function(){
	emailShow();
});
// 邮箱跳转到登录页方法封装
function emailShow(){
	var _mail = $("#forEmail").val().split('@')[1];    //获取邮箱域
	console.log(_mail);
	var hash = {
	    'qq.com': 'http://mail.qq.com',
	    'foxmail.com': 'http://www.foxmail.com',
	    'sina.com': 'http://mail.sina.com.cn',
	    '163.com': 'http://mail.163.com',
	    '126.com': 'http://mail.126.com',
	    'sohu.com': 'http://mail.sohu.com/',
	    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
	    'yahoo.cn': 'http://mail.cn.yahoo.com/',
	    // ----------------分割线-----------------
	    'yeah.net': 'http://www.yeah.net/',
	    'tom.com': 'http://mail.tom.com/',
	    'gmail.com': 'http://mail.google.com',
	    'sogou.com': 'http://mail.sogou.com/',
	    '139.com': 'http://mail.10086.cn/',
	    'hotmail.com': 'http://www.hotmail.com',
	    'live.com': 'http://login.live.com/',
	    'live.cn': 'http://login.live.cn/',
	    'live.com.cn': 'http://login.live.com.cn',
	    '189.com': 'http://webmail16.189.cn/webmail/',
	    'eyou.com': 'http://www.eyou.com/',
	    '21cn.com': 'http://mail.21cn.com/',
	    '188.com': 'http://www.188.com/',
	    'outlook.com': 'http://www.outlook.com'
	}
	for (var j in hash){
	    if(j == _mail){
	        $("#goEmailAdd").attr("href", hash[_mail]);    //替换邮箱链接
	    }
	}
	if (hash[_mail]) {
		// alert(1);
	}
}
//对电子邮件的验证
var tempValue=null;
function testEmail(){
    var temp = document.getElementById("forEmail");
    tempValue=temp.value;
    var myreg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    var _mail = $("#forEmail").val().split('@')[1];    //获取邮箱域
    if(!myreg.test(temp.value)){//验证邮箱格式是否正确
        $("#emailTest").css("opacity","1");
		$("#forEmail").css("border","1px solid #e15f63");
        // alert(_mail);
    }else if(_mail=="qq.com"||_mail=="foxmail.com"||_mail=="sina.com"||_mail=="163.com"||_mail=="126.com"||_mail=="sohu.com"||_mail=="yahoo.com"||_mail=="yahoo.cn"){//邮箱限制
        $("#emailTest").css("opacity","0");
		$("#forEmail").css("border","1px solid #cbcbcb");
    }
}