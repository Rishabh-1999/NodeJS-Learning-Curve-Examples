var cart=[];
var cartID=1;
var loginName;
function load()
{
	loginName=sessionStorage.getItem("currentAccount_name");
	if(loginName==null)
	{
		window.open ('login.html','_self',false)
	}
	else
		console.log("login success");
	var text = localStorage.getItem(loginName+"Carts");
	if(text!=null)
	{
		cart = JSON.parse(text);
		for(var i=0;i<cart.length;i++)
		{
			addtoListDOM(cart[i]);
		}
	}
	console.log(cart);
}

var logout=document.getElementById('logout');
logout.addEventListener("click",function()
{
	sessionStorage.setItem("currentAccount_name",null);
	sessionStorage.setItem("currentAccount_emailid",null);
	window.open ('login.html','_self',false);
});

var divTableProducts = document.getElementById("tableShowProduct");

function addtoListDOM(objProduct)
{
	console.log(objProduct);
	var tr1=document.createElement('tr');

	var td1=document.createElement('td');
	td1.innerHTML=cartID;
	tr1.appendChild(td1);

	var td2=document.createElement('td');
	td2.innerHTML=objProduct.Name;
	td2.setAttribute("id","productName"+cartID);
	tr1.appendChild(td2);

	var td3=document.createElement('td');
	td3.innerHTML=objProduct.Price;
	td3.setAttribute("id","productPrice"+cartID);
	tr1.appendChild(td3);

	var td4=document.createElement('td');
	td4.innerHTML=objProduct.Quantity;
	td4.setAttribute("id","productQuantity"+cartID);
	tr1.appendChild(td4);

	var td5=document.createElement('td');
	var deletebtn=document.createElement('button');
	deletebtn.innerHTML="Delete";
	td5.setAttribute("id","deletebtn"+cartID);
	td5.appendChild(deletebtn);
	tr1.appendChild(td5);

	deletebtn.addEventListener("click",function(event) {
		console.log(td1.innerHTML);
		 deleteProduct(getProductIndex(td2.innerHTML,td4.innerHTML));
	  }
	);

	divTableProducts.appendChild(tr1);
	cartID++;
}

function getProductIndex(id,q) {
    for (var i = 0; i < cart.length; i++) {
        if (id.localeCompare(cart[i].Name)==0 && q.localeCompare(cart[i].Quantity)==0) 
			return i;
    }
} 

function deleteProduct(selectedProductIndex)
{
	cart.splice(selectedProductIndex,1);
	console.log(cart);

	var myJSON = JSON.stringify(cart);
	localStorage.setItem(loginName+"Carts", myJSON);
	console.log(selectedProductIndex+"this");
	
	document.location.reload(true)
}
