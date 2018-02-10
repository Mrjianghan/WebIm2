var imgId=null;//二维码id
var userId=null;//用户id
var oldPsd=null;//保存用户旧密码
$(document).ready(function(){
	//获取localstrange里面的用户注册数据
	var dataShow=localStorage.getItem('userinfo');
	console.log(dataShow);
	document.getElementsByTagName("body")[0].onload=function(){
		settops(JSON.parse(dataShow));
	}
	//昵称、头像等信息获取
	var settops = function(obj){
		var main = document.getElementById('app');
		var img = main.getElementsByTagName('img')[1];
		img.src = linkAddressTwo + obj['publicAvatar'];
		document.getElementById('Htype').innerHTML = obj['publicType']==1?'个人号':'企业号';
		document.getElementById('UnameShow').innerHTML = obj['publicName'];
	};

	//修改密码整个表单验证
	function checkUpdatePsd(){
		var primordialError=document.getElementById("primordialError");//原密码错误信息提示
		var newSetPsdError=document.getElementById("newSetPsdError");//新密码错误信息提示
		var surePsdError=document.getElementById("surePsdError");//确认密码错误信息提示
		var imageVdError=document.getElementById("imageVdError");//图片验证码错误信息提示
		if($("#primordialPsd").val()!=""&&primordialError.style.opacity!=1){

		}else{
			$("#submitData").css("backgroundColor","#cbcbcb");		
			$("#submitData").attr("disabled","true");
			return;
		}
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
		// if($("#imageVdInput").val()!=""&&imageVdError.style.opacity!=1){

		// }else{
		// 	$("#submitData").css("backgroundColor","#cbcbcb");				
		// 	$("#submitData").attr("disabled","true");
		// 	return;
		// }
		$("#submitData").css("backgroundColor","#2284ff");
		$("#submitData").removeAttr("disabled");
	}
	// 原密码验证
	$("#primordialPsd").focus(function(){
		$("#primordialPsd").css("border","1px solid #2284ff");
	}) ;
	$("#primordialPsd").on("blur",function(){
		var storage=window.localStorage;
		oldPsd=localStorage.getItem('loginPwd');
		console.log(oldPsd);
		if($("#primordialPsd").val()!=oldPsd){
			$("#primordialPsd").css("border","1px solid #e15f63");
			$("#primordialError").css("opacity","1");		
			$("#primordialWain").css("color","#e15f63");				
		}else{
			$("#primordialPsd").css("border","1px solid #cbcbcb");
			$("#primordialError").css("opacity","0");		
			$("#primordialWain").css("color","#cbcbcb");
		}
		checkUpdatePsd();
	});
	// 新密码验证
	$("#newPSD").focus(function(){
		$("#newPSD").css("border","1px solid #2284ff");
	});
	$("#newPSD").on("blur",function(){
		testPsd(this);
		checkUpdatePsd();
	});
	// 确认密码验证
	$("#surePsd").focus(function(){
		$("#surePsd").css("border","1px solid #2284ff");
	});
	$("#surePsd").on("blur",function(){
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
	// // "看不清楚？验证码显示"
	// $("#replaceImageVd").on("mouseover",function(){
	// 	$("#changeImg").show();
	// });
	// $("#replaceImageVd").on("mouseout",function(){
	// 	$("#changeImg").hide();
	// });
	// //获取图片验证码
	// $("#replaceImageVd").attr("src",linkAddress+'/captcha/build?t='+(new Date().getTime()));
	// //点击更换验证码图片
	// $("#replaceImageVd").on("click",function(){
	// 	this.src = linkAddress+'/captcha/build?t='+(new Date().getTime());
	// });
	// // 图片验证码验证
	// $("#imageVdInput").focus(function(){
	// 	$("#imageVdInput").css("border","1px solid #2284ff")
	// });
	// $("#imageVdInput").on("blur",function(){
	// 	var uodateCode=document.getElementById("imageVdInput").value;
	// 	axios.get(linkAddress+'/captcha/validate.json?captcha='+uodateCode).then(function(res){
	// 		if(res.data.data){
	// 			$("#imageVdError").css("opacity","0");
	// 			$("#imageVdInput").css("border","1px solid #cbcbcb");	
	// 			checkUpdatePsd();		
	// 		}else{
	// 			$("#imageVdError").css("opacity","1");
	// 			$("#imageVdInput").css("border","1px solid #e15f63");
	// 			checkUpdatePsd();
	// 		}
	// 	}).catch(function(error){
	// 		console.log(error);
	// 	});
	// });
	// 提交按钮操作
	$("#submitData").on("click",function(){
		$(this).css("backgroundColor","#cbcbcb");
		$(this).attr("disabled",true);
		axios.post(linkAddress+'/im/user/set/passwd.json?oldpasswd='+$("#primordialPsd").val()+'&passwd='+$("#newPSD").val()+'&newpasswd='+$("#surePsd").val()).then(function(res){
			console.log(res);
			if(res.data.code==2000){
				alert("修改成功跳首页");
				var a=document.createElement("a");
				a.href = 'main.html';//首页跳转
				a.click();
			}else{
				alert(res.data.message);
				$("#submitData").css("backgroundColor","#2284ff");
				$('#submitData').removeAttr("disabled");
			}
		}).catch(function(error){
			console.log(error);
		});
	});
	// 返回按钮
	$("#returnSweepYard").on("click",function(){
		$("#forgetConThree").show();
		$("#forgetConFour").hide();
		axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
			$("#showVd").attr("src",linkAddressTwo+res['data']['data']['path']);
			var preID=JSON.parse(res.data.data.id);
			console.log(preID);
			imgId=preID.id;
		}).catch(function(error){
			console.log(error);
		});
	});

		// //请求二维码接口
	// axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
	// 	$("#showVd").attr("src",linkAddressTwo+res['data']['data']['path']);
	// 	var preID=JSON.parse(res.data.data.id);//将json字符串转换为对象
	// 	imgId=preID.id;
	// }).catch(function(error){
	// 	console.log(error);
	// });
	// //判断是否扫描二维码
	// function sweepYard(startImgId){
	// 	axios.post(linkAddress+'/login.json?qrcode='+startImgId).then(function(res){
	// 		if(res.data.data!=""){
	// 			userId=res.data.data;
	// 			console.log(res);
	// 			if(res.data.code==2000){//登录成功之后进入到下一个页面
	// 				oldPsd=res.data.token;
	// 				$("#forgetConThree").hide();
	// 				$("#forgetConFour").show();
	// 			}else{
	// 				alert(res.data.message);
	// 			}
	// 		}else if(startImgId==imgId){
	// 			setTimeout(sweepYard(startImgId),1000);
	// 		}else{
	// 			console.log('二维码已经更换！');
	// 		}
	// 	}).catch(function(error){
	// 		setTimeout(sweepYard(startImgId),1000);
	// 		console.log(error);
	// 	});
	// }
	// //个人号扫码操作
	// $('#showVd').on('load',function(){
	// 	sweepYard(imgId);
	// });

	//确认密码验证
	function confirm(){
		var passwordInput=document.getElementById("newPSD").value;
		var surePassword=document.getElementById("surePsd").value;
		if (surePassword!=passwordInput){
			$("#surePsdError").css("opacity","1");
			$("#surePsd").css("border","1px solid #e15f63");
			$("#surePsdWain").css("color","#e15f63");
		}else{
			$("#surePsdError").css("opacity","0");
			$("#surePsd").css("border","1px solid #cbcbcb");
			$("#surePsdWain").css("color","#cbcbcb");
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
			$("#newSetPsdError").css("opacity","1");
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
});
