 (function(window, document, undefined)
 {
  var ENTER_KEY_CODE = 13;
  var STATUS_OK = 200;
  var opened=0;

  var list=document.getElementById('list');
  var input=document.getElementById('input');
  var submit=document.getElementById('submit');
  var dataof1=document.getElementById('dataof1');
  var dataof2=document.getElementById('dataof2');
  var dataof3=document.getElementById('dataof3');
  var dataof4=document.getElementById('dataof4');
  var spinner=document.getElementById('spinner');

  // Function to run on submit button 
  submit.addEventListener('click',function(event)
  {
    var index=spinner.selectedIndex;
    var file = spinner.options[index].text;
    addNameToList(file);
  });

  dataof1.addEventListener("click",function()
  {
    var file="/name1";
    bright("1");
    console.log('dataof1 printing');
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() 
    {
      if (request.status === STATUS_OK) {
          var tasks = JSON.parse(request.responseText);
          list.innerHTML="";
          var i=0;
          tasks.forEach(function(task) {
            var li = document.createElement('li');
            li.innerHTML = task.text;
            list.appendChild(li);
            i++;
          });
      } 
     });
    request.open('GET', '/name1');
    request.send();
  });

  dataof2.addEventListener("click",function()
  {
    var file="/name2";
    bright("2");
    console.log('dataof2 printing');
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() 
    {
      if (request.status === STATUS_OK) {
          var tasks = JSON.parse(request.responseText);
          list.innerHTML="";
          var i=0;
          tasks.forEach(function(task) {
            var li = document.createElement('li');
            li.innerHTML = task.text;
            list.appendChild(li);
            i++;
          });
      } 
     });
    request.open('GET', '/name2');
    request.send();
  });

  dataof3.addEventListener("click",function()
  {
    var file="/name3";
    bright("3");
    console.log('dataof3 printing');
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() 
    {
      if (request.status === STATUS_OK) {
          var tasks = JSON.parse(request.responseText);
          list.innerHTML="";
          var i=0;
          tasks.forEach(function(task) {
            var li = document.createElement('li');
            li.innerHTML = task.text;
            list.appendChild(li);
            i++;
          });
      } 
     });
    request.open('GET', '/name3');
    request.send();
  });

  dataof4.addEventListener("click",function()
  {
    var file="/name4";
    bright("4");
    console.log('dataof4 printing');
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() 
    {
      if (request.status === STATUS_OK) {
          var tasks = JSON.parse(request.responseText);
          list.innerHTML="";
          var i=0;
          tasks.forEach(function(task) {
            var li = document.createElement('li');
            li.innerHTML = task.text;
            list.appendChild(li);
            i++;
          });
      } 
     });
    request.open('GET', '/name4');
    request.send();
  });

  function addNameToList(f) 
  {
      var file="/name"+f;
      //console.log(input.value);
      if (input.value) 
      {
      var request = new XMLHttpRequest();
      
      request.addEventListener('load', function() 
      {
        if(opened.localeCompare(f)==0){
         var li = document.createElement('li');
          li.innerHTML = input.value;
          list.appendChild(li);
          input.value="";
        }     
      });
      request.open('POST',file);
      request.send(JSON.stringify({ text: input.value }));
      }
  }

  function bright(open)
  {
    opened=open;
    dataof1.setAttribute("style","background:none;");
    dataof2.setAttribute("style","background:none;");
    dataof3.setAttribute("style","background:none;");
    dataof4.setAttribute("style","background:none;");
    if(open=="1")
      dataof1.setAttribute("style","background:green;");
    else if(open=="2")
      dataof2.setAttribute("style","background:green;");
    else if(open=="3")
      dataof3.setAttribute("style","background:green;");
    else if(open=="4")
      dataof4.setAttribute("style","background:green;");
  }

})(this, this.document);