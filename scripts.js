var usersData = [];
var followersSort = false;
var nameSort = false;
var locationSort = false;
$(document).ready(function(){
	$(".errorMessage").hide();
});

function checkUser(val){
	var flag = 0;
	for(var i=0;i<usersData.length;i++){
		if(val == usersData[i].login){
			flag = 1;
			break;
		}
	}
	if(flag == 1){
		return true;
	}
	else{
		return false;
	}
}

function findUsers(){
	var apiURL = "https://api.github.com/users/";
	var userName = $("#userName").val();
	if(checkUser(userName)){
		$(".errorMessage").show();
		$(".errorMessage").html('User already added');
	}
	else if(userName != ""){
		$.get(apiURL + userName).done(function(data, status){
			$(".errorMessage").hide();
			$("#userName").val("");
			var newUser = {};
			newUser.login = data.login;
			newUser.avatar = data.avatar_url;
			newUser.location = data.location;
			newUser.followers = data.followers;
			newUser.name = data.name;
			newUser.url = data.html_url;
			usersData.push(newUser);
			renderUserList();
	    })
	    .fail(function(){
	    	$(".errorMessage").show();
	    	$(".errorMessage").html('User not found');
	    });
	}
}
function renderUserList(){
	var renderData = "<ul>";
	for(var i=0;i<usersData.length;i++){
		renderData += "<li>"+
				"<a href='"+usersData[i].url+"' target='_blank'>" +
					"<div class='cutUser' onclick='deleteUser("+i+", event)'>x</div>"+
					"<img src='"+usersData[i].avatar+"'>"+
					"<div class='userDetails'>"+
						"<p class='userListName'>"+usersData[i].name+"</p>"+
						"<p><b>Location:</b>"+usersData[i].location+"</p>"+
						"<p><b>Followers:</b>"+usersData[i].followers+"</p>"+
					"</div>"+
				"</a>"+
			"</li>";
	}
	renderData += "<div class='clearfix'></div></ul>";
	$(".userList").html(renderData);
}

function deleteUser(val, event){
	event.preventDefault();
	usersData.splice(val, 1);
	renderUserList();
}

function sortByName(){
	$(".sortByOptions a").removeClass("active");
	$(".sortByOptions a").removeClass("desc");
	$(".sortByOptions a").removeClass("asc");
	$(".sortByOptions a:nth-child(1)").addClass("active");
	nameSort = !nameSort;
	if(nameSort){
		$(".sortByOptions a:nth-child(1)").addClass("asc");
		usersData.sort(function(a, b) {
		    return a.name.localeCompare(b.name);
		});
	}
	else{
		$(".sortByOptions a:nth-child(1)").addClass("desc");
		usersData.sort(function(a, b) {
		    return b.name.localeCompare(a.name);
		});
	}
	renderUserList();
}

function sortByLocation(){
	$(".sortByOptions a").removeClass("active");
	$(".sortByOptions a").removeClass("desc");
	$(".sortByOptions a").removeClass("asc");
	$(".sortByOptions a:nth-child(2)").addClass("active");
	locationSort = !locationSort;
	if(locationSort){
		$(".sortByOptions a:nth-child(2)").addClass("asc");
		usersData.sort(function(a, b) {
		    return a.location.localeCompare(b.location);
		});
	}
	else{
		$(".sortByOptions a:nth-child(2)").addClass("desc");
		usersData.sort(function(a, b) {
		    return b.location.localeCompare(a.location);
		});
	}
	renderUserList();
}

function sortByFollowers(){
	$(".sortByOptions a").removeClass("active");
	$(".sortByOptions a").removeClass("desc");
	$(".sortByOptions a").removeClass("asc");
	$(".sortByOptions a:nth-child(3)").addClass("active");
	followersSort = !followersSort;
	if(followersSort){
		$(".sortByOptions a:nth-child(3)").addClass("asc");
		usersData.sort(function(a, b) {
		    return parseFloat(a.followers) - parseFloat(b.followers);
		});
	}
	else{
		$(".sortByOptions a:nth-child(3)").addClass("desc");
		usersData.sort(function(a, b) {
		    return parseFloat(b.followers) - parseFloat(a.followers);
		});
	}
	renderUserList();
}