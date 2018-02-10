$(document).ready(function(){
	// 填写电子邮箱时的样式修改
	$("#emailText").focus(function(){
		$("#emailText").css("border","1px solid #2284ff");
	});
	$("#emailText").on("input",function(){
		testEmail();
		chaike();
	});
    //电子邮箱验证方法
    var tempValue=null;
	function testEmail(){
	    var temp = document.getElementById("emailText");
	    tempValue=temp.value;
	    var myreg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	    var _mail = $("#emailText").val().split('@')[1];    //获取邮箱域
	    if(!myreg.test(temp.value)){//验证邮箱格式是否正确
	        $("#emailError").css("opacity","1");
			$("#emailText").css("border","1px solid #e15f63");
			$("#unAble").css("color","#e15f63");
			$("#nextGo").css("backgroundColor","#cbcbcb");
			$("#nextGo").unbind();//移除所有事件
	        return false;
	    }else if(_mail=="qq.com"||_mail=="foxmail.com"||_mail=="sina.com"||_mail=="163.com"||_mail=="126.com"||_mail=="sohu.com"||_mail=="yahoo.com"||_mail=="yahoo.cn"){//邮箱限制
	        $("#emailError").css("opacity","0");
			$("#emailText").css("border","1px solid #cbcbcb");
	    	$("#unAble").css("color","#cbcbcb");
	        return true;
	    }else{
	        $("#emailError").css("opacity","1");			
			$("#unAble").css("color","#e15f63");
			$("#nextGo").attr("disabled",true);
			$("#nextGo").css("backgroundColor","#cbcbcb")
		}
		chaike();
	}
	//验证码获取
	$("#enrollOneAuthcode").attr("src",linkAddress+'/captcha/build?t='+(new Date().getTime()));
	$("#enrollOneAuthcode").click(function(){//点击更换验证码
		this.src = linkAddress+'/captcha/build?t='+(new Date().getTime());
		$("#vdpsd").css('border', '1px solid #e15f63');
			$("#vdpsdError").css("opacity","1");
			$("#nextGo").attr("disabled",true);
			$("#nextGo").css("backgroundColor","#cbcbcb");
			chaike();
	});
	$("#vbdShow").on("mouseover",function(){//"看不清楚"显示
		$("#noSeeClearly").show();
	});
	$("#vbdShow").on("mouseout",function(){//"看不清楚"隐藏
		$("#noSeeClearly").hide();
	});
	// 验证码验证
	$("#vdpsd").focus(function(){
		$("#vdpsd").css("border","1px solid #2284ff");
	});
	$("#vdpsd").on('input',function(){//验证码失去焦点判断是否正确
		var vd=$("#vdpsd").val();
		if(vd.length==4){
			axios.get(linkAddress+'/captcha/validate.json?captcha='+vd).then(function(res){
				console.log(res);
				if(res.data.data==true){
					$("#vdpsd").css('border', '1px solid #cbcbcb');
					$("#vdpsdError").css("opacity","0");
					$("#nextGo").attr("disabled",false);				
				}else{
					$("#vdpsd").css('border', '1px solid #e15f63');
					$("#vdpsdError").css("opacity","1");
					$("#nextGo").attr("disabled",true);
					$("#nextGo").css("backgroundColor","#cbcbcb");
				}
			}).catch(function(error){
				console.log(error);
			});
		}else{
			$("#vdpsd").css('border', '1px solid #e15f63');
			$("#vdpsdError").css("opacity","1");
			$("#nextGo").attr("disabled",true);
			$("#nextGo").css("backgroundColor","#cbcbcb");
		}
		chaike();
	});
	// "阅读协议"按钮更替
	var orNotSelect=document.getElementById("orNotSelect");//阅读按钮	
	$("#orNotSelect").on("click",function(){
		var haveRead=document.getElementById("haveRead");//接受协议	
		if(haveRead.checked){
			orNotSelect.setAttribute("class", "orNotSelect selectOver");		
			chaike();
		}else{
			orNotSelect.setAttribute("class", "orNotSelect");		
			chaike();			
		}
	});
	var chaike = function(){	
		var emailError=document.getElementById("emailError");//邮箱错误警告
		var vdpsdError=document.getElementById("vdpsdError");//验证码错误警告
		var emailValue=document.getElementById("emailText").value;//邮箱值
		var vdValue=document.getElementById("vdpsd").value;//验证码值
		var haveRead=document.getElementById("haveRead");//接受协议	
		// localStorage记住邮箱、验证码
		if(!window.localStorage){
			alert("浏览器不支持localstorage,请升级您的浏览器以来达到更好的用户体验。");
			return false;
		}else{
			var storage=window.localStorage;
			var emailSave = emailValue; //获取邮箱信息 
			localStorage.setItem("email",emailSave);
		}
		if(haveRead.checked&&emailValue!=""&&vdValue!=""&&emailError.style.opacity!=1&&vdpsdError.style.opacity!=1){
			// orNotSelect.setAttribute("class", "orNotSelect selectOver");		
			$("#nextGo").attr("disabled",false);
			$("#nextGo").css("backgroundColor","#2284ff");
			// 基本信息--下一步按钮点击
			$("#nextGo").on("click",function(){
				$(this).css("backgroundColor","#cbcbcb");
				$(this).attr("disabled",true);
				axios.post(linkAddress+"/im/public/user/insert.json?email="+emailValue+"&captcha="+vdValue).then(function(res){
					console.log(emailValue);
					console.log(vdValue);
					console.log(res);
					if(res.data.code==2000){
						$("#basic").hide();
						$("#activation").show();
						var titleR=document.getElementById("titleR");
						titleR.innerHTML="";
						// 前往邮箱激活页面邮箱显示
						var str = tempValue.substring(0,2);
						var i=str[1]=='@'?1:2;
						for(;i<tempValue.length;i++){
							// console.log(tempValue[i]);
							if(tempValue[i]!='@'){
								str += '*';
							}else{
								break;
							}
						}
						str+=tempValue.substring(str[1]=='@'?2:i,tempValue.length);
						$("#emailShow").html(str);
						//请求发送邮件接口
						// 1170493810@qq.com
						axios.post(linkAddress+'/im/public/user/send/out.json?email='+emailValue).then(function(res){
							console.log(res);
						}).catch(function(error){
							console.log(error)
						});
					}else{
						alert(res.data.message);
						$("#nextGo").css("backgroundColor","#2284ff");
						$('#nextGo').removeAttr("disabled");		
					}
				}).catch(function(error){
					console.log(error);
					alert("网络延迟，请重新填写信息！");
				});
			});
		}else{
			$("#nextGo").attr("disabled",true);					
			// orNotSelect.setAttribute("class", "orNotSelect");
			$("#nextGo").css("backgroundColor","#cbcbcb");
		}
	}
	// 前往邮箱激活按钮点击
	$("#goEmailAdd").on("click",function(){
		emailShow();
	});
	// 邮箱跳转到登录页方法封装
	function emailShow(){
		var _mail = $("#emailText").val().split('@')[1];    //获取邮箱域
		console.log(_mail);
		var hash = {
			'qq.com': 'http://mail.qq.com',
			'foxmail.com': 'http://www.foxmail.com',
			'sina.com': 'http://mail.sina.com.cn',
			'163.com': 'http://mail.163.com',
			'126.com': 'http://mail.126.com',
			'sohu.com': 'http://mail.sohu.com/',
			'yahoo.com': 'https://cn.overview.mail.yahoo.com/',
			'yahoo.cn': 'https://cn.overview.mail.yahoo.com/',

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
});
	// 获取保存的信息
	function getSaveInformation(){
		var storage=window.localStorage;
		var strEmail = localStorage.getItem('email');		
	}
	// // 填写密码时的样式修改
	// $("#setPsd").focus(function(){
	// 	$("#setPsd").css("border","1px solid #2284ff");
	// });
	// $("#setPsd").blur(function(){
	// 	testPsd(this);
	// });
	// // 密码眼睛点击显示密码
	// $("#invisibility").on("click",function(){
	// 	var setPsd=document.getElementById("setPsd");
	// 	var state = this.getAttribute("state");
	// 	if (state==="off") {
	// 		setPsd.setAttribute("type", "text");
	// 		this.setAttribute("state", "on");
	// 		this.setAttribute("class","visibility");
	// 	}else{
	// 		setPsd.setAttribute("type", "password");
	// 		this.setAttribute("state", "off");
	// 		this.setAttribute("class","invisibility");
	// 	}
	// });
	// // 对用户输入密码的验证
	// function testPsd(obj){//验证用户输入密码是否符合规则
	// 	var showMode=document.getElementById("a");
	// 	showMode.innerHTML= checkpassword(obj.value);
	// 	if (showMode.innerHTML==0){//密码不足6位
	//     	$("#psdError").css("opacity","1");
	// 		$("#setPsd").css("border","1px solid #e15f63");
	// 		$("#NoCombination").css("color","#e15f63");
	//     	return false;   
	// 	}
	// 	if (showMode.innerHTML==1||showMode.innerHTML==5){//密码没有组合
	//     	$("#psdError").css("opacity","0");
	// 		$("#setPsd").css("border","1px solid #e15f63");
	// 		$("#NoCombination").css("color","#e15f63");
	// 		return false;
	// 	}
	// 	if (showMode.innerHTML==2||showMode.innerHTML==3||showMode.innerHTML==4){//组合正确
	//     	$("#psdError").css("opacity","0");
	// 		$("#setPsd").css("border","1px solid #cbcbcb");
	// 		$("#NoCombination").css("color","#cbcbcb")
	// 		return true;
	// 	}
	// }
	// //判断用户所输入密码长度、组合方式 
	// function checkpassword(content){
	// 	var mode = 0;  
	//     if(content.length<6){
	//     	return mode = 0;
	//     }else if (content.length>20){
	//     	return mode = 5; 
	//     }
	//     if(/\d/.test(content)){  
	//         mode++;  
	//     }  
	//     if(/[a-z]/.test(content)){  
	//         mode++;  
	//     }   
	//     if(/[A-Z]/.test(content)){  
	//         mode++;  
	//     }  
	//     if(/\W/.test(content)){  
	//         mode++;  
	//     }
	//     //因为在判断后不能确定是否仍然符合下面的if语句，所以不能马上将mode返回，  
	//     switch(mode){
	//         case 1:return 1;  
	//         case 2:return 2;  
	//         case 3:return 3;  
	//         case 4:return 4;  
	//     }
	// }
	// 确认密码验证
	// $("#surePsd").focus(function(){
	// 	$("#surePsd").css("border","1px solid #2284ff");
	// });
	// $("#surePsd").blur(function(){
	// 	confirm();
	// });
	// $("#showOrhide").on("click",function(){//密码眼睛显示密码
	// 	var confirmPsd=document.getElementById("surePsd");
	// 	var state = this.getAttribute("state");
	// 	if (state==="off") {
	// 		confirmPsd.setAttribute("type", "text");
	// 		this.setAttribute("state", "on");
	// 		this.setAttribute("class","visibility");
	// 	}else{
	// 		confirmPsd.setAttribute("type", "password");
	// 		this.setAttribute("state", "off");
	// 		this.setAttribute("class","invisibility");
	// 	}
	// });
	// function confirm(){//确认密码验证
	// 	var passwordInput=document.getElementById("setPsd").value;
	// 	var surePassword=document.getElementById("surePsd").value;
	// 	console.log(passwordInput);
	// 	console.log(surePassword);
	// 	if (surePassword!=passwordInput) {
	// 		$("#notTheSame").css("opacity","1");
	// 		$("#surePsd").css("border","1px solid #e15f63");
	// 		$("#wirtePsdAgain").css("color","#e15f63");
	// 		return false;
	// 	}else {
	// 		$("#notTheSame").css("opacity","0");
	// 		$("#surePsd").css("border","1px solid #cbcbcb");
	// 		return true;
	// 	}
	// }

	// $("input:text input:password").on("change",function(){
	// 	alert(1);
	// 	// if(true){
	// 	// 	this.isok = true;
	// 	// }else{
	// 	// 	this.isok = false;
	// 	// }
	// 	// for(,,){
	// 	// 	if(!obj.isok){
	// 	// 		不能点击  return ;
	// 	// 	}
	// 	// }
	// 	// 可以点击  return;
	// });