var img = new Image();
var img1 = null;
function perImgShow(){
	document.onselectstart = new Function('event.returnValue=false;');//禁止图片被选中
	var box = document.getElementById('box');
	var rightDiv = document.getElementById('right');//右边触点
	var mainDiv = document.getElementById('main');
	var up = document.getElementById('up');
	var left = document.getElementById('left');
	var down = document.getElementById('down');
	var left_up = document.getElementById('left_up');
	var right_up = document.getElementById('right_up');
	var left_down = document.getElementById('left_down');
	var right_down = document.getElementById('right_down');
	var ifKeyDown = false;//鼠标按下状态
	var contact = "";//表示被按下的触点
	setChoice();
	//鼠标按下事件
	rightDiv.onmousedown = function(e){
		e.stopPropagation();//阻止事件冒泡
		ifKeyDown = true;
		contact = "rightDiv";
	}
	up.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "up";
	}
	left.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "left"
	}
	down.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "down";
	}
	left_up.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "left_up";
	}
	left_down.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "left_down";
	}
	right_up.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "right_up";
	}
	right_down.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "right_down";
	}
	mainDiv.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "box";
	}
	//鼠标松开事件
	window.onmouseup = function(){
		ifKeyDown = false;
		contact = "";
	}
	//鼠标移动事件
	window.onmousemove = function(e){
		if(ifKeyDown){
			switch (contact){
				case "rightDiv":rightMove(e);break;
				case "up":upMove(e);break;
				case "left":leftMove(e);break;
				case "down":downMove(e);break;
				case "left_up":leftMove(e);upMove(e);break;
				case "left_down":leftMove(e);downMove(e);break;
				case "right_up":rightMove(e);upMove(e);break;
				case "right_down":rightMove(e);downMove(e);break;
			}
		}
		setChoice();	
	}
	//选取框按下拖拽事件
	var disX;
	var disY;
	mainDiv.onmousedown = function(e){
		ifKeyDown = true;
		var oEvent = e || event;
		disX = oEvent.clientX - mainDiv.offsetLeft;
		disY = oEvent.clientY - mainDiv.offsetTop;
		document.onmousemove = function(e){
			var oEvent = e || event;
			var l = oEvent.clientX - disX;
			var t = oEvent.clientY - disY;
			if (l < 0) {
				l = 0;
			} else if(l > box.offsetWidth - mainDiv.offsetWidth){
				l = box.offsetWidth - mainDiv.offsetWidth;
			}
			if (t < 0) {
				t = 0;
			} else if(t > box.offsetHeight - mainDiv.offsetHeight){
				t = box.offsetHeight - mainDiv.offsetHeight;
			}
			mainDiv.style.top = t +"px";
			mainDiv.style.left = l +"px";
			setPreview();
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup =null;
		}
		return false;	
	}
	//设置选取区域高亮可见
	function setChoice(){
		var top = mainDiv.offsetTop;
		var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
		var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
		var left = mainDiv.offsetLeft;
		var img2 = document.getElementById('img2');
		img2.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
		setPreview();
	}
	//等比例缩放
	function bili(img,obj){
		var w = Math.round( img.width/obj.offsetWidth*100)/100;
		var h = Math.round(img.height/obj.offsetHeight*100)/100;
		return {"w":w,"h":h};
	}
	//预览函数
	function setPreview(){
		var l = mainDiv.offsetLeft;//选取框左上角的坐标
		var t = mainDiv.offsetTop;
		var tt = right_down.offsetTop - right_up.offsetTop;//选取框的高度
		var ll = right_down.offsetLeft - left_down.offsetLeft;//宽度
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext("2d");
		img1 = document.getElementById('img1');
		var box = document.getElementById('box');
		img.src = img1.src;
		img.onload = function(){
			context.drawImage(img,l*bili(img,box).w,t*bili(img,box).h,ll*bili(img,box).w,tt*bili(img,box).h,0,0,canvas.width,canvas.height);
		}
	}
	//右边移动
	function rightMove(e){
		var x = e.clientX;//鼠标X坐标s
		if (x > getPosition(box).left + box.offsetWidth) {
			x = getPosition(box).left + box.offsetWidth;
		}
		var widthBefore = mainDiv.offsetWidth-2;//选取框变换前的宽度
		var addWidth = "";//鼠标移动后选取框增加的宽度
		addWidth = x - getPosition(mainDiv).left - widthBefore;//鼠标移动后增加的宽度
		mainDiv.style.width = addWidth + widthBefore +"px";//选取框变换后的宽度
	}
	//上边移动
	function upMove(e){
		var y = e.clientY;//鼠标纵坐标
		if(y < getPosition(box).top){
			y = getPosition(box).top;
		}
		var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
		var mainY = getPosition(mainDiv).top;//选取框相对于屏幕上边的距离
		var addHeight = mainY - y;//增加的高度
		mainDiv.style.height = heightBefore + addHeight +"px";
		mainDiv.style.top = mainDiv.offsetTop - addHeight +"px";
	}
	//下边移动
	function downMove(e){
		var y = e.clientY;//鼠标纵坐标
		if(y > getPosition(box).top + box.offsetHeight){
			y = getPosition(box).top + box.offsetHeight
		}
		var heightBefore = mainDiv.offsetHeight - 2;//选取框变换之前的高度
		var mainY = getPosition(mainDiv).top;//选取框相对于父级的高度
		var addHeight = y - heightBefore - mainY;//增加的高度
		mainDiv.style.height = addHeight +heightBefore + "px";
	}
	//左边移动
	function leftMove(e){
		var x = e.clientX;//鼠标的坐标
		if(x < getPosition(box).left){
			x = getPosition(box).left;
		}
		var widthBefore = mainDiv.offsetWidth - 2;//选框变化前的宽度
		var mainX = getPosition(mainDiv).left;
		var addWidth = mainX - x ;//增加的宽度
		mainDiv.style.width = widthBefore + addWidth +"px";//选款变换后的宽度
		mainDiv.style.left = mainDiv.offsetLeft - addWidth +"px";
	}
	//获取元素相对于屏幕左边的距离
	function getPosition(obj){
		var left = obj.offsetLeft;
		var top = obj.offsetTop;
		var parent = obj.offsetParent;
		while(parent != null){
			left += parent.offsetLeft;
			top += parent.offsetTop;
			parent = parent.offsetParent;
			
		}
		return {"left":left,"top":top};
	}
}


function comImgShow(){
	document.onselectstart = new Function('event.returnValue=false;');//禁止图片被选中
//	$('#main').draggable({containment:'pareant',drag:setChoice});
	var box = document.getElementById('comBox');
	var rightDiv = document.getElementById('comright');//右边触点
	var mainDiv = document.getElementById('commain');
	var up = document.getElementById('comup');
	var left = document.getElementById('comleft');
	var down = document.getElementById('comdown');
	var left_up = document.getElementById('comleft_up');
	var right_up = document.getElementById('comright_up');
	var left_down = document.getElementById('comleft_down');
	var right_down = document.getElementById('comright_down');
	var ifKeyDown = false;//鼠标按下状态
	var contact = "";//表示被按下的触点
	setChoice();
	//鼠标按下事件
	rightDiv.onmousedown = function(e){
		e.stopPropagation();//阻止事件冒泡
		ifKeyDown = true;
		contact = "rightDiv";
	}
	up.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "up";
	}
	left.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "left"
	}
	down.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "down";
	}
	left_up.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "left_up";
	}
	left_down.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "left_down";
	}
	right_up.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "right_up";
	}
	right_down.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "right_down";
	}
	mainDiv.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "box";
	}
	//鼠标松开事件
	window.onmouseup = function(){
		ifKeyDown = false;
		contact = "";
	}
	//鼠标移动事件
	window.onmousemove = function(e){
		if(ifKeyDown){
			switch (contact){
				case "rightDiv":rightMove(e);break;
				case "up":upMove(e);break;
				case "left":leftMove(e);break;
				case "down":downMove(e);break;
				case "left_up":leftMove(e);upMove(e);break;
				case "left_down":leftMove(e);downMove(e);break;
				case "right_up":rightMove(e);upMove(e);break;
				case "right_down":rightMove(e);downMove(e);break;
//				case "box":tuo(e);break;
			}
			
		}
		setChoice();
		
	}
	//选取框按下拖拽事件
	var disX;
	var disY;
	mainDiv.onmousedown = function(e){
		ifKeyDown = true;
		var oEvent = e || event;
		disX = oEvent.clientX - mainDiv.offsetLeft;
		disY = oEvent.clientY - mainDiv.offsetTop;
		document.onmousemove = function(e){
			var oEvent = e || event;
			var l = oEvent.clientX - disX;
			var t = oEvent.clientY - disY;
			if (l < 0) {
				l = 0;
			} else if(l > box.offsetWidth - mainDiv.offsetWidth){
				l = box.offsetWidth - mainDiv.offsetWidth;
			}
			if (t < 0) {
				t = 0;
			} else if(t > box.offsetHeight - mainDiv.offsetHeight){
				t = box.offsetHeight - mainDiv.offsetHeight;
			}
			mainDiv.style.top = t +"px";
			mainDiv.style.left = l +"px";
			setPreview();
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup =null;
		}
		return false;
		
	}
	
	//设置选取区域高亮可见
	function setChoice(){
		var top = mainDiv.offsetTop;
		var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
		var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
		var left = mainDiv.offsetLeft;
		var img2 = document.getElementById('comImg2');
		img2.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
		setPreview();
	}
	//等比例缩放
	function bili(img,obj){
		var w = Math.round( img.width/obj.offsetWidth*100)/100;
		var h = Math.round(img.height/obj.offsetHeight*100)/100;
		return {"w":w,"h":h};
	}
	
	//预览函数
	function setPreview(){
		var l = mainDiv.offsetLeft;//选取框左上角的坐标
		var t = mainDiv.offsetTop;
		var tt = right_down.offsetTop - right_up.offsetTop;//选取框的高度
		var ll = right_down.offsetLeft - left_down.offsetLeft;//宽度
		var canvas = document.getElementById('comcanvas');
		var context = canvas.getContext("2d");
		img1 = document.getElementById('comImg1');
		var box = document.getElementById('comBox');
		img.src = img1.src;
		img.onload = function(){
			context.drawImage(img,l*bili(img,box).w,t*bili(img,box).h,ll*bili(img,box).w,tt*bili(img,box).h,0,0,canvas.width,canvas.height);
		}
	}
	//右边移动
	function rightMove(e){
		var x = e.clientX;//鼠标X坐标s
		if (x > getPosition(box).left + box.offsetWidth) {
			x = getPosition(box).left + box.offsetWidth;
		}
		var widthBefore = mainDiv.offsetWidth-2;//选取框变换前的宽度
		var addWidth = "";//鼠标移动后选取框增加的宽度
		addWidth = x - getPosition(mainDiv).left - widthBefore;//鼠标移动后增加的宽度
		mainDiv.style.width = addWidth + widthBefore +"px";//选取框变换后的宽度
	}
	//上边移动
	function upMove(e){
		var y = e.clientY;//鼠标纵坐标
		if(y < getPosition(box).top){
			y = getPosition(box).top;
		}
		var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
		var mainY = getPosition(mainDiv).top;//选取框相对于屏幕上边的距离
		var addHeight = mainY - y;//增加的高度
		mainDiv.style.height = heightBefore + addHeight +"px";
		mainDiv.style.top = mainDiv.offsetTop - addHeight +"px";
	}
	//下边移动
	function downMove(e){
		var y = e.clientY;//鼠标纵坐标
		if(y > getPosition(box).top + box.offsetHeight){
			y = getPosition(box).top + box.offsetHeight
		}
		var heightBefore = mainDiv.offsetHeight - 2;//选取框变换之前的高度
		var mainY = getPosition(mainDiv).top;//选取框相对于父级的高度
		var addHeight = y - heightBefore - mainY;//增加的高度
		mainDiv.style.height = addHeight +heightBefore + "px";
	}
	//左边移动
	function leftMove(e){
		var x = e.clientX;//鼠标的坐标
		if(x < getPosition(box).left){
			x = getPosition(box).left;
		}
		var widthBefore = mainDiv.offsetWidth - 2;//选框变化前的宽度
		var mainX = getPosition(mainDiv).left;
		var addWidth = mainX - x ;//增加的宽度
		mainDiv.style.width = widthBefore + addWidth +"px";//选款变换后的宽度
		mainDiv.style.left = mainDiv.offsetLeft - addWidth +"px";
	}
	//获取元素相对于屏幕左边的距离
	function getPosition(obj){
		var left = obj.offsetLeft;
		var top = obj.offsetTop;
		var parent = obj.offsetParent;
		while(parent != null){
			left += parent.offsetLeft;
			top += parent.offsetTop;
			parent = parent.offsetParent;
			
		}
		return {"left":left,"top":top};
	}
}
