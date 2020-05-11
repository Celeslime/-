// ==UserScript==
// @name         网易云音乐听歌次数
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  为了掌握某人具体听歌次数，于2020/05/11写了这个js脚本
// @author       矰
// @match        https://music.163.com/
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	// 每秒刷新一次
	setInterval(al,1000);
	function al(){
		// 检查是否已经完成
		var check=contentFrame.document.getElementsByClassName("times");
		if(check.length!=0){
			return;
		}
		// 检查能否获取数据
		var list=contentFrame.document.getElementsByClassName("bg");
		if(list.length==0){
			return;
		}
		// 初始化数组 d
		var d=[];
		for(var i=0;i<list.length;i++){
			d[i]=parseInt(list[i].style.width);
		}
		// 寻找最小单位 j
		var len=d.length;
		var j=d[len-1], id=0;
		for(i=len-1;i>=0;i--){
			j=Math.min(j,(d[i]-id)==0?100:d[i]-id);
			id=d[i];
		}
		// 最小单位无效
		if(j==1){
			list[0].outerHTML+='<span class="times f-ff2">多于100次</span>';
			return;
		}
		// 从末尾计算提高精度
		for(i=len-1;i>=0;i--){
			var p=d[i];
			// 四舍五入
			var n=Math.round(p/j);
			list[i].outerHTML+='<span class="times f-ff2">'+n+'次</span>';
			// 调整最小单位
			j=p/n;
		}
	}
})();
