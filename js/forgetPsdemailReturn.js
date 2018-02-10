var imgId=null;//二维码id
var userId=null;//用户id
// //获取localstrange里面的用户注册数据
// var dataShow=localStorage.getItem('userinfo');
// console.log(dataShow);
// document.getElementsByTagName("body")[0].onload=function(){
// 	settops(JSON.parse(dataShow));
// }
// //昵称、头像等信息获取
// var settops = function(obj){
// 	var main = document.getElementById('app');
// 	var img = main.getElementsByTagName('img')[1];
// 	img.src = linkAddressTwo + obj['publicAvatar'];
// 	document.getElementById('Htype').innerHTML = obj['publicType']==1?'个人号':'企业号';
// 	document.getElementById('UnameShow').innerHTML = obj['publicName'];
// };
//请求二维码接口
axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
	$("#showVd").attr("src",linkAddressTwo+res['data']['data']['path']);
	var preID=JSON.parse(res.data.data.id);
	imgId=preID.id;
}).catch(function(error){
	console.log(error);
});
//判断是否扫描二维码
function sweepYard(startImgId){
	axios.post(linkAddress+'/login.json?qrcode='+startImgId).then(function(res){	
		if(res.data.data!=""){
			userId=res.data.data;
			console.log(res.data.data);
			if(res.data.code==2000){//登录成功之后进入到下一个页面
				$("#forgetConThree").hide();
				$("#forgetConFour").show();
			}else{
				alert(res.data.message);
			}
		}else if(startImgId==imgId){
			setTimeout(sweepYard(startImgId),1000);
		}else{
			console.log('二维码已经更换！');
		}
	}).catch(function(error){
		setTimeout(sweepYard(startImgId),1000);
		console.log(error);
	});
}
$('#showVd').on('load',function(){//个人号扫码操作
	sweepYard(imgId);
});
// //点击更换二维码
// $("#showVd").on("click",function(){
// 	axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
// 		$("#showVd").attr("src",linkAddressTwo+res['data']['data']['path']);
// 		var preID=JSON.parse(res.data.data.id);
// 		console.log(preID);
// 		imgId=preID.id;
// 	}).catch(function(error){
// 		console.log(error);
// 	});
// });
// 忘记密码验证

// 忘记密码整个表单验证
function checkUpdatePsd(){
	$("#submitData").css("backgroundColor","#cbcbcb");
	$("#submitData").attr("disabled",true);	
	var newSetPsdError=document.getElementById("newSetPsdError");//新密码错误信息提示
	var surePsdError=document.getElementById("surePsdError");//确认密码错误信息提示
	var imageVdError=document.getElementById("imageVdError");//图片验证码错误信息提示
	if($("#newPSD").val()!=""&&newSetPsdError.style.opacity!=1){

	}else{
		$("#submitData").css("backgroundColor","#cbcbcb");				
		$("#submitData").attr("disabled","true");
		return;
	}
	if($("#surePsd").val()!=""&&surePsdError.style.opacity!=1){

	}else{
		$("#submitData").css("backgroundColor","#cbcbcb");				
		$("#submitData").attr("disabled","true");
		return;
	}
	if($("#imageVdInput").val()!=""&&imageVdError.style.opacity!=1){

	}else{
		$("#submitData").css("backgroundColor","#cbcbcb");				
		$("#submitData").attr("disabled","true");
		return;
	}
	$("#submitData").css("backgroundColor","#2284ff");
	$("#submitData").removeAttr("disabled");	
}
// 新密码验证
$("#newPSD").focus(function(){
	$("#newPSD").css("border","1px solid #2284ff");
});
$("#newPSD").blur(function(){
	testPsd(this);
	checkUpdatePsd();
});
// 确认密码验证
$("#surePsd").focus(function(){
	$("#surePsd").css("border","1px solid #2284ff");
});
$("#surePsd").blur(function(){
	confirm();
	checkUpdatePsd();
});
// 密码眼睛点击显示密码
$("#newSetPsdShow").on("click",function(){
	var setPsd=document.getElementById("newPSD");
	var state = this.getAttribute("state");
	if (state==="off") {
		setPsd.setAttribute("type", "text");
		this.setAttribute("state", "on");
		this.setAttribute("class","visibility");
	}else{
		setPsd.setAttribute("type", "password");
		this.setAttribute("state", "off");
		this.setAttribute("class","invisibility");
	}
});
$("#surePsdShow").on("click",function(){
	var setPsd=document.getElementById("surePsd");
	var state = this.getAttribute("state");
	if (state==="off") {
		setPsd.setAttribute("type", "text");
		this.setAttribute("state", "on");
		this.setAttribute("class","visibility");
	}else{
		setPsd.setAttribute("type", "password");
		this.setAttribute("state", "off");
		this.setAttribute("class","invisibility");
	}
});
// "看不清楚？验证码显示"
$("#replaceImageVd").on("mouseover",function(){
	$("#changeImg").show();
});
$("#replaceImageVd").on("mouseout",function(){
	$("#changeImg").hide();
});
$("#replaceImageVd").on("click",function(){//点击更换验证码图片
	this.src = linkAddress+'/captcha/build?t='+(new Date().getTime());
});
// 图片验证码验证
$("#replaceImageVd").attr("src",linkAddress+'/captcha/build?t='+(new Date().getTime()));
$("#imageVdInput").focus(function(){
	$("#imageVdInput").css("border","1px solid #2284ff")
});
$("#imageVdInput").blur(function(){//图片验证码验证
	var uodateCode=document.getElementById("imageVdInput").value;
	axios.get(linkAddress+'/captcha/validate.json?captcha='+uodateCode).then(function(res){
		if(res.data.data){
			$("#imageVdError").css("opacity","0");
			$("#imageVdInput").css("border","1px solid #cbcbcb");			
		}else{
			$("#imageVdError").css("opacity","1");
			$("#imageVdInput").css("border","1px solid #e15f63");
		}
	}).catch(function(error){
		console.log(error);
	});
	checkUpdatePsd();
});
// 提交按钮操作
$("#submitData").on("click",function(){
    axios.post(linkAddress+'').then(function(res){
		console.log(res);
		// if(){
		// 	var a=document.createElement("a");
		// 	a.href="index.html";//跳转登录页
		// 	a.click();
		// }
	}).catch(function(error){
		console.log(error);
	});
});
//确认密码验证
function confirm(){
	var passwordInput=document.getElementById("newPSD").value;
	var surePassword=document.getElementById("surePsd").value;
	if (surePassword!=passwordInput) {
		$("#surePsdError").css("opacity","1");
		$("#surePsd").css("border","1px solid #e15f63");
		$("#surePsdWain").css("color","#e15f63");
		return false;
	}else {
		$("#surePsdError").css("opacity","0");
		$("#surePsd").css("border","1px solid #cbcbcb");
		$("#surePsdWain").css("color","#cbcbcb");
		return true;
	}
}
// 对用户输入密码的验证
function testPsd(obj){//验证用户输入密码是否符合规则
	var showMode=document.getElementById("a");
	showMode.innerHTML= checkpassword(obj.value);
	if (showMode.innerHTML==0){//密码不足6位
    	$("#newSetPsdError").css("opacity","1");
		$("#newPSD").css("border","1px solid #e15f63");
		$("#newSetPsdWain").css("color","#e15f63"); 
	}
	if (showMode.innerHTML==1||showMode.innerHTML==5){//密码没有组合
    	// $("#newSetPsdError").css("opacity","1");
		$("#newPSD").css("border","1px solid #e15f63");
		$("#newSetPsdWain").css("color","#e15f63");
	}
	if (showMode.innerHTML==2||showMode.innerHTML==3||showMode.innerHTML==4){//组合正确
    	$("#newSetPsdError").css("opacity","0");
		$("#newPSD").css("border","1px solid #cbcbcb");
		$("#newSetPsdWain").css("color","#cbcbcb")
	}
}
//判断用户所输入密码长度、组合方式 
function checkpassword(content){
	var mode = 0;  
    if(content.length<6){
    	return mode = 0;
    }else if (content.length>20){
    	return mode = 5; 
    }
    if(/\d/.test(content)){  
        mode++;  
    }  
    if(/[a-z]/.test(content)){  
        mode++;  
    }   
    if(/[A-Z]/.test(content)){  
        mode++;  
    }  
    if(/\W/.test(content)){  
        mode++;  
    }
    //因为在判断后不能确定是否仍然符合下面的if语句，所以不能马上将mode返回，  
    //所以通过switch语句返回mode值(break可省略)  
    switch(mode){
        case 1:return 1;  
        case 2:return 2;  
        case 3:return 3;  
        case 4:return 4;  
    }
}
