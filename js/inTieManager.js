var uname = false;//存储姓名  身份证号：card；
card = false;
var IdType = false;//身份证类型是否被选择过
var imgs = {};//图片对象组
var tel = false;//手机号
var isReally = false;//验证码是否通过
var testChinese = /^[\u4E00-\u9FA5]{2,}$/;
var imgId;
var userId;

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

//换绑管理者表单验证
function isok(){
	$("#returnTypeCom").css("backgroundColor","#cbcbcb");
	$("#returnTypeCom").attr("disabled",true);
	if(!uname){
		return '姓名为空！';
	}
	if(!card){
		return '身份证号未输入！';
	}
	if(!IdType){
		return '请选择身份证类型！'
	}
	if(imgs['正面']&&imgs['反面']&&imgs['手持']&&imgs['法人授权']&&imgs['营业执照']){
		
	}else{
		console.log(imgs);
		return '有证件未上传';
	}
	if(!tel){
		return '未填写手机号码';
	}
	if(!isReally){
		return '未通过图形验证码';
	}
	if($('#inTieSmsVd').val().length==0){
		return '未填写短信验证码';
	}
	$("#returnTypeCom").css("backgroundColor","#2284ff");
	$("#returnTypeCom").removeAttr('disabled');
	return '通过 验证成功！';
}


// 企业号信息登记管理者身份证姓名0
$("#comManName").focus(function(){
	$("#comManName").css("border","1px solid #2284ff");
});
$("#comManName").on('input',function(){
	var comManNameValue=document.getElementById("comManName").value;
	uname = testChinese.test(comManNameValue)?comManNameValue:false;

	if (uname){
		$("#comManNameError").css("opacity","0");
		$("#comManNameWain").css("color","#cbcbcb");
		console.log(isok());
	}
	
});	
$("#comManName").blur(function(){
	if (!uname) {
		$("#comManNameError").css("opacity","1");
		$("#comManNameWain").css("color","#e15f63");
		$(this).css("border","1px solid #e15f63");
		console.log(isok());
	}else{
		$(this).css("border","1px solid #cbcbcb");
		console.log(isok());
	}
});

// 企业号信息登记管理者身份证号码
$("#comManIDnum").focus(function(){
	$("#comManIDnum").css("border","1px solid #2284ff");
});
$("#comManIDnum").on('input',function(){
	card = $(this).val(); 
	if(card.length == 15||card.length == 18){
		card = checkCard(comManIDnumError,comManIDnum,comManIDnumWain)?card:false;
		if(card){
			comManIDnumError.style.opacity = '0';
	    	comManIDnum.style.border= '1px solid #cbcbcb';
	    	comManIDnumWain.style.color = '#cbcbcb';
	    	console.log(isok());
		}
	}else{
		card = false;
	}
});
$("#comManIDnum").blur(function(){
	console.log(isok());
	if(!card){
	    	comManIDnumError.style.opacity = '1';
	    	comManIDnum.style.border= '1px solid #e15f63';
	    	comManIDnumWain.style.color = '#e15f63';    
	}else{
		comManIDnumError.style.opacity = '0';
    	comManIDnum.style.border= '1px solid #cbcbcb';
    	comManIDnumWain.style.color = '#cbcbcb';
    	console.log(isok());
	}
});	
// 企业号信息登记管理者证件类型
var comNormal=document.getElementById("comNormal");//企业二代身份证radio
var comNormalChose=document.getElementById("comNormalChose");
var comADhoc=document.getElementById("comADhoc");//企业临时身份证radio
var comADhocChose=document.getElementById("comADhocChose");
comNormal.onclick=function(){
	IdType = true;
	cardTypeChose(comNormal,comNormalChose,comADhocChose);
	console.log(isok());
}
comADhoc.onclick=function(){
	IdType = true;
	cardTypeChose(comADhoc,comADhocChose,comNormalChose);
	console.log(isok());
}
	// 企业号信息登记管理者身份证上传
	$("#comManIDFront").on("change",function(){//正面照片上传
		imgPreview(this,manPreview,comManIDFront,'正面');
	});
	$("#comManIDBack").on("change",function(){//反面照片上传
		imgPreview(this,manPreviewBack,comManIDBack,'反面');
	});
	$("#comManIDHeld").on("change",function(){//手持照片上传
		imgPreview(this,manPreviewHeld,comManIDHeld,'手持');
	});	
	// 企业号信息登记管理者手机号验证
	$("#comManPhone").focus(function(){
		$("#comManPhone").css("border","1px solid #2284ff");
	});
	$("#comManPhone").on('input',function(){
		tel = phoneVerify(comManPhone,comManPhoneError,comManPhoneWain);
		if(tel){
			$("#updateSendBg").css("backgroundColor",isReally?"#2284ff":"#cbcbcb");
			comManPhoneError.style.opacity = '0';
		    comManPhone.style.border = '1px solid #cbcbcb';
		    comManPhoneWain.style.color = '#cbcbcb';
		    console.log(isok());
		}
	});		
	$("#comManPhone").blur(function(){
		console.log(isok());
		if(!tel){
			$("#updateSendBg").css("backgroundColor","#cbcbcb");
			comManPhoneError.style.opacity = '1';
		    comManPhone.style.border = '1px solid #e15f63';
		    comManPhoneWain.style.color = '#e15f63';
		}else{
			$("#updateSendBg").css("backgroundColor",isReally?"#2284ff":"#cbcbcb");
			$(this).css("border","1px solid #cbcbcb");	
		}
	
	});
	// 企业号信息登记验证码验证
	$("#comshowVd").on("mouseover",function(){
		$("#comnotKnow").show();
	});
	$("#comshowVd").on("mouseout",function(){
		$("#comnotKnow").hide();
	});	
	$("#comVdInput").focus(function(){
	    $(this).css("border","1px solid #2284ff");
	});
	$("#comVdInput").on('input',function(){
		var va = $(this).val();
		if(va.length==4){
			axios.get(linkAddress+'/captcha/validate.json?captcha='+va).then(function(res){
				console.log(res);
				isReally=res.data.data;
				if (isReally) {
					$("#updateSendBg").css("backgroundColor",tel?"#2284ff":"#cbcbcb");
					$("#comVdInput").css("border","1px solid #cbcbcb");
					$("#comvdError").css("opacity","0");
					console.log('验证通过');
					console.log(isok());
				}else{
					$("#updateSendBg").css("backgroundColor","#cbcbcb");
					$("#comVdInput").css("border","1px solid #e15f63");
					$("#comvdError").css("opacity","1");
					console.log('验证未通过');
				}
			}).catch(function(error){
				isReally = false;
				alert('网络连接失败');
			});
		}else{
			$("#updateSendBg").css("backgroundColor","#cbcbcb");
			isReally = false;
		}
	});
	$("#comVdInput").blur(function(){
		
		console.log(isok());
		if (isReally) {
			$("#updateSendBg").css("backgroundColor",tel?"#2284ff":"#cbcbcb");
			$("#comVdInput").css("border","1px solid #cbcbcb");
			$("#comvdError").css("opacity","0");
			console.log(isok());
		}else{
			$("#updateSendBg").css("backgroundColor","#cbcbcb");
			$("#comVdInput").css("border","1px solid #e15f63");
			$("#comvdError").css("opacity","1");
		}
	});
	
	$("#updateSendBg").on("click",function(){
		if(timer){
			console.log('未达到等待时间');
			return false;
		}
		if(isReally&&tel){
			timer = true;
			axios.post('http://192.168.1.7:8183/im/sms/captcha/reg.json?mobile='+tel+'&captcha='+$("#comVdInput").val()).then(function(res){
				if(res['data']['message']=='发送成功'){
					start(updateSendBg);
					console.log(isok());
				}else{
					alert(res['data']['message']);
					timer = false;
				}
			}).catch(function(error){
				alert('网络连接失败');
			});
		}else{
			console.log(isok());
			console.log('未通过图片验证码验证！或手机号码格式不正确');
		}
	});

	// 法人授权书上传
	$("#authorizationInput").on("change",function(){
		imgPreview(this,authorizationImg,authorizationInput,'法人授权');
		console.log(isok());
	});
	// 营业执照上传
	$("#bslicenseInput").on("change",function(){
		imgPreview(this,bslicenseImg,bslicenseInput,'营业执照');
		console.log(isok());
	});
	
	$("#inTieSmsVd").focus(function(){
		$("#inTieSmsVd").css("border","1px solid #2284ff");
	});
	$("#inTieSmsVd").on('input',function(){
		if ($("#inTieSmsVd").val().length>4) {
			console.log(isok());
			$("#inTieSmsVd").css("border","1px solid #cbcbcb");
			$("#returnTypeCom").css("backgroundColor","#2284ff");
		}else{
			$("#inTieSmsVd").css("border","1px solid #e15f63");

		}
	});
	// "下一步"按钮点击
	$("#returnTypeCom").on("click",function(){
		$(this).css("backgroundColor","#cbcbcb");
		$(this).attr("disabled",true);
		var f = new FormData();
		if(imgs['正面']&&imgs['反面']&&imgs['手持']&&imgs['法人授权']&&imgs['营业执照']){
			
		}else{
			alert('请添加齐全证件照片');
			return;
		}

		f.append('用户名',uname);
		f.append('身份证号',card);
		f.append('手机号',tel);
		f.append('换绑身份证正面',imgs['正面']);
		f.append('换绑身份证反面',imgs['反面']);
		f.append('换绑身份证手持',imgs['手持']);
		f.append('换绑法人授权照片',imgs['法人授权']);
		f.append('换绑营业执照照片',imgs['营业执照']);
		f.append('身份证类型',comNormal.checked?'二代身份证':'临时身份证');
		f.append('图片验证码',$("#comVdInput").val());
		f.append('短信验证码',$("#inTieSmsVd").val());
//		axios.post(linkAddress+'url',f).then(function(res){
//				if(true){
//					//开始跳转下个页面，加载第二个页面的二维码
					$("#pageTwoinTie").show();
					$("#pageOnefind").hide();
					flowNextGo(registerOneVar,registerOneSpan,registerOneP,registerTwoVar,registerTwoSpan,registerTwoP);
					//请求二维码接口（加载二维码）
					axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
						$("#QrCode").attr("src",linkAddressTwo+res['data']['data']['path']);
						var preID=JSON.parse(res.data.data.id);//将json字符串转换为对象
						imgId=preID.id;
					}).catch(function(error){
						console.log(error);
					});

//				}else{··
//					//上传失败打印错误信息
					// $("#returnTypeCom").css("backgroundColor","#2284ff");
					// $('#returnTypeCom').removeAttr("disabled");
//				}
//		}).catch(function(error){
//			console.log(error);
//			//网络通信失败  请重新上传！
//		});		
	});
	//判断是否扫描二维码
	function sweepYard(startImgId){
		axios.post(linkAddress+'/login.json?qrcode='+startImgId).then(function(res){
			if(res.data.data!=""){
				userId=res.data.data;
				console.log(res);
				if(res.data.code==2000){//登录成功之后进入到下一个页面
					$("#pageTwoinTie").hide();
					$("#pageThreeinTie").show();
					flowNextGo(registerTwoVar,registerTwoSpan,registerTwoP,registerThreeVar,registerThreeSpan,registerThreeP);
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
	//个人号扫码操作
	$('#QrCode').on('load',function(){
		sweepYard(imgId);
	});
	//点击更换二维码
	$("#QrCode").on("click",function(){
		axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
			$("#QrCode").attr("src",linkAddressTwo+res['data']['data']['path']);
			var preID=JSON.parse(res.data.data.id);
			console.log(preID);
			imgId=preID.id;
		}).catch(function(error){
			console.log(error);
		});
	});
	//上一步按钮操作
	$("#preReturn").on("click",function(){
		$("#pageTwoinTie").hide();
		$("#pageOnefind").show();
		flowPreGo(registerTwoVar,registerTwoSpan,registerTwoP,registerOneVar,registerOneSpan,registerOneP);
	});
	// 封装方法--流程线下一步变化
	function flowNextGo(preVar,preSpan,preP,nextVar,nextSpan,nextP){
		preVar.setAttribute("class","overSee");
		preSpan.setAttribute("class","overSee");
		preP.setAttribute("class","twoBec");
		nextVar.setAttribute("class","chooseOn");
		nextSpan.setAttribute("class","chooseOn");
		nextP.setAttribute("class","becColor");
	}
	// 封装方法--流程线上一步变化
	function flowPreGo(preVar,preSpan,preP,nextVar,nextSpan,nextP){
		preVar.setAttribute("class","");
		preSpan.setAttribute("class","");
		preP.setAttribute("class","");
		nextVar.setAttribute("class","chooseOn");
		nextSpan.setAttribute("class","chooseOn");
		nextP.setAttribute("class","becColor");
	}
	//身份证号码格式验证方法 
	var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
	            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",  
	            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",  
	            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",  
	            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",  
	            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
	           };
	checkCard = function(showError,bdInput,showWain){  
	    // alert(card)
	    //是否为空  
	    if(card === ''){  
//	    	showError.style.opacity = '1';
//	    	bdInput.style.border= '1px solid #e15f63';
//	    	showWain.style.color = '#e15f63';  
	        return false;  
	    }  
	    //校验长度，类型  
	    if(isCardNo(card) === false){  
//	    	showError.style.opacity = '1';
//	    	bdInput.style.border= '1px solid #e15f63';
//	    	showWain.style.color = '#e15f63';   
	        return false;  
	    }  
	    //检查省份  
	    if(checkProvince(card) === false){  
//	    	showError.style.opacity = '1';
//	    	bdInput.style.border= '1px solid #e15f63';
//	    	showWain.style.color = '#e15f63';   
	        return false;  
	    }  
	    //校验生日  
	    if(checkBirthday(card) === false){  
//	    	showError.style.opacity = '1';
//	    	bdInput.style.border= '1px solid #e15f63';
//	    	showWain.style.color = '#e15f63';    
	        return false;   
	    }  
	    //检验位的检测  
	    if(checkParity(card) === false){  
//	    	showError.style.opacity = '1';
//	    	bdInput.style.border= '1px solid #e15f63';
//	    	showWain.style.color = '#e15f63';    
	        return false;  
	    }
//  	showError.style.opacity = '0';
//  	bdInput.style.border= '1px solid #cbcbcb';
//  	showWain.style.color = '#cbcbcb';  
	    return true;  
	};  
	//检查号码是否符合规范，包括长度，类型  
	isCardNo = function(card){  
	    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
	    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;  
	    if(reg.test(card) === false){  
	        return false;  
	    }
	    return true;  
	};  
	//取身份证前两位,校验省份  
	checkProvince = function(card){  
	    var province = card.substr(0,2);  
	    if(vcity[province] == undefined){  
	        return false;  
	    }  
	    return true;  
	};  	  
	//检查生日是否正确  
	checkBirthday = function(card){  
	    var len = card.length;  
	    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
	    if(len == '15'){  
	        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;   
	        var arr_data = card.match(re_fifteen);  
	        var year = arr_data[2];  
	        var month = arr_data[3];  
	        var day = arr_data[4];  
	        var birthday = new Date('19'+year+'/'+month+'/'+day);  
	        return verifyBirthday('19'+year,month,day,birthday);  
	    }  
	    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
	    if(len == '18'){  
	        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;  
	        var arr_data = card.match(re_eighteen);  
	        var year = arr_data[2];  
	        var month = arr_data[3];  
	        var day = arr_data[4];  
	        var birthday = new Date(year+'/'+month+'/'+day);  
	        return verifyBirthday(year,month,day,birthday);  
	    }  
	    return false;  
	};  
	  
	//校验日期  
	verifyBirthday = function(year,month,day,birthday){  
	    var now = new Date();  
	    var now_year = now.getFullYear();  
	    //年月日是否合理  
	    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)  
	    {  
	        //判断年份的范围（3岁到100岁之间)  
	        var time = now_year - year;  
	        if(time >= 3 && time <= 100)  
	        {  
	            return true;  
	        }  
	        return false;  
	    }  
	    return false;  
	};  
	//校验位的检测  
	checkParity = function(card){  
	    //15位转18位  
	    card = changeFivteenToEighteen(card);  
	    var len = card.length;  
	    if(len == '18'){  
	        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
	        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
	        var cardTemp = 0, i, valnum;   
	        for(i = 0; i < 17; i ++){   
	            cardTemp += card.substr(i, 1) * arrInt[i];   
	        }   
	        valnum = arrCh[cardTemp % 11];   
	        if (valnum == card.substr(17, 1)){  
	            return true;  
	        }  
	        return false;  
	    }
	    return false;  
	};  
	//15位转18位身份证号  
	changeFivteenToEighteen = function(card){  
	    if(card.length == '15'){  
	        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
	        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
	        var cardTemp = 0, i;     
	        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);  
	        for(i = 0; i < 17; i ++)   
	        {   
	            cardTemp += card.substr(i, 1) * arrInt[i];   
	        }   
	        card += arrCh[cardTemp % 11];   
	        return card;  
	    }  
	    return card;  
	}; 
	// 封装方法--证件类型选择
	function cardTypeChose(checkedThis,updateBg,goBack){
		if (checkedThis.checked) {
			updateBg.setAttribute("class","checkedThis");
			goBack.setAttribute("class", "");
		}
	}
	// 封装方法--证件照片上传验证
	function imgPreview(fileDom,imgID,fileInput,key){
		//判断是否支持FileReader
		if (window.FileReader) {
			var reader = new FileReader();
		} else {
			alert("您的浏览器不支持图片预览功能，如需该功能请升级您的浏览器！");
		}
		//获取文件
		var file = fileDom.files[0];
		var imageType = /^image\//;
		//是否是图片
		if (!imageType.test(file.type)) {
			alert("请选择图片！");
			return false;
		}
		var imagSize = fileInput.files[0].size;
		// alert("图片大小："+imagSize+"B");
		if(imagSize>1024*1024*10){//判断文件大小
			alert("图片文件大于10M,上传失败！");
			imgID.src="";
			imgID.style.display = 'none';
			return false;
			// alert("图片大小为："+imagSize/(1024*1024)+"M");
		}
		//读取完成
		reader.onload = function(e) {
			//获取图片dom
				imgID.src = e.target.result;
			//图片路径设置为读取的图片
			imgID.onload=function(){
				//base64转为blob
				var	data = reader.result.split(',')[1];
				data = window.atob(data);
				var ia = new Uint8Array(data.length);
				for (var i = 0; i < data.length; i++) {
					ia[i] = data.charCodeAt(i);
				};
				var bl =  new Blob([ia], { type:'image/jpeg' });
				imgs[key] = bl;//赋值
				this.style.display = 'block';//初始化显示img标签
					var imgWidth=this.naturalWidth;
				var imgHeight=this.naturalHeight;
				console.log(this.naturalWidth +"|"+this.naturalHeight);
				if(imgWidth<=200||imgHeight<=200){//判断文件尺寸
					imgID.style.display = 'none';
					imgID.src="";
					alert("图片尺寸小于200*200,上传失败！"); 
					return false;
				}
			}
		};
		reader.readAsDataURL(file);
	}
    // 封装方法--手机号码验证
	function phoneVerify(phoneNumber,phoneError,phoneWain){
		var myreg =/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/; 
		var phone=phoneNumber.value;
		if(!myreg.test(phone)){ 
//		    phoneError.style.opacity = '1';
//		    phoneNumber.style.border = '1px solid #e15f63';
//		    phoneWain.style.color = '#e15f63';
		    return false; 
		}else{
//		    phoneError.style.opacity = '0';
//		    phoneNumber.style.border = '1px solid #cbcbcb';
//		    phoneWain.style.color = '#cbcbcb';
		}
		return phone;
	}
	// 发送验证倒计时方法封装
	var timer=false;
	function start(box){
		if(typeof timer == 'boolean'){
			box.innerHTML="60s";
			var second=parseInt(box.innerHTML);
			if (timer) {
				clearInterval(timer);
				timer=false;
			}
			timer=setInterval(function(){
				second--;
				box.innerHTML=second+"s";
				if(second==0){
					clearInterval(timer);
					box.innerHTML="重新发送";
					timer=false;
				}
			},1000);
		}else{

		}	
	}
var ReallyImg = function(){
	document.getElementById('Reallyshow').src=linkAddress+'/captcha/build?t='+(new Date().getTime());
	$('#comVdInput').val('');
	$("#updateSendBg").css("backgroundColor","#cbcbcb");
	isReally = false;
	console.log(isok());
}

document.getElementById('Reallyshow').onclick = function(){
	ReallyImg();
};
ReallyImg();

