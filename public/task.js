

  function Board ( name ) {

  	this.createdOn= new Date();
  	this.id=this.createdOn.getTime();
  	this.name=name;
  	this.addedCards={};
  	this.container= document.querySelector('.row');
  	this.cardTemplate=document.getElementById("cardTemplate");
  	this.taskTemplate=document.getElementById("taskTemplate");
  	this.createdOn=convertDateTime(this.createdOn);


  }

    function Card ( name ) {
    this.createdOn= new Date();
    this.id=this.createdOn.getTime();
  	this.name=name;
  	this.addedTasks=[];
  	this.createdOn=convertDateTime(this.createdOn);

  }

  var newBoard = new Board("My Board");
  
  function addNewCardToBoard(){

  	var cardName=document.getElementById("cardNameText");
  	
  	if(cardName.value){
  		var newCard= new Card( cardName.value );
  	 	var card = newBoard.cardTemplate.cloneNode(true);
  	 	card.removeAttribute("hidden");
  	 	card.id=newCard.id;

  	 	var btnDelete=createADeleteBtn(newCard.id);

  	 	card.querySelector(".panel-title").innerHTML=cardName.value +' '+ newCard.createdOn ;
  	 	card.querySelector(".panel-title").appendChild(btnDelete);
  	 	card.querySelector(".btn").id=newCard.id;
  	 	cardName.value="";
  	 	newBoard.container.appendChild(card);
  	 	newBoard.addedCards[newCard.id] = newCard ;
  	 	saveDataToLocalStorage();

  	 }
  	 
  }
 	

 	function createADeleteBtn(id){

 		var btnDelete=document.createElement('a');
  	 	btnDelete.setAttribute('href','#');
  	 	btnDelete.style.float='right';
  	 	btnDelete.setAttribute('id',id);
  	 	btnDelete.setAttribute('onclick', 'deleteACard(this.id)');
  	 	btnDelete.innerHTML='&times';
  	 	return btnDelete;
 	}

  	function addNewTaskToBoard( id ){
  		

      	var card=document.getElementById(id);
      	var taskText=card.querySelector(".form-control");
      	if(taskText.value){
      		var task=newBoard.taskTemplate.cloneNode(true);
      		task.removeAttribute("hidden");
      		var tid=new Date().getTime();
      		task.setAttribute('id',tid);
      		var btnDelete=createADeleteBtn(tid);
      		newBoard.addedCards[id].addedTasks.push(taskText.value);
      		task.textContent=taskText.value;
      		task.appendChild(btnDelete);
      		taskText.value="";
      		//console.log(card);
      		card.querySelector(".task").appendChild(task);
      		saveDataToLocalStorage();
      		//console.log(newBoard);

      }
  	}


  	function deleteACard(id){

  		var box=document.getElementById(id);
  		if(newBoard.addedCards[id]){
  			delete newBoard.addedCards[id];
  	    }
  	    else
  	    {
  	    	var cardId=box.parentNode.parentNode.parentNode.id;
  	    	var tasksArray=newBoard.addedCards[cardId].addedTasks;
  	    	console.log(box.textContent);
  	    	var index=tasksArray.indexOf(box.textContent);
  	    	tasksArray.splice(index,1);

  	    }
  	    box.parentNode.removeChild(box);
  		saveDataToLocalStorage();
  	}

  function 	saveDataToLocalStorage () { 
    localStorage.boards = JSON.stringify(newBoard);
  };

    if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
     }

     function loadDataFromLocalStorage(){
     	if(localStorage.boards){
     	var data=JSON.parse(localStorage.boards);
     	newBoard.createdOn=data.createdOn;
     	newBoard.id=data.id;
     	newBoard.addedCards=data.addedCards;
     	//console.log(newBoard);
     	for(key in newBoard.addedCards){

     			var newCard= newBoard.addedCards[key]; 
     			var card = newBoard.cardTemplate.cloneNode(true);
  	 			card.removeAttribute("hidden");
  	 			card.id=newCard.id;
  	 			var btnDelete=createADeleteBtn(newCard.id);
  	 			card.querySelector(".panel-title").textContent=newCard.name + newCard.createdOn;
  	 			card.querySelector(".panel-title").appendChild(btnDelete);
  	 			card.querySelector(".btn").id=newCard.id;
  	 			newBoard.container.appendChild(card);
                   //console.log(newBoard.addedCards[key].addedTasks);
  	 			for(var i=0; i<newBoard.addedCards[key].addedTasks.length; i++){

  	 				var taskText=newBoard.addedCards[key].addedTasks[i];
      				var task=newBoard.taskTemplate.cloneNode(true);
      				task.removeAttribute("hidden");
      				var tid=new Date().getTime();
      				task.setAttribute('id',tid);
      				var btnDelete=createADeleteBtn(tid);
      				task.textContent=taskText;
      				task.appendChild(btnDelete);
      				card.querySelector(".task").appendChild(task);
      				
     			}
    	}
    }
}

    loadDataFromLocalStorage();


    function convertDateTime( date){
    	var h=parseInt(date.getHours());
  	 	var AMPM="AM";
  	 	if(h>12){
  	 		h=h-12;
  	 		AMPM="PM";
  	 	}
  	var ModifiedDate = '('+ h + ':'+ date.getMinutes()+ ' ' + AMPM +','+  date.getDay()+  '/'+ date.getMonth() +'/'+ (date.getFullYear()-2000)+')' ;
    return  ModifiedDate;
    }



    