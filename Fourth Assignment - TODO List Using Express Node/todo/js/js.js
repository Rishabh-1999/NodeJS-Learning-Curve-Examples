var input=document.getElementById('input');
var submit=document.getElementById('submit');
var list = document.getElementById('list');
var getdata=document.getElementById('getdata');
var ENTER_KEY_CODE = 13;
var STATUS_OK = 200;
var opened=0;
var i=1;

getdata.addEventListener('click',function()
{
	list.innerHTML="";
	var xml=new XMLHttpRequest();
	xml.addEventListener('load', function()
	{
		if(xml.status==STATUS_OK)
		{
			var data=JSON.parse(xml.responseText);
			var li=document.createElement('li');
			for(var i=0;i<data.length;i++)
				addtoList(data[i]);
		}
	});
	xml.open('GET','/getData');
	xml.send();
});



function addtoList(obj)
{
	var li=document.createElement('li');
	li.innerHTML=obj.data;
	var btn=document.createElement('button')
	btn.innerHTML="X";
	btn.setAttribute("style", "float:right;")
	btn.onclick=function()
	{
		var xml=new XMLHttpRequest();
		xml.addEventListener('load', function()
		{

		})
	
	xml.open('delete','/deleteData');
	xml.send(JSON.stringify(obj));
	}
	li.appendChild(btn);
	li.setAttribute("id",i);
	i++;
	list.appendChild(li);
}

submit.addEventListener('click',function()
{
	var d=input.value;
		var xml=new XMLHttpRequest();
		var obj=new Object();
		obj.data=input.value;
		xml.open('POST','/putData');
		var arr=[];
		arr.push(obj);
		xml.send(JSON.stringify(arr));
		input.value="";
});

