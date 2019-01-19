
var __userCookie;
var __sesionHash;
var __sesionUrl;
var __sesionTime;

var _client_cookie; function showCookie(name) {
    if (document.cookie !== "") {
        const cookies = document.cookie.split(/; */);
        for (let i=0; i<cookies.length; i++) {
            const cookieName = cookies[i].split("=")[0];
            const cookieVal = cookies[i].split("=")[1];
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }
    }
}

if(showCookie('__umu') != undefined) {
	
	__cookieUser = showCookie('__umu').split('-');
	
}else{	
	var __t = new Date();
	__t.setTime(__t.getTime() + (1000 * 24*60*60*1000));
	var __cookieUser = parseInt(Math.random(1+1000) * 10000000000) + "; expires=" + __t.toGMTString();
	document.cookie = "__umu=" + __cookieUser;
	__cookieUser = showCookie('__umu').split(';')[0];
	
}

if(showCookie('__ums') != undefined) { 

	__sesionId = showCookie('__ums').split('-')[0];
	__sesionHash = showCookie('__ums').split('-')[1];
	console.log('');
}else{
	var __t = new Date();
	var __umId = "__ums=";
	var __sesionId = encodeURIComponent(__t.getMilliseconds() + parseInt(Math.random(1+1000) * 10000000000));
	console.log(__sesionId);
	var __sesionTime = __t.getUTCDate() + ':' + __t.getMonth() + ':' + __t.getFullYear() + "_" + __t.getHours() + ":" + __t.getMinutes() + ":" + __t.getSeconds();
	var __sesionUrl = document.URL;
	var __sesionHash = __umId +__sesionId + "-" + encodeURIComponent(__sesionTime) + "-" + encodeURIComponent(__sesionUrl);
	document.cookie = __sesionHash;
	__sesionHash = showCookie('__ums');
}

var __src = document.createElement('script');
	__src.type = "text/javascript";
	__src.async = true;
	__src.src = "http://example.com/pixel?user_id=" + __cookieUser + "&sesion_id=" + __sesionId + "&sesion=" + __sesionHash + "&urls=" + encodeURIComponent(document.URL);
	document.getElementsByTagName('body')[0].append(__src);
