var cart=[];
var cartID=1;
var products=[];
var productId=1;
var loginName;
function load() {		//onload function
	var tempArrayProducts = localStorage.getItem("Products");
	loginName=sessionStorage.getItem("currentAccount_name");
	if(loginName==null)
	{
		window.open ('login.html','_self',false)
	}
	else
		console.log("login success");
	var tempArrayCart = localStorage.getItem(loginName+"Carts");
	document.getElementById('login_h1').innerHTML="Hi, "+loginName;
	if(tempArrayProducts!=null)
	{
		products = JSON.parse(tempArrayProducts);
		for(var i=0;i<products.length;i++)
		{
			addtoListDOM(products[i]);
		}
		productId=products.length+1;
	}
	if(tempArrayCart!=null)
	{
		cart= JSON.parse(tempArrayCart);
		cartID=cart.length;
	}
	console.log(products);
}

var logout=document.getElementById('logout');
logout.addEventListener("click",function()
{
	sessionStorage.setItem("currentAccount_name",null);
	sessionStorage.setItem("currentAccount_emailid",null);
	window.open ('login.html','_self',false);
});

// Function to display show product
var divTableProducts = document.getElementById("tableShowProduct");
function addtoListDOM(objProduct) {
	var tr1=document.createElement('tr');

	var td1=document.createElement('td');
	td1.setAttribute("id","productId"+productId);
	td1.innerHTML=objProduct.Id;
	tr1.appendChild(td1);

	var td2=document.createElement('td');
	td2.innerHTML=objProduct.Name;
	td2.setAttribute("id","productName"+productId);
	tr1.appendChild(td2);

	var td3=document.createElement('td');
	td3.innerHTML=objProduct.Price;
	td3.setAttribute("id","productPrice"+productId);
	tr1.appendChild(td3);

	var td4=document.createElement('td');
	td4.setAttribute("id","productInput"+productId);
	var input=document.createElement('input');
	input.setAttribute("type","textbox");
	input.setAttribute("id","input"+productId);
	td4.appendChild(input);
	tr1.appendChild(td4);

	var td5=document.createElement('td');
	var btn=document.createElement('button');
	btn.innerHTML="Add to cart";
	btn.setAttribute("id","btn" +productId);
	td5.appendChild(btn);
	tr1.appendChild(td5);

	btn.addEventListener("click",function(event)
	{
		var selectedProductIndex = td1.innerHTML;
		console.log(selectedProductIndex);
		addToCartArray(selectedProductIndex);
	});
	divTableProducts.appendChild(tr1);
	productId++;
}

function addToCartArray(selectedProductIndex) {
	var objProduct = new Object();
	objProduct.Id = cartID;
	var id=document.getElementById("productId"+selectedProductIndex).innerHTML;
 	objProduct.Name = document.getElementById("productName"+selectedProductIndex).innerHTML;
	objProduct.Price = document.getElementById("productPrice"+selectedProductIndex).innerHTML;
	var quantity=document.getElementById("input"+selectedProductIndex);
	objProduct.Quantity = document.getElementById("input"+selectedProductIndex).value;
	quantity.value="";
	cart.push(objProduct);
	var temp = JSON.stringify(cart);
	localStorage.setItem(loginName+"Carts", temp);	
	cartID++;
	update(id,quantity);
}
function update(id,q)
{
	var new1=products[id-1];
	new1.Quantity=new1.Quantity-q;
	products[id-1]=new1;
	var temp = JSON.stringify(products);
	localStorage.setItem("Products", temp);
}