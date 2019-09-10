function getCookies(){
	var cook = document.cookie;
	var cooks = cook.split(";");

	for(c in cooks){
		eachCookie = cooks[c];
		var name = eachCookie.split("=")[0];
		var token = eachCookie.split("=")[1];
		//console.log(name);
		if(name == " _JTKN"){
			//console.log(token);
			var JTKN = token;
			return JTKN;
		}

	}
}


function getRequest(auth, req){
	const Http = new XMLHttpRequest();
	const url = "https://api.smartthings.com/" + req;
	Http.open("GET", url, true);
	Http.setRequestHeader("Content-Type", "application/json");
	Http.setRequestHeader("Authorization", "Bearer " + auth);
	Http.send();
	Http.onreadystatechange = (e) =>{
		var resp = Http.responseText;
		var str = JSON.stringify(JSON.parse(resp), null, 2);
		console.log(str)
	}
}


function getLocOnDevPage(){
	links = document.getElementsByTagName("a");
	for(link in links){
		console.log(typeof links[link].href);
		if((links[link].href).includes("location/show")){
			locId = links[link].href.split("/");
			locId = locId[locId.length-1];
			break;
		}
	}
	console.log(locId);
	return locId
}



var addr = window.location.href;
auth = getCookies();

if(addr.includes("/location/show")){
	var locId = document.getElementsByName("id")[0].value;
	var req = "behaviors?locationId=" + locId;
	getRequest(auth, req);
}else if(addr.includes("device/list")){
	locId = getLocOnDevPage()
	var req = "devices?locationId=" + locId;
	getRequest(auth, req);
}else if(addr.includes("device/show")){
	var devId = document.getElementsByName("id")[0].value;
	var locId = getLocOnDevPage()
	var req = "devices/" + devId + "/states?locationId=" + locId;
	getRequest(auth, req);
}else{
}

