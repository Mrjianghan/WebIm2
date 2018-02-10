var imgs = {};
var imgId=null;//二维码id
var userId=null;//用户id
var areajson = null;
// var cropImg=null;//个人公众号裁切头像
// var comCropImg=null;//企业公众号裁切头像

$(document).ready(function(){
	var titleR=document.getElementById("titleR");//选择类型——标题
	// 个人号类型点击进入个人信息登记页面(流程线也相应变化)
	$("#perTypeRadio").on("click",function(){
		var perTypeRadio=document.getElementById("perTypeRadio");//个人号选择
		if(perTypeRadio.checked){
			nextGo(types,personalInfor);
			flowNextGo(typeVar,typeSpan,typeP,infroVar,infroSpan,infroP);
			titleR.innerHTML="个人号主体信息登记";
			// 请求加载二维码接口 
			axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
				console.log(res);
				$("#qrCode").attr("src",linkAddressTwo+res['data']['data']['path']);
				var preID=JSON.parse(res.data.data.id);
				imgId=preID.id;
			}).catch(function(error){
				console.log(error);
			});
		}
	});
	//判断是否扫描二维码
	function sweepYard(startImgId){
		axios.post(linkAddress+'/login.json?qrcode='+startImgId).then(function(res){
			if(res.data.data!=""){
				userId=res.data.data;
				alert(res.data.message);
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
	$('#qrCode').on('load',function(){//个人号扫码操作
		sweepYard(imgId);
	});
	$('#hoverShow').click(function(){//二维码更换
		axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
			$("#qrCode").attr("src",linkAddressTwo+res['data']['data']['path']);
			var preID=JSON.parse(res.data.data.id);
			console.log(preID);
			imgId=preID.id;
		}).catch(function(error){
			console.log(error);
		});
	});
	// 个人号信息登记上一步按钮
	$("#returnTypePer").on("click",function(){
		nextGo(personalInfor,types);
		flowPreGo(infroVar,infroSpan,infroP,typeVar,typeSpan,typeP);
		titleR.innerHTML="注册";
	});
	// 个人号信息登记身份证姓名
	$("#IDcardName").focus(function(){
		$("#IDcardName").css("border","1px solid #2284ff");
	});
	$("#IDcardName").blur(function(){
		var perNameValue=document.getElementById("IDcardName").value;//身份证姓名
		var testIdName=/[^\u4e00-\u9fa5]/g;
		if (testIdName.test(perNameValue)||perNameValue==""||perNameValue.length<2){
			$("#writeName").css("opacity","1");
			$("#IDcardName").css("border","1px solid #e15f63");
			$("#warningName").css("color","#e15f63");
		}else{
			$("#writeName").css("opacity","0");
			$("#IDcardName").css("border","1px solid #cbcbcb");
			$("#warningName").css("color","#cbcbcb");
		}
		checkPreInformation();
	});
	// 个人号信息登记身份证号码
	$("#IDcardNum").focus(function(){
		$("#IDcardNum").css("border","1px solid #2284ff");
	});
	var card=null;
	$("#IDcardNum").blur(function(){
	    card = $("#IDcardNum").val(); 
		checkCard(writeNum, IDcardNum, warningNum);
		checkPreInformation();
	});	
	// 个人号信息登记证件类型选择
	var normal=document.getElementById("normal");//二代身份证radio
	var normalChose=document.getElementById("normalChose");
	var ADhoc=document.getElementById("ADhoc");//临时身份证radio
	var ADhocChose=document.getElementById("ADhocChose");
	normal.onclick=function(){
		cardTypeChose(normal,normalChose,ADhocChose);
		checkPreInformation();
	}
	ADhoc.onclick=function(){
		cardTypeChose(ADhoc,ADhocChose,normalChose);
		checkPreInformation();
	}
	// 个人号信息登记证件照片上传验证
	$("#IDcardFront").on("change",function(){//正面照片上传
		imgPreview(this,preview,IDcardFront,'正面');
		checkPreInformation();
	});
	$("#IDcardBack").on("change",function(){//反面照片上传
		imgPreview(this,backImg,IDcardBack,'反面');
		checkPreInformation();
	});
	$("#IDcardHeld").on("change",function(){//手持照片上传
		imgPreview(this,HeldImg,IDcardHeld,'手持');
		checkPreInformation();
	});
	// 个人号信息登记联系手机号码验证
	$("#phoneNum").focus(function(){
		$("#phoneNum").css("border","1px solid #2284ff");
	});
	$("#phoneNum").blur(function(){
		phoneVerify(phoneNum,phoneError,phoneWain);
		checkPreInformation();
	});	
	$("#showVd").attr("src",linkAddress+'/captcha/build');//个人号注册验证码加载	
	// 个人号信息登记验证码验证
	$("#showVd").on("mouseover",function(){//“看不清楚”显示
		$("#notKnow").show();
	});
	$("#showVd").on("mouseout",function(){//“看不清楚”隐藏
		$("#notKnow").hide();
	});	
	$("#showVd").on("click",function(){//点击更换验证码
		this.src = linkAddress+'/captcha/build?t='+(new Date().getTime());
	});
	$("#pervd").focus(function(){
		$("#pervd").css("border","1px solid #2284ff");
	});
	$("#pervd").blur(function(){//失去焦点验证图片验证码是否正确
		var perVDvalue=document.getElementById("pervd").value;
		axios.get(linkAddress+'/captcha/validate.json?captcha='+perVDvalue).then(function(res){
			if(res.data.data){
				console.log(res);
				$("#pervdError").css("opacity","0");
				$("#pervd").css("border","1px solid #cbcbcb");
				$("#preSendBg").css("backgroundColor","#2284ff");			
			}else{
				$("#pervdError").css("opacity","1");
				$("#pervd").css("border","1px solid #e15f63");
				$("#preSendBg").css("backgroundColor","#cbcbcb");							
			}
		}).catch(function(error){
			console.log(error);
		});
		checkPreInformation();		
	});
	// // 个人号信息登记“发送验证”按钮
	// $("#preSendBg").click(function() {
	// 	var updateSendBgColor=document.getElementById("preSendBg").style.backgroundColor;
	// 	if (updateSendBgColor=="rgb(34, 132, 255)") {//背景色改变（点击发送验证码）
	// 		axios.post(linkAddress+'/im/sms/captcha/reg.json?mobile='+$("#phoneNum").val()
	// 		+'&captcha='+$("#pervd").val()).then(function(res){
	// 			console.log(res);
	// 			if(res.data.code==2000){
	// 				start(preSendBg);				
	// 			}else{
	// 				alert(res.data.message);
	// 			}
	// 		}).catch(function(error){
	// 			console.log(error);
	// 		});
	// 	}else{
	// 		$("#preSendBg").css("backgroundColor","#cbcbcb");//发送验证按钮颜色改变
	// 	}
	// });
	// // 个人号信息登记短信验证码input
	// $("#perSmsVd").focus(function(){
	// 	$("#perSmsVd").css("border","1px solid #2284ff");
	// });

	// $("#perSmsVd").blur(function(){//短信验证码验证
	// 	$("#perSmsVd").css("border","1px solid #cbcbcb");
	// 	checkPreInformation();
	// });
	// 个人号信息登记"上一步"按钮
	$("#pubNumpreGo").on("click",function(){
		nextGo(perNumberInfro,personalInfor);//前后返回方法调用
		flowPreGo(pubNumVar,pubNumSpan,pubNumP,infroVar,infroSpan,infroP);//流程线方法变化调用
		titleR.innerHTML="个人号主体信息登记";
	});
	// 个人号信息表单验证
	function checkPreInformation(){
		var perCardType=document.getElementsByName("perCardType");//获取身份证类型input
		var radioValue;//1表示二代身份证，2表示临时身份证
		for(var i = 0; i <perCardType.length; i++){
			if(perCardType[i].checked){   
				radioValue=parseInt(perCardType[i].value);
			}   
		}
		var writeName=document.getElementById("writeName");//身份证姓名错误信息
		var writeNum=document.getElementById("writeNum");//身份证号码错误信息
		var pervdError=document.getElementById("pervdError");//图片验证码错误信息
		var phoneError=document.getElementById("phoneError");//手机号码错误信息
		var nextGoBtn=document.getElementById("nextGoPer");//继续按钮		
		if($("#IDcardName").val()!=""&&writeName.style.opacity!=1){//身份证姓名

		}else{
			$("#nextGoPer").css("backgroundColor","#cbcbcb");
			$('#nextGoPer').attr('disabled',"true"); 
			return;
		}
		if($("#IDcardNum").val()!=""&&writeNum.style.opacity!=1){//身份证号码

		}else{
			$("#nextGoPer").css("backgroundColor","#cbcbcb");			
			$('#nextGoPer').attr('disabled',"true"); 
			return;
		}
		if(radioValue==1||radioValue==2){//身份证类型选择

		}else{
			$("#nextGoPer").css("backgroundColor","#cbcbcb");			
			$('#nextGoPer').attr('disabled',"true"); 
			return;
		}		
		if(imgs['正面']){//身份证图片正面

		}else{
			$("#nextGoPer").css("backgroundColor","#cbcbcb");			
			$('#nextGoPer').attr('disabled',"true"); 
			return;
		}
		if(imgs['反面']){//身份证图片反面

		}else{
			$("#nextGoPer").css("backgroundColor","#cbcbcb");			
			$('#nextGoPer').attr('disabled',"true"); 
			return;
		}
		if(imgs['手持']){//身份证图片手持

		}else{
			$("#nextGoPer").css("backgroundColor","#cbcbcb");			
			$('#nextGoPer').attr('disabled',"true"); 
			return;
		}
		if(userId!=null){//扫码id

		}else{
			$("#nextGoPer").css("backgroundColor","#cbcbcb");			
			$('#nextGoPer').attr('disabled',"true"); 
			return;
		}
		if($("#phoneNum").val()!=""&&phoneError.style.opacity!=1){//手机号

		}else{
			$("#nextGoPer").css("backgroundColor","#cbcbcb");			
			$('#nextGoPer').attr('disabled',"true"); 
			return;
		}
		if($("#pervd").val()!=""&&pervdError.style.opacity!=1){//验证码

		}else{
			$("#nextGoPer").css("backgroundColor","#cbcbcb");			
			$('#nextGoPer').attr('disabled',"true"); 
			return;
		}
		// if($("#perSmsVd").val()!=""){//短信验证码

		// }else{
		// 	$("#nextGoPer").css("backgroundColor","#cbcbcb");			
		// 	$('#nextGoPer').attr('disabled',"true"); 
		// 	return;
		// }
		$('#nextGoPer').css("backgroundColor","#2284ff");
		$('#nextGoPer').removeAttr("disabled");		
	}
	// 个人号信息登记"继续"按钮
	$("#nextGoPer").on("click",function(){
		// $(this).css("backgroundColor","#cbcbcb");
		// $(this).attr("disabled",true);
		var go=document.getElementById("nextGoPer");
		if(!go["disabled"]){
			var strEmail = localStorage.getItem('email');	
			getSaveInformation();//获取上个页面的email值
			var perCardType=document.getElementsByName("perCardType");//获取身份证类型input
			var radioValue;//1表示二代身份证，2表示临时身份证
			for(var i = 0; i <perCardType.length; i++){
				if(perCardType[i].checked){   
					radioValue=parseInt(perCardType[i].value);
					console.log(radioValue);
				}   
			}
			var formData = new FormData();
			//向后台传值		
			formData.append("email", strEmail);//邮箱	
			formData.append("captcha",$("#pervd").val());//验证码				
			formData.append("idName",$("#IDcardName").val());//身份证姓名
			formData.append("idNumber",$("#IDcardNum").val());//身份证号码
			formData.append("idType",radioValue);//身份证类型
			formData.append("idImgOne",imgs['正面'],'ps1.jpeg' );//正面身份证照片上传
			formData.append("idImgTwo",imgs['反面'],'ps2.jpeg' );//反面身份证照片上传
			formData.append("idImgThree",imgs['手持'],'ps3.jpeg' );//手持身份证照片上传
			formData.append("phone",$("#phoneNum").val());//手机号
			formData.append("companyName","");//企业名称	
			formData.append("companyNo","");//营业执照注册号
			formData.append("apply","");//申请函	
			formData.append("smscode","");//短信验证码(取消，传空)
			formData.append("userId",userId);//用户id	
			formData.append("type",document.getElementById("perTypeRadio").checked?'1':"2");//选择类型（个人号or企业号）
			axios.post(linkAddress+'/im/public/user/update.json',formData).then(function(res){
				console.log(res);
				console.log(res['data']['code']);
				console.log(formData);
				switch(res.data.code){
					case 2000:
						nextGo(personalInfor,perNumberInfro);
						flowNextGo(infroVar,infroSpan,infroP,pubNumVar,pubNumSpan,pubNumP);
						titleR.innerHTML="";
						break;
					default:
						alert(res.data.message);
						$("#nextGoPer").css("backgroundColor","#2284ff");
						$('#nextGoPer').removeAttr("disabled");
						break;						
				}
			}).catch(function(error){
				console.log(error);
			});			
		}else{
			$('#nextGoPer').attr('disabled',"true"); 					
		}
	});
	// 个人公众号表单验证
	var iscity = false;
	var topdata = false;
	function isInformation(){
		$("#finishPre").css("backgroundColor","#cbcbcb");
		$('#finishPre').attr('disabled',"true"); 					
		if(!iscity){ console.log(iscity+"城市未选中"); return false;}//城市是否被选中
		if(!topdata){console.log(topdata+"头像不存在"); return false;}//头像是否存在
		if($("#perNumName").val()==''||$("#perNumNameError").is(':hidden')){
			console.log($("#perNumNameError").is(':visible'));
			return false;
		}
		if($("#perNumIntroduceText").val()==''||$("#perNumIntroduceError").is(':hidden')){
			console.log($("#perNumIntroduceText").val());
			return false;
		}
		$("#finishPre").css("backgroundColor","#2284ff");
		$('#finishPre').removeAttr("disabled");								
		return true;
	}	
	// 个人号公众号信息名称验证
	$("#perNumName").focus(function(){
		$("#perNumName").css("border","1px solid #2284ff");
	});
	$("#perNumName").blur(function(){
		var perNumNameValue=document.getElementById("perNumName").value; 
	  	var j = 0;
	  	for(var i=0;i<perNumNameValue.length;i++){
		  	j+= /[\u4e00-\u9fa5]/.test(perNumNameValue[i])?2:1;
	  	}
	  	if (j>=4&&j<=32) {
  			$("#perNumNameError").css("opacity","0");
  			$("#perNumName").css("border","1px solid #cbcbcb");
  			$("#perNumNameWain").css("color","#cbcbcb");
  			return true;
  		}else{
  			$("#perNumNameError").css("opacity","1");
  			$("#perNumName").css("border","1px solid #e15f63");
  			$("#perNumNameWain").css("color","#e15f63");
  			return false;
		}
		isInformation();
	});	
	// 个人号公众号信息个人号介绍验证
	$("#perNumIntroduceText").focus(function(){
		$("#perNumIntroduceText").css("border","1px solid #2284ff");
	});
	$("#perNumIntroduceText").blur(function(){
		var SpaceTextValue=document.getElementById("perNumIntroduceText").value;
		if (SpaceTextValue.length<4||SpaceTextValue.length>100) {
			$("#perNumIntroduceError").css("opacity","1");
			$("#perNumIntroduceText").css("border","1px solid #e15f63");
			$("#perNumInWain").css("color","#e15f63");
		}else{
			$("#perNumIntroduceError").css("opacity","0");
			$("#perNumIntroduceText").css("border","1px solid #cbcbcb");
			$("#perNumInWain").css("color","#cbcbcb");		
		}
		isInformation();
	});	
	// 个人号公众号信息头像设置
	$("#perImgUp").on("click",function(){//"上传图片"点击
		$("#Masking").show();
		$("#selectPhoto").show();
	});
	$("#close").on("click",function(){//"关闭"点击
		$("#Masking").hide();
		$("#selectPhoto").hide();
	});
	$("#cancel").on("click",function(){//"取消"点击
		$("#Masking").hide();
		$("#selectPhoto").hide();
	});
	$("#determine").on("click",function(){//"确定"点击 1.10
		$("#Masking").hide();
		$("#selectPhoto").hide();
//		$("#perImgUp").css("background",convertCanvasToImage(canvas));
		document.getElementById('perImgUp').style.background = "url("+convertCanvasToImage(canvas)+")";
		topdata = convertCanvasToImage(canvas);
		document.getElementById('perImgUp').style.backgroundSize = '100% 100%';
		document.getElementById('perImgUp').getElementsByTagName('var')[0].style.display = 'none';
		isInformation();
	})
	// 个人号公众号信息省市两级联动
	var province=document.getElementById('province');
	var city=document.getElementById('city');
	var provinceIndex;
	//省份变化时，地级市变化
	// linkAddress+'/sys/area/all.json'
	axios.get('http://api.zhongxiangim.com/sys/area/all.json').then(function(res){
		console.log(res);
		areajson = res['data']['data'];
		var str = '<option value="none" style="display:none">请选择省份</option>';
		// str += '<option value="shengID">北京市</option>';
		for(var i = 0;i<areajson.length;i++){
			str += '<option value="'+areajson[i]['id']+'">'+areajson[i]['name']+'</option>';
		}
		document.getElementById('comProvince').innerHTML = str;
		document.getElementById('province').innerHTML = str;
	}).catch(function(e){
		console.log(e);
		areajson =null;
		var str = '<option value="none" style="display:none">请选择省份</option>';
		// str += '<option value="shengID">北京市</option>';
		document.getElementById('comProvince').innerHTML = str;
		document.getElementById('province').innerHTML = str;
	});
	province.onchange=function(){
		city.innerHTML='<option value="none" style="display:none">请选择城市</option>';
		// city.innerHTML += '<option value="cityid">东城区</option>';
		provinceIndex=this.selectedIndex-1;//保存所选省份的下标
		var children = areajson[provinceIndex]['children'];
		for(var i=0;i<children.length;i++){
			city.innerHTML += '<option value="'+children[i]['id']+'">'+children[i]['name']+'</option>';
		}
		iscity = false;//1.11
		isInformation();
	}
	city.onchange = function(){
		iscity = true;
		console.log(this.value);
		isInformation();
	}
	// 个人公众号标签id请求
	axios.post(linkAddress+'/im/mark/topic/find/by/type.json?markType=1').then(function(res){
		var mark = res['data']['data'];
		var str = '';
		for(var i=0;i<mark.length;i++){
			str+='<option value="'+mark[i]['id']+'">'+mark[i]['markName']+'</option>';
		}
		$('.marks').html(str);
	}).catch(function(e){
		console.log(e);
	});
	//个人号注册完成按钮
	$('#finishPre').on('click',function(){	
		var finishPreBtn=document.getElementById("finishPre");	
		if(!finishPreBtn["disabled"]){
			$(this).css("backgroundColor","#cbcbcb");
			$(this).attr("disabled",true);
			var strEmail = localStorage.getItem('email');
			var indexs = document.getElementById('markSelect').selectedIndex;
			var opValue = document.getElementById('markSelect').getElementsByTagName('option')[indexs].innerHTML;//标签名
			console.log(opValue);
			var provinceIndex=document.getElementById('province').selectedIndex;
			var provinceValue=document.getElementById('province').getElementsByTagName('option')[provinceIndex].innerHTML;//省份值
			var cityIndex=document.getElementById('city').selectedIndex;
			var cityValue=document.getElementById('city').getElementsByTagName('option')[cityIndex].innerHTML;//城市值
			console.log(provinceValue);//省份值
			console.log(cityValue);	 //城市值
			var formData = new FormData();
			formData.append("email",strEmail);//邮箱
			formData.append("publicName",$("#perNumName").val());//公众号名字
			formData.append("publicText",$("#perNumIntroduceText").val());//公众号简介
			formData.append("markId",$('#markSelect').val());//标签id	(select标签的值)
			formData.append("markName",opValue);//标签名		
			var areaValue={//保存区域值
				provinceValue:provinceValue,
				cityValue:cityValue
			};
			var bec=JSON.stringify(areaValue);
			formData.append("address",bec);//地址		
			formData.append("specificAddress","");//详细地址
			//头像裁切base64转blob
			var preCropImgData =topdata.split(',')[1];
			preCropImgData = window.atob(preCropImgData);
			var ia = new Uint8Array(preCropImgData.length);
			for (var i = 0; i < preCropImgData.length; i++) {
				ia[i] = preCropImgData.charCodeAt(i);
			};
			var Crop =  new Blob([ia], { type:'image/jpeg' });
			formData.append("file",Crop,"cropImg.jpeg");//公众号头像
			axios.post(linkAddress+'/im/public/information/insert.json',formData).then(function(res){
				console.log(res);
				//1.12 跳转
				if(res.data.code==2000){
					var a = document.createElement('a');
					a.href = 'regsuccessuser.html';
					a.click();
				}else{
					alert(res.data.message);
					$("#finishPre").css("backgroundColor","#2284ff");
					$('#finishPre').removeAttr("disabled");
				}	
			}).catch(function(error){
				console.log(error);
			});
		}else{
			$('#finishPre').attr('disabled',"true"); 
			$("#finishPre").css("backgroundColor","#cbcbcb");						
		}
	});





	// 企业号类型点击进入企业信息登记页面(流程线也相应变化)
	$("#comTypeRadio").on("click",function(){
		var comTypeRadio=document.getElementById("comTypeRadio");//企业号选择
		if(comTypeRadio.checked){
			nextGo(types,enterpriseInfor);
			flowNextGo(typeVar,typeSpan,typeP,infroVar,infroSpan,infroP);
			titleR.innerHTML="企业号主体信息登记";
			// 请求加载二维码接口 
			axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
				$("#comQrCode").attr("src",linkAddressTwo+res['data']['data']['path']);
				var preID=JSON.parse(res.data.data.id);
				imgId=preID.id;
			}).catch(function(error){
				console.log(error);
			});
		}
	});
	$('#comQrCode').on('load',function(){//企业号扫码操作
		sweepYard(imgId);
	});
	$('#comhoverShow').click(function(){//企业号二维码更换
		axios.get(linkAddress+'/qrcode.json?t='+(new Date().getTime())).then(function(res){
			$("#comQrCode").attr("src",linkAddressTwo+res['data']['data']['path']);
			var preID=JSON.parse(res.data.data.id);
			console.log(preID);
			imgId=preID.id;
		}).catch(function(error){
			console.log(error);
		});
	});
	// 企业号信息登记表单验证
	function checkComInformation(){
		var comCardType=document.getElementsByName("comCardType");//获取身份证类型input
		var comRadioValue;//1表示二代身份证，2表示临时身份证
		for(var i = 0; i <comCardType.length; i++){
			if(comCardType[i].checked){   
				comRadioValue=parseInt(comCardType[i].value);
			}   
		}
		var comNameError=document.getElementById("comNameError");//企业名称错误信息
		var workNumberError=document.getElementById("workNumberError");//企业营业执照错误信息
		var comManNameError=document.getElementById("comManNameError");//企业管理者姓名错误信息
		var comManIDnumError=document.getElementById("comManIDnumError");//企业管理者身份证号码错误信息
		var comManPhoneError=document.getElementById("comManPhoneError");//企业管理者手机号错误信息
		var comvdError=document.getElementById("comvdError");//企业管理者图片验证码错误信息
		if($("#companyName").val()!=""&&comNameError.style.opacity!=1){//企业名称

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if($("#workNumber").val()!=""&&workNumberError.style.opacity!=1){//企业营业执照

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if(imgs['申请函']){

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if($('#comManName').val()!=""&&comManNameError.style.opacity!=1){

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if($("#comManIDnum").val()!=""&&comManIDnumError.style.opacity!=1){

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if(comRadioValue==1||comRadioValue==2){//企业管理者身份证类型选择

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if(imgs['企业正面']){

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if(imgs['企业反面']){

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if(imgs['企业手持']){

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if(userId!=null){//扫码id
			console.log(userId);
		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if($("#comManPhone").val()!=""&&comManPhoneError.style.opacity!=1){

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		if($("#comVdInput").val()!=""&&comvdError.style.opacity!=1){

		}else{
			$("#comGoOn").css("backgroundColor","#cbcbcb");
			$('#comGoOn').attr('disabled',"true"); 
			return;
		}
		// if($("#comSmsVd").val()!=""){

		// }else{
		// 	$("#comGoOn").css("backgroundColor","#cbcbcb");
		// 	$('#comGoOn').attr('disabled',"true"); 
		// 	return;
		// }
		$("#comGoOn").css("backgroundColor","rgb(34, 132, 255)");
		$('#comGoOn').removeAttr("disabled");							
	}
	// 企业号信息登记企业名称验证
	$("#companyName").focus(function(){
		$("#companyName").css("border","1px solid #2284ff");
	});
	$("#companyName").blur(function(){
		var comNameValue=document.getElementById("companyName").value;
		if (comNameValue=="") {
			$("#comNameError").css("opacity","1");
			$("#companyName").css("border","1px solid #e15f63");
			$("#comNameWain").css("color","#e15f63");
			$("#comNameWain2").css("color","#e15f63");
		}else{
			$("#comNameError").css("opacity","0");
			$("#companyName").css("border","1px solid #cbcbcb");
			$("#comNameWain").css("color","#cbcbcb");
			$("#comNameWain2").css("color","#cbcbcb");
		}
		checkComInformation();
	});	
	// 企业号信息登记营业执照注册号验证
	$("#workNumber").focus(function(){
		$("#workNumber").css("border","1px solid #2284ff");
	});
	$("#workNumber").blur(function(){
		var workNumberValue=document.getElementById("workNumber").value;
		if (workNumberValue.length==15||workNumberValue.length==18) {
			$("#workNumberError").css("opacity","0");
			$("#workNumber").css("border","1px solid #cbcbcb");
			$("#workNumberWain").css("color","#cbcbcb");				
		}else{
			$("#workNumberError").css("opacity","1");
			$("#workNumber").css("border","1px solid #e15f63");
			$("#workNumberWain").css("color","#e15f63");
		}
		checkComInformation();
	});	
	// 企业号信息登记申请函上传
	$("#application").on("change",function(){
		imgPreview(this,applicationImg,application,'申请函');
		checkComInformation();
	});
	// 企业号信息登记管理者身份证姓名
	$("#comManName").focus(function(){
		$("#comManName").css("border","1px solid #2284ff");
	});
	$("#comManName").blur(function(){
		var testValue=/[^\u4e00-\u9fa5]/g;		
		var comManNameValue=document.getElementById("comManName").value;
		if (testValue.test(comManNameValue)||comManNameValue=="") {
			$("#comManNameError").css("opacity","1");
			$("#comManName").css("border","1px solid #e15f63");
			$("#comManNameWain").css("color","#e15f63");				
		}else{
			$("#comManNameError").css("opacity","0");
			$("#comManName").css("border","1px solid #cbcbcb");
			$("#comManNameWain").css("color","#cbcbcb");
		}
		checkComInformation();
	});	
	// 企业号信息登记管理者身份证号码
	$("#comManIDnum").focus(function(){
		$("#comManIDnum").css("border","1px solid #2284ff");
	});
	$("#comManIDnum").blur(function(){
	    card = $("#comManIDnum").val(); 
		checkCard(comManIDnumError,comManIDnum,comManIDnumWain);
		checkComInformation();
	});	
	// 企业号信息登记管理者证件类型
	var comNormal=document.getElementById("comNormal");//企业二代身份证radio
	var comNormalChose=document.getElementById("comNormalChose");
	var comADhoc=document.getElementById("comADhoc");//企业临时身份证radio
	var comADhocChose=document.getElementById("comADhocChose");
	comNormal.onclick=function(){
		cardTypeChose(comNormal,comNormalChose,comADhocChose);
		checkComInformation();
	}
	comADhoc.onclick=function(){
		cardTypeChose(comADhoc,comADhocChose,comNormalChose);
		checkComInformation();
	}
	// 企业号信息登记管理者身份证上传
	$("#comManIDFront").on("change",function(){//正面照片上传
		imgPreview(this,manPreview,comManIDFront,'企业正面');
		checkComInformation();
	});
	$("#comManIDBack").on("change",function(){//反面照片上传
		imgPreview(this,manPreviewBack,comManIDBack,'企业反面');
		checkComInformation();
	});
	$("#comManIDHeld").on("change",function(){//手持照片上传
		imgPreview(this,manPreviewHeld,comManIDHeld,'企业手持');
		checkComInformation();
	});	
	// 企业号信息登记管理者手机号验证
	$("#comManPhone").focus(function(){
		$("#comManPhone").css("border","1px solid #2284ff");
	});
	$("#comManPhone").blur(function(){
		phoneVerify(comManPhone,comManPhoneError,comManPhoneWain);
		checkComInformation();
	});		
	// 企业号信息登记验证码验证
	$("#comshowVd").on("mouseover",function(){
		$("#comnotKnow").show();
	});
	$("#comshowVd").on("mouseout",function(){
		$("#comnotKnow").hide();
	});	
	$("#comshowVd").attr("src",linkAddress+'/captcha/build');
	$("#comshowVd").on("click",function(){//点击更换验证码
		this.src = linkAddress+'/captcha/build?t='+(new Date().getTime());
	});	
	$("#comVdInput").focus(function(){
		$("#comVdInput").css("border","1px solid #2284ff");
	});
	//企业号图片验证码验证
	$("#comVdInput").blur(function(){
		var comVDvalue=document.getElementById("comVdInput").value;
		axios.get(linkAddress+'/captcha/validate.json?captcha='+comVDvalue).then(function(res){
			if(res.data.data==true){
				$("#comvdError").css("opacity","0");
				$("#comVdInput").css("border","1px solid #cbcbcb");
				$("#updateSendBg").css("backgroundColor","#2284ff");			
			}else{
				$("#comvdError").css("opacity","1");
				$("#comVdInput").css("border","1px solid #e15f63");
			}
		}).catch(function(error){
			console.log(error);
		});
		checkComInformation();
	});
	// //企业号发送短信验证码
	// $("#updateSendBg").on("click",function(){
	// 	if ($("#comVdInput").val()!="") {
	// 		axios.post(linkAddress+'/im/sms/captcha/reg.json?mobile='+$("#comManPhone").val()
	// 		+'&captcha='+$("#comVdInput").val()).then(function(res){
	// 			if(res.data.code==2000){
	// 				start(updateSendBg);
	// 			}else{
	// 				alert(res.data.message);
	// 			}
	// 			console.log(res);
	// 		}).catch(function(error){
	// 			console.log(error);
	// 		});
	// 	}else{
	// 		$("#preSendBg").css("backgroundColor","#cbcbcb");										
	// 	}
	// });
	// // 企业号短信验证码input
	// $("#comSmsVd").focus(function(){
	// 	$("#comSmsVd").css("border","1px solid #2284ff");
	// });
	// $("#comSmsVd").blur(function(){
	// 	if ($("#comSmsVd").val()!="") {
	// 		$("#comSmsVd").css("border","1px solid #cbcbcb");		
	// 	}else{
	// 		$("#comSmsVd").css("border","1px solid #e15f63");
	// 	}
	// 	checkComInformation();
	// });
	// 企业号信息登记上一步按钮
	$("#returnTypeCom").on("click",function(){
		nextGo(enterpriseInfor,types);
		flowPreGo(infroVar,infroSpan,infroP,typeVar,typeSpan,typeP);
		titleR.innerHTML="注册";
	});
	// 企业号信息登记"继续"按钮
	$("#comGoOn").on("click",function(){	
		var comGoOnBtn=document.getElementById("comGoOn");
		if(!comGoOnBtn["disabled"]){
			$(this).css("backgroundColor","#cbcbcb");
			$(this).attr("disabled",true);
			var strEmail = localStorage.getItem('email');	
			getSaveInformation();//获取上个页面的email值
			var comCardType=document.getElementsByName("comCardType");//获取身份证类型input
			var radioValue;//1表示二代身份证，2表示临时身份证
			for(var i = 0; i <comCardType.length; i++){
				if(comCardType[i].checked){   
					radioValue=parseInt(comCardType[i].value);
					console.log(radioValue);
				}   
			}
			var formData = new FormData();
			//向后台传值		
			formData.append("email", strEmail);//邮箱
			formData.append("idName",$("#comManName").val());//身份证姓名
			formData.append("captcha",$("#comVdInput").val());//图片验证码			
			formData.append("idNumber",$("#comManIDnum").val());//身份证号码
			formData.append("idType",radioValue);//身份证类型
			formData.append("idImgOne",imgs['企业正面'],'ps4.jpeg' );//正面身份证照片上传
			formData.append("idImgTwo",imgs['企业反面'],'ps5.jpeg' );//反面身份证照片上传
			formData.append("idImgThree",imgs['企业手持'],'ps6.jpeg' );//手持身份证照片上传
			formData.append("userId",userId);//用户id		
			formData.append("phone",$("#comManPhone").val());//手机号
			formData.append("smscode","");//短信验证码
			formData.append("companyName",$("#companyName").val());//企业名称	
			formData.append("companyNo",$("#workNumber").val());//营业执照注册号
			formData.append("apply",imgs['申请函'],'ps7.jpeg');//申请函				
			formData.append("type",document.getElementById("perTypeRadio").checked?'1':"2");//选择类型（个人号or企业号）
			axios.post(linkAddress+'/im/public/user/update.json',formData).then(function(res){
				console.log(res);
				switch(res.data.code){
					case 2000:
						// alert(res.data.message);
						nextGo(enterpriseInfor,comNumberInfro);
						flowNextGo(infroVar,infroSpan,infroP,pubNumVar,pubNumSpan,pubNumP);
						titleR.innerHTML="";
						break;
					case 4000:
						alert(res.data.message);
						$("#comGoOn").css("backgroundColor","#2284ff");
						$('#comGoOn').removeAttr("disabled");
						break;						
				}
			}).catch(function(error){
				console.log(error);
			});	
		}else{
			$('#comGoOn').attr('disabled',"true"); 
			$("#comGoOn").css("backgroundColor","#cbcbcb");
		}
	});
	// 企业公众号表单逻辑验证方法
	function isComInformation(){
		$("#comFinish").css("backgroundColor","#cbcbcb");
		$('#comFinish').attr('disabled',"true"); 					
		if(!iscity){ console.log(iscity+"城市未选中"); return false;}//城市是否被选中
		if(!topdata){console.log(topdata+"头像不存在"); return false;}//头像是否存在
		if($("#comNumName").val()==''||$("#comNumNameError").is(':hidden')){
			console.log($("#comNumNameError").is(':visible'));
			return false;
		}
		if($("#comNumIntroduceText").val()==''||$("#comNumIntroduceError").is(':hidden')){
			console.log($("#comNumIntroduceText").val());
			return false;
		}
		$("#comFinish").css("backgroundColor","#2284ff");
		$('#comFinish').removeAttr("disabled");								
		return true;
	}
	// 企业号公众号信息名称验证
	$("#comNumName").focus(function(){
		$("#comNumName").css("border","1px solid #2284ff");
	});
	$("#comNumName").blur(function(){
		var perNumNameValue=document.getElementById("comNumName").value; 
		var j = 0;
		for(var i=0;i<perNumNameValue.length;i++){
			j+= /[\u4e00-\u9fa5]/.test(perNumNameValue[i])?2:1;
		}
		if (j>=4&&j<=32) {
			$("#comNumNameError").css("opacity","0");
			$("#comNumName").css("border","1px solid #cbcbcb");
			$("#comNumNameWain").css("color","#cbcbcb");
		}else{
			$("#comNumNameError").css("opacity","1");
			$("#comNumName").css("border","1px solid #e15f63");
			$("#comNumNameWain").css("color","#e15f63");
		}
		isComInformation();
	});	
	// 企业号公众号信息企业号介绍验证
	$("#comNumIntroduceText").focus(function(){
		$("#comNumIntroduceText").css("border","1px solid #2284ff");
	});
	$("#comNumIntroduceText").blur(function(){
		var testValue=/[^\u4e00-\u9fa5]/g;
		var SpaceTextValue=document.getElementById("comNumIntroduceText").value;
		if (SpaceTextValue.length<4||SpaceTextValue.length>100||!testValue(SpaceTextValue)) {
			$("#comNumIntroduceError").css("opacity","1");
			$("#comNumIntroduceText").css("border","1px solid #e15f63");
			$("#comNumInWain").css("color","#e15f63");
		}else{
			$("#comNumIntroduceError").css("opacity","0");
			$("#comNumIntroduceText").css("border","1px solid #cbcbcb");
			$("#comNumInWain").css("color","#cbcbcb");		
		}
		isComInformation();
	});
	// 企业号公众号信息头像设置
	$("#comImgUp").on("click",function(){//"企业号上传图片"点击
		$("#comMasking").show();
		$("#comSelectPhoto").show();
	});
	$("#comClose").on("click",function(){//"企业号关闭"点击
		$("#comMasking").hide();
		$("#comSelectPhoto").hide();
	});
	$("#comCancel").on("click",function(){//"企业号取消"点击
		$("#comMasking").hide();
		$("#comSelectPhoto").hide();
	});
	$("#comDetermine").on("click",function(){//"企业号确定"点击
		$("#comMasking").hide();
		$("#comSelectPhoto").hide();
		topdata = convertCanvasToImage(comcanvas);
		document.getElementById('comImgUp').style.background = "url("+topdata+")";
		document.getElementById('comImgUp').style.backgroundSize = '100% 100%';
		document.getElementById('comImgUp').getElementsByTagName('var')[0].style.display = 'none';		
		isComInformation();		
	});
	// 企业号公众号信息省市两级联动
	var comProvince=document.getElementById('comProvince');
	var comCity=document.getElementById('comCity');
	// var area=document.getElementById('area');
	//省份变化时，地级市变化
	comProvince.onchange=function(){
		comCity.innerHTML='<option value="none" style="display:none">请选择城市</option>';
		// comCity.innerHTML += '<option value="cityid">东城区</option>';
		provinceIndex=this.selectedIndex-1;//保存所选省份的下标
		var children = areajson[provinceIndex]['children'];
		for(var i=0;i<children.length;i++){
			comCity.innerHTML += '<option value="'+children[i]['id']+'">'+children[i]['name']+'</option>';
		}
		iscity = false;//1.11
		isComInformation();		
	}
	comCity.onchange = function(){
		iscity = true;//1.11
		isComInformation();	
		console.log(this.value);
	}
	// 企业公众号"上一步"按钮
	$("#pubComNumpreGo").on("click",function(){
		nextGo(comNumberInfro,enterpriseInfor);
		flowPreGo(pubNumVar,pubNumSpan,pubNumP,infroVar,infroSpan,infroP);
		titleR.innerHTML="个人号主体信息登记";
	});
	//企业公众号"完成"按钮
	$("#comFinish").on("click",function(){
		var comFinishClick=document.getElementById("comFinish");
		if(!comFinishClick["disabled"]){
			$(this).css("backgroundColor","#cbcbcb");
			$(this).attr("disabled",true);
			var strEmail = localStorage.getItem('email');//获取邮箱
			var indexs = document.getElementById('comMarkSelect').selectedIndex;
			var opValue = document.getElementById('comMarkSelect').getElementsByTagName('option')[indexs].innerHTML;//标签名
			var provinceIndex=document.getElementById('comProvince').selectedIndex;
			var provinceValue=document.getElementById('comProvince').getElementsByTagName('option')[provinceIndex].innerHTML;//省份值
			var cityIndex=document.getElementById('comCity').selectedIndex;
			var cityValue=document.getElementById('comCity').getElementsByTagName('option')[cityIndex].innerHTML;//城市值
			var formData = new FormData();
			formData.append("publicName",$("#comNumName").val());//公众号名字
			formData.append("email",strEmail);//邮箱
			formData.append("publicText",$("#comNumIntroduceText").val());//公众号简介
			formData.append("markId",$('#comMarkSelect').val());//标签id	
			formData.append("markName",opValue);//标签名	
			//保存企业区域值
			var comArea={
				provinceValue:provinceValue,
				cityValue:cityValue
			};
			var becType=JSON.stringify(comArea);//类型转换
			formData.append("address",becType);//地址				
			formData.append("specificAddress","");//详细地址
			//头像裁切base64转blob
			var preCropImgData =topdata.split(',')[1];
			preCropImgData = window.atob(preCropImgData);
			var ia = new Uint8Array(preCropImgData.length);
			for (var i = 0; i < preCropImgData.length; i++) {
				ia[i] = preCropImgData.charCodeAt(i);
			};
			var Crop =  new Blob([ia], { type:'image/jpeg' });
			formData.append("file",Crop,"cropImg.jpeg");//公众号头像
			axios.post(linkAddress+'/im/public/information/insert.json',formData).then(function(res){
				console.log(res);
				//1.12 跳转
				if(res.data.code==2000){
					var a = document.createElement('a');
					a.href = 'regsuccessqiye.html';
					a.click();
				}else{
					alert(res.data.message);
					$("#comFinish").css("backgroundColor","#2284ff");
					$('#comFinish').removeAttr("disabled");
				}				
			}).catch(function(error){
				console.log(error);
			});
		}else{
			$("#comFinish").css("backgroundColor","#cbcbcb");
			$('#comFinish').attr('disabled',"true"); 		
		}
	});
	// 封装方法--前后返回
	function nextGo(prePage,nextPage){
		prePage.style.display = 'none';
		nextPage.style.display = 'block';
	}
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
		    return;
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
	//canvas画布转换png 1.10
	function convertCanvasToImage(canvas) {
		return canvas.toDataURL("image/png");
	}
});
// 个人号头像上传裁切方法
function selectImg(fileDom){
	//判断浏览器是否支持
	if(window.FileReader){
		var reader = new FileReader();
	}else{
		alert("你的浏览器不支持图片预览功能，请更换浏览器！");
	}
	//获取图片
	var file = fileDom.files[0];
	var imgType = /^image\//;
	//判断是否为图片
	if(!imgType.test(file.type)){
		alert("请选择图片");
		return;
	}
	//获取成功
	reader.onload = function(e){
		var selectImg = document.getElementById('setHeadInput');
		var fileImg = document.getElementById('img1');
		var fileImg2 = document.getElementById('img2');
		var box = document.getElementById('box');
		box.style.display = "none";
		//图片路径设置为获取到的图片
		fileImg.src = e.target.result;
		var img = new Image();
		fileImg.onload = function(){
			// //base64转为blob
			// var	data = reader.result.split(',')[1];
			// data = window.atob(data);
			// var ia = new Uint8Array(data.length);
			// for (var i = 0; i < data.length; i++) {
			// 	ia[i] = data.charCodeAt(i);
			// };
			// var Crop =  new Blob([ia], { type:'image/jpeg' });
			// cropImg = Crop;//赋值
			// console.log(cropImg);
			//初始化图片容器
			this.style.display = "block";
			//获取图片的尺寸
			var imgWidth = this.naturalWidth;
			var imgHeight = this.naturalHeight;
			var imgSize = document.getElementById('setHeadInput').files[0].size;
			//判断图片尺寸是否合格
			if(imgSize>1024*1024*10){
				fileImg.style.display = "none";
				alert("图片尺寸大于10M，选择失败！");
				return false;
			}else if(imgWidth<=200||imgHeight<=200){
				alert("图片尺寸小于200*200，选择失败！");
				fileImg.style.display = "none";
				$("#perFileDeck").css("display","block");
				$("#imgHint").css("display","block");
				return false;
			}else{
				$("#reselect").css('opacity', '1');//重新上传按钮
				$("#imgHint").css("display","none");
				box.style.display = "block";
				fileImg2.src = fileImg.src;
				$("#perFileDeck").css("display","none");
				perImgShow();
				return true;
			}	
		}
	}
	reader.readAsDataURL(file);
}
// 企业号头像上传裁切方法
function comSelectImg(fileDom){
	//判断浏览器是否支持
	if(window.FileReader){
		var reader = new FileReader();
	}else{
		alert("你的浏览器不支持图片预览功能，请更换浏览器！");
	}
	//获取图片
	var file = fileDom.files[0];
	var imgType = /^image\//;
	//判断是否为图片
	if(!imgType.test(file.type)){
		alert("请选择图片");
		return;
	}
	//获取成功
	reader.onload = function(e){
		var selectImg = document.getElementById('comSetHeadInput');
		var fileImg = document.getElementById('comImg1');
		var fileImg2 = document.getElementById('comImg2');
		var box = document.getElementById('comBox');
		box.style.display = "block";
		console.log(fileImg2)
		console.log(fileImg)
		//图片路径设置为获取到的图片
		fileImg.src = e.target.result;
		var img = new Image();
		fileImg.onload = function(){
			// //base64转为blob
			// var	data = reader.result.split(',')[1];
			// data = window.atob(data);
			// var ia = new Uint8Array(data.length);
			// for (var i = 0; i < data.length; i++) {
			// 	ia[i] = data.charCodeAt(i);
			// };
			// var Crop =  new Blob([ia], { type:'image/jpeg' });
			// comCropImg = Crop;//赋值
			// console.log(comCropImg);
			//初始化图片容器
			box.style.display = "block";
			this.style.display = "block";
			//获取图片的尺寸
			var imgWidth = this.naturalWidth;
			var imgHeight = this.naturalHeight;
			var imgSize = document.getElementById('comSetHeadInput').files[0].size;
			//判断图片尺寸是否合格
			if(imgSize>1024*1024*10){
				fileImg.style.display = "none";
				alert("图片尺寸大于10M，选择失败！");
				return false;
			}else if(imgWidth<=200||imgHeight<=200){
				fileImg.style.display = "none";
				alert("图片尺寸小于200*200，选择失败！");
				return false;
			}else{
				$("#comReselect").css('opacity', '1');//重新上传按钮
				$("#comImgHint").css("display","none")
				$("#comFileDeck").css("display","none");
				box.style.display = "block";
				fileImg2.src = fileImg.src;
				comImgShow();
				return true;
			}
		}
	}
	reader.readAsDataURL(file);
}