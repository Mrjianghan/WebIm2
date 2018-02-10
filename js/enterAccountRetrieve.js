




// 邮箱验证之后
var imgs = {};//图片对象组
// 企业账号找回表单验证方法
function comAccountFind(){
	var perCardType=document.getElementsByName("comCardTypeFind");//获取身份证类型input
	var radioValue;//1表示二代身份证，2表示临时身份证
	for(var i = 0; i <perCardType.length; i++){
		if(perCardType[i].checked){   
			radioValue=parseInt(perCardType[i].value);
		}   
	}
	var comManNameError=document.getElementById("comManNameError");//企业管理者姓名错误信息
	var comManIDnumError=document.getElementById("comManIDnumError");//企业管理者身份证号码错误信息
	var comManPhoneError=document.getElementById("comManPhoneError");//企业管理者手机号错误信息
	var comvdError=document.getElementById("comvdError");//企业管理者图片验证码错误信息
	if($('#comManName').val()!=""&&comManNameError.style.opacity!=1){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if($("#comManIDnum").val()!=""&&comManIDnumError.style.opacity!=1){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if(radioValue==1||radioValue==2){//企业管理者身份证类型选择

	}else{		
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if(imgs['企业账号找回正面']){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if(imgs['企业账号找回反面']){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if(imgs['企业账号找回手持']){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if(imgs['企业账号找回法人授权书']){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if(imgs['企业账号找回营业执照照片']){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if($("#comManPhone").val()!=""&&comManPhoneError.style.opacity!=1){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if($("#comVdInput").val()!=""&&comvdError.style.opacity!=1){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	if($("#smsVd").val().length==6){

	}else{
		$("#returnTypeCom").css("backgroundColor","#cbcbcb");
		$('#returnTypeCom').attr('disabled',"true"); 
		return;
	}
	$("#returnTypeCom").css("backgroundColor","#2284ff");
	$('#returnTypeCom').removeAttr("disabled");
}
// 企业号信息登记管理者身份证姓名
$("#comManName").focus(function(){
	$("#comManName").css("border","1px solid #2284ff");
});
$("#comManName").blur(function(){
	var testValue=/[^\u4e00-\u9fa5]/g;		
	var comManNameValue=document.getElementById("comManName").value;
	if (testValue.test(comManNameValue)||comManNameValue==""||comManNameValue.length<2) {
		$("#comManNameError").css("opacity","1");
		$("#comManName").css("border","1px solid #e15f63");
		$("#comManNameWain").css("color","#e15f63");
		comAccountFind();				
	}else{
		$("#comManNameError").css("opacity","0");
		$("#comManName").css("border","1px solid #cbcbcb");
		$("#comManNameWain").css("color","#cbcbcb");
		comAccountFind();
	}
});	
	// 企业号信息登记管理者身份证号码
	$("#comManIDnum").focus(function(){
		$("#comManIDnum").css("border","1px solid #2284ff");
	});
	$("#comManIDnum").blur(function(){
	    card = $("#comManIDnum").val(); 
		checkCard(comManIDnumError,comManIDnum,comManIDnumWain);
		comAccountFind();
	});	
	// 企业号信息登记管理者证件类型
	var comNormal=document.getElementById("comNormal");//企业二代身份证radio
	var comNormalChose=document.getElementById("comNormalChose");
	var comADhoc=document.getElementById("comADhoc");//企业临时身份证radio
	var comADhocChose=document.getElementById("comADhocChose");
	comNormal.onclick=function(){
		cardTypeChose(comNormal,comNormalChose,comADhocChose);
		comAccountFind();
	}
	comADhoc.onclick=function(){
		cardTypeChose(comADhoc,comADhocChose,comNormalChose);
		comAccountFind();
	}
	// 企业号信息登记管理者身份证上传
	$("#comManIDFront").on("change",function(){//正面照片上传
		imgPreview(this,manPreview,comManIDFront,'企业账号找回正面');
		comAccountFind();
	});
	$("#comManIDBack").on("change",function(){//反面照片上传
		imgPreview(this,manPreviewBack,comManIDBack,'企业账号找回反面');
		comAccountFind();
	});
	$("#comManIDHeld").on("change",function(){//手持照片上传
		imgPreview(this,manPreviewHeld,comManIDHeld,'企业账号找回手持');
		comAccountFind();
	});	
	// 法人授权书上传
	$("#authorizationInput").on("change",function(){
		imgPreview(this,authorizationImg,authorizationInput,'企业账号找回法人授权书');
		comAccountFind();
	});
	// 营业执照上传
	$("#bslicenseInput").on("change",function(){
		imgPreview(this,bslicenseImg,bslicenseInput,'企业账号找回营业执照照片');
		comAccountFind();
	});
	// 企业号信息登记管理者手机号验证
	$("#comManPhone").focus(function(){
		$("#comManPhone").css("border","1px solid #2284ff");
	});
	$("#comManPhone").blur(function(){
		phoneVerify(comManPhone,comManPhoneError,comManPhoneWain);
		comAccountFind();
	});		
	// 企业号信息登记验证码验证
	$("#comshowVd").attr("src",linkAddress+'/captcha/build');//获取图片验证码
	$("#comshowVd").on("mouseover",function(){
		$("#comnotKnow").show();
	});
	$("#comshowVd").on("mouseout",function(){
		$("#comnotKnow").hide();
	});	
	$("#comshowVd").on("click",function(){//点击更换图片验证码
		this.src = linkAddress+'/captcha/build?t='+(new Date().getTime());
	});	
	$("#comVdInput").focus(function(){
		$("#comVdInput").css("border","1px solid #2284ff");
	});
	$("#comVdInput").blur(function(){//验证码是否正确验证
		var comVdInputValue=$("#comVdInput").val();
		axios.get(linkAddress+'/captcha/validate.json?captcha='+comVdInputValue).then(function(res){
			if(res.data.data==true){
				$("#comvdError").css("opacity","0");
				$("#comVdInput").css("border","1px solid #cbcbcb");
				$("#updateSendBg").css("backgroundColor","#2284ff");//发送验证按钮颜色改变	
				comAccountFind();		
			}else{
				$("#comvdError").css("opacity","1");
				$("#comVdInput").css("border","1px solid #e15f63");
				comAccountFind();
			}
		}).catch(function(error){
			console.log(error);
		});		
	});	
	// 发送验证短息验证码点击
	$("#updateSendBg").on("click",function(){//企业号发送短信验证
		var comManPhoneError=document.getElementById("comManPhoneError");//手机号错误信息提示
		if (comManPhoneError.style.opacity!=1) {
			axios.post(linkAddress+'/im/sms/captcha/reg.json?mobile='+$("#comManPhone").val()
			+'&captcha='+$("#comVdInput").val()).then(function(res){
				if(res.data.code==2000){
					start(updateSendBg);
				}else{
					alert(res.data.message);
				}
			}).catch(function(error){
				console.log(error);
			});
		}
	});
	//短信验证码input
	$("#smsVd").focus(function(){
		$("#smsVd").css("border","1px solid #2284ff");
	});
	$("#smsVd").blur(function(){
		if ($("#smsVd").val().length==6){
			$("#smsVd").css("border","1px solid #cbcbcb");
		}else{
			$("#smsVd").css("border","1px solid #e15f63");
		}
		comAccountFind();
	});
	// "下一步"按钮点击
	$("#returnTypeCom").on("click",function(){
		$(this).css("backgroundColor","#cbcbcb");
		$(this).attr("disabled",true);
		var comCardType=document.getElementsByName("comCardTypeFind");//获取身份证类型input
		var radioValue;//1表示二代身份证，2表示临时身份证
		for(var i = 0; i <comCardType.length; i++){
			if(comCardType[i].checked){   
				radioValue=parseInt(comCardType[i].value);
				console.log(radioValue);
			}   
		}
		var f = new FormData();		
		f.append('用户名',$("#comManName").val());
		f.append('身份证号',$("#comManIDnum").val());
		f.append("身份证类型",radioValue);		
		f.append('换绑身份证正面',imgs['企业账号找回正面'],'qiyefind1.jpeg');
		f.append('换绑身份证反面',imgs['企业账号找回反面'],'qiyefind2.jpeg');
		f.append('换绑身份证手持',imgs['企业账号找回手持'],'qiyefind3.jpeg');
		f.append('换绑法人授权照片',imgs['企业账号找回法人授权书'],'qiyefind4.jpeg');
		f.append('换绑营业执照照片',imgs['企业账号找回营业执照照片'],'qiyefind5.jpeg');
		f.append('手机号',$("#comManPhone").val());		
		f.append('图片验证码',$("#comVdInput").val());
		f.append('短信验证码',$("#smsVd").val());
		// axios.post().then(function(res){
		// 	console.log(res);
		// }).catch(function(error){
		// 	console.log(error);
		// });
		//根据返回值判断，正确跳转
		$("#hideSpan").html("");
		$("#pageOnefind").hide();
		$("#pageTwofind").show();
		flowNextGo(registerOneVar,registerOneSpan,registerOneP,registerTwoVar,registerTwoSpan,registerTwoP);
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
	    	showError.style.opacity = '1';
	    	bdInput.style.border= '1px solid #e15f63';
	    	showWain.style.color = '#e15f63';  
	        return false;  
	    }  
	    //校验长度，类型  
	    if(isCardNo(card) === false){  
	    	showError.style.opacity = '1';
	    	bdInput.style.border= '1px solid #e15f63';
	    	showWain.style.color = '#e15f63';   
	        return false;  
	    }  
	    //检查省份  
	    if(checkProvince(card) === false){  
	    	showError.style.opacity = '1';
	    	bdInput.style.border= '1px solid #e15f63';
	    	showWain.style.color = '#e15f63';   
	        return false;  
	    }  
	    //校验生日  
	    if(checkBirthday(card) === false){  
	    	showError.style.opacity = '1';
	    	bdInput.style.border= '1px solid #e15f63';
	    	showWain.style.color = '#e15f63';    
	        return false;   
	    }  
	    //检验位的检测  
	    if(checkParity(card) === false){  
	    	showError.style.opacity = '1';
	    	bdInput.style.border= '1px solid #e15f63';
	    	showWain.style.color = '#e15f63';    
	        return false;  
	    }
    	showError.style.opacity = '0';
    	bdInput.style.border= '1px solid #cbcbcb';
    	showWain.style.color = '#cbcbcb';  
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
		    phoneError.style.opacity = '1';
		    phoneNumber.style.border = '1px solid #e15f63';
		    phoneWain.style.color = '#e15f63';
		    return false; 
		}else{
		    phoneError.style.opacity = '0';
		    phoneNumber.style.border = '1px solid #cbcbcb';
		    phoneWain.style.color = '#cbcbcb';
		}
	}
	// 发送验证倒计时方法封装
	var timer=false;
	function start(box){
		if(!timer){
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