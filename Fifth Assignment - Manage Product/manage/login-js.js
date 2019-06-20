var tempLogin=[];
var resg=document.getElementById("register");
var login_div=document.getElementById("login_div");

// Function onload
function load() {
	resg.setAttribute("style", "visibility : hidden;");
	var m = localStorage.getItem("login");
	if(m!=null)
	tempLogin = JSON.parse(m);
}

var changedisplay=document.getElementById("changedisplay");
changedisplay.addEventListener("click",function()
{
	resg.setAttribute("style", "visibility : visible;");
	login_div.setAttribute("style", "visibility : hidden;");
});

//Function on login button
var btn=document.getElementById("login_btn");
btn.addEventListener("click", function()
{
	var login_userid=document.getElementById("login_userid").value;
	var login_password=document.getElementById("login_password").value;
	if(tempLogin!=null)
	{
		var i;
		for(i=0;i<tempLogin.length;i++)
		{
			if(tempLogin[i].userid==login_userid)
			{
				if(tempLogin[i].password==login_password)
				{
					var ObjCurrentAccount = new Object();
						ObjCurrentAccount.username=tempLogin[i].username;
						ObjCurrentAccount.userid=tempLogin[i].userid;
						ObjCurrentAccount.password=tempLogin[i].password;
					sessionStorage.setItem("currentAccount_name",ObjCurrentAccount.username);
					sessionStorage.setItem("currentAccount_emailid",ObjCurrentAccount.userid);
					window.open ('showProduct.html','_self',false);
					return ;
					//console.log(ObjCurrentAccount);
				}
				else
				{
					alert("Password is incorrect");
					return ;
				}
			}
		}
		if(i==tempLogin.length)
			alert("Check your details");
	}
	else
	{
		alert("register first");
	}
});

//Function on Register Button
var resgister_btn=document.getElementById("resgister_btn");
resgister_btn.addEventListener("click",function()
{
	var register_name=document.getElementById("register_name").value;
	var register_userid=document.getElementById("register_userid").value;
	var register_password1=document.getElementById("register_password1").value;
	var register_password2=document.getElementById("register_password2").value;
	if(register_name=="" || register_userid=="" || register_password1=="" || register_password2=="")
	{
		alert("Check Details");
		return ;
	}
	if(register_password1!=register_password2)
	{
		alert("Check Password");
	}
	else
	{
		var obj=new Object();
			obj.username=register_name;
			obj.userid=register_userid;
			obj.password=register_password1;
		tempLogin.push(obj);
		var myJSON = JSON.stringify(tempLogin);
		localStorage.setItem("login", myJSON);
		resg.setAttribute("style", "visibility : hidden;");
		login_div.setAttribute("style", "visibility : visible;");
	}

});
