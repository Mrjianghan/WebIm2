var dataSave;//登录成功之后数据保存
$(function(){
	var hint=document.getElementById("hint");//信息输入错误提示	
	$('#forpwd').on('click',function(){
		alert('请在惠众通享APP端→登录界面→找回密码进行操作');
	});	
	//表单检查
	function checkLoginInformation(){	
		if(hint.style.opacity==1){
			$("#loginBtn").css("backgroundColor","#cbcbcb");
			$("#loginBtn").attr("disabled","true");
			return;
		}
		if($("#account").val()!=""){

		}else{		
			$("#loginBtn").css("backgroundColor","#cbcbcb");			
			$("#loginBtn").attr("disabled","true");
			return;
		}
		if($("#password").val()!=""){

		}else{		
			$("#loginBtn").css("backgroundColor","#cbcbcb");			
			$("#loginBtn").attr("disabled","true");
			return;
		}
		if($("#validation").val()!=""){

		}else{		
			$("#loginBtn").css("backgroundColor","#cbcbcb");			
			$("#loginBtn").attr("disabled","true");
			return;
		}				
		$("#loginBtn").css("backgroundColor","#2284ff");
		$("#loginBtn").removeAttr("disabled");	
	}
	$("#account").on("input",function(){
		hint.style.opacity=0;		
		checkLoginInformation();
	});
	$("#password").on("input",function(){ 	
		hint.style.opacity=0;				
		checkLoginInformation();
	});
	//验证码获取
	$("#imgAuthcode").attr("src",linkAddress+'/captcha/build?t='+(new Date().getTime()));	
	//验证码（看不清楚换一张）提示
	var authCode=document.getElementById("authCode");//验证码显示区域
	var captcha=document.getElementById("captcha");//提示信息显示区域
	var showImgAuthcode=document.getElementById("imgAuthcode");//图片验证码标签
	authCode.onmouseover=function(){
		captcha.style.display="block";//鼠标移入显示
	}
	authCode.onmouseout=function(){
		captcha.style.display="none";//鼠标移出隐藏
	}
	showImgAuthcode.onclick=function(){//点击验证码更换
		this.src =linkAddress+'/captcha/build?t='+(new Date().getTime());
	}
	$("#validation").focus(function(){
		$("#becomeBd").css("border","1px solid #2284ff");
	});
	$("#validation").on('input',function(){//验证码验证是否正确
		var vd=$("#validation").val();
		if(vd.length==4){
			axios.get(linkAddress+'/captcha/validate.json?captcha='+vd).then(function(res){
				console.log(res);
				if(res.data.data){
					hint.style.opacity=0;
					$("#becomeBd").css("border","1px solid #cbcbcb");								
				}else{
					hint.style.opacity=1;
					hint.innerHTML="您输入的验证码不正确，请重新输入";					
					$("#becomeBd").css("border","1px solid #e15f63");		
					$("#loginBtn").attr("disabled","true");
					$("#loginBtn").css("backgroundColor","#cbcbcb");													
				}
				checkLoginInformation();
			}).catch(function(error){
				console.log(error);
			});
		}
		if(vd.length!=4){
			hint.style.opacity=1;
			hint.innerHTML="您输入的验证码不正确，请重新输入";								
			$("#becomeBd").css("border","1px solid #e15f63");
		}
	});
	// 是否选择记住账户
	var rememberAc = document.getElementById("rememberAc");//获取“是否记住账户”复选框	
    rememberAc.onclick=function(){
    	var redefine=document.getElementById("redefine");
        if (rememberAc.checked) {//记住账号
        	redefine.setAttribute("class","redefine rememberSelect");
        }else{
        	redefine.setAttribute("class","redefine");
        }
	}
	//个人号查看运营范围
	$("#selfBtn").on("click",function(){
		// var a = document.createElement('a');
		// a.href = '';//跳转至运营范围页面
		// a.click();
	});
	//企业号查看运营范围
	$("#comBtn").on("click",function(){

	});
	// “登录”按钮点击事件
	$("#loginBtn").on("click",function(){
		$(this).css("backgroundColor","#cbcbcb");
		$(this).attr("disabled",true);
		var account=document.getElementById("account").value;//账户
		var password=document.getElementById("password").value;//密码	
		console.log(account);
		console.log(password);		
		var rememberPa = document.getElementById("rememberPa");//获取“是否记住密码”复选框 	
		axios.post(linkAddress+'/signin.json?username='+account+'&password='+password).then(function(res){
			console.log(res);
			switch(res.data.code){
				case 2000:
					axios.post(linkAddress+'/im/public/information/find/by/userId.json').then(function(res){
						console.log(res);						
						console.log(res.data.data);
						dataSave=JSON.stringify(res.data.data);
						console.log(dataSave);
						if(!window.localStorage){
							alert("浏览器不支持localstorage,请升级您的浏览器以来达到更好的用户体验。");
							return;
						}else{
							if(res.data.data!=null){//查询到用户信息，跳转首页
								var a = document.createElement('a');
								a.href = 'main.html';
								a.click();
								localStorage.setItem("userinfo",dataSave);								
							}else{//没有用户信息，跳转注册页面
								var a = document.createElement('a');
								a.href = 'registration.html';
								a.click();
							}
						}
					}).catch(function(error){
						console.log(error);
						// alert("网络延迟，请重新登录！");
					});
					if(!window.localStorage){
						alert("浏览器不支持localstorage,请升级您的浏览器以来达到更好的用户体验。");
						return false;
					 }else{
						var storage=window.localStorage;
						var loginPWD = password; //获取用户名信息 (account为数值)
						localStorage.setItem("loginPwd",loginPWD);
					 }
					break;
				default:				
					hint.innerHTML=res.data.message;
					hint.style.opacity=1;									
					$("#loginBtn").css("backgroundColor","#cbcbcb");
					$("#loginBtn").attr("disabled","true");
					// $('#loginBtn').removeAttr("disabled");					
					break;					
			}
		}).catch(function(error){
			console.log(error);
		});
		// localStorage记住用户名
    	if(!window.localStorage){
	        alert("浏览器不支持localstorage,请升级您的浏览器以来达到更好的用户体验。");
	        return false;
	    }else{
	        var storage=window.localStorage;
    		var loginCode = account; //获取用户名信息 
	        if (rememberAc.checked) {//记住账号
	        	localStorage.setItem("Account",loginCode);
	        }
	    }
	});
});
//获取localStorage里面的数据填充到账户。
function getStorageNum(){
    var storage=window.localStorage;
    var strName = localStorage.getItem('Account');
    if(strName){//用户名存在的话把用户名填充到用户名文本框    
	    $("#account").val(strName);    
	}   
}