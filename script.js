var cards_dynamic=new Set();    
var subtask = new Map;
var copied_list;
var dynm_donebtn;
var list_template;
var list_item;
var dynm_id;
var list;
var delete_card;
var currentitem;

// functions for modals visibility


function emptyfunction(){
   document.getElementById("emptypara").style.display="none";
}


function box_visible(){
   document.getElementById("addlist_popup").style.display="block";
}


function close_modal(){
   document.getElementById("addlist_popup").style.display="none";
}


function close_modalitem(){
   document.getElementById("additem_popup").style.display="none";
}

function add_taskitems(currentitem) {
   document.getElementById("additem_popup").style.display = "block";
   dynm_id = currentitem;
};


///list creation function

function list_creation(){
   var list_title=document.getElementById("list_name").value;
   object_name_id(list_title);
   close_modal();
   emptyfunction();
}

///object creation for separate id and titles

function object_name_id(title){  
   var card_obj = {
       title: title,
       id: Date.now(),
       subtask
   };
   cards_dynamic.add(card_obj);
   console.log(title);
   addnewlist(card_obj.id);   
};

// list creation   i.e adding cards

function addnewlist(){     
   list_template = document.querySelector(".cards").cloneNode(true);
   card_creation(list_template);
};


function card_creation(list){   
 
   cards_dynamic.forEach(element => {
      list.id=element.id;
      list.querySelector(".card_title").innerHTML=element.title;
      list.setAttribute("value",`${element.id}`);
      list.setAttribute("display","block");
      list.setAttribute("height","300px");
      list.querySelector(".add_btn").setAttribute("value",`${element.id}`);
      list.querySelector(".add_btn").setAttribute("onClick","add_taskitems(this.value);");
      list.querySelector(".delete_btn").setAttribute("value",`${element.id}`);
      list.querySelector(".delete_btn").setAttribute("onClick","removeList(this.value)");   
   });

   list.style.display = "block";
   document.getElementById("cards_container").appendChild(list);
};

function item_creation(){
  
   copied_list = document.querySelector(".subtask_element").cloneNode(true);
   list_item = document.getElementById("item_name").value;
   copied_list.innerText =  list_item; 
   copied_list.style.display = "block";
   copied_list.style.color = 'black';
   copied_list.setAttribute('id',`${Date.now()}`);
   copied_list.setAttribute('value',`${Date.now()}`);
   copied_list.setAttribute('style',"margin-left: 10px; color:black;");


   dynm_donebtn = document.createElement('button');
   dynm_donebtn.setAttribute('id',`mark_complete-${Date.now()}`);
   dynm_donebtn.setAttribute('class','mark_complete_class');
   dynm_donebtn.setAttribute('value',`${Date.now()}`);
   dynm_donebtn.setAttribute('onclick','marking_done(this.value)');
   dynm_donebtn.innerText = ' Done';
   dynm_donebtn.setAttribute('style','font-size:15 px;background-color:#2b5ddc; height:20px; margin-left:10px; border-radius:5px; color: white;width: 40px;border: 2px solid #2b5ddc;cursor:pointer');
   copied_list.appendChild(dynm_donebtn);
   copied_list.setAttribute('onClick',"marking_done(this.value)");
   
   for(obj of cards_dynamic){
       for(property in obj){
           if(obj.id == dynm_id){
               obj.subtask.set(`${list_item}`,`${Date.now()}`);
               break;
           }
       }
   }
   document.getElementById(`${dynm_id}`).getElementsByClassName("add_list_container")[0].appendChild(copied_list).appendChild(dynm_donebtn);
   close_modalitem();
};


/////deleting the lists 

function removeList(currentitem){
   delete_card = document.getElementById(`${currentitem}`);
   for(obj of cards_dynamic){
      for(property in obj){
         if (obj.id==currentitem)
         cards_dynamic.delete(obj);
         break;
      }
   }
   delete_card.parentNode.removeChild(delete_card);
   list_template = 0;
};


////marking items as done

function marking_done(value){
   var b=document.getElementById(`${value}`);
   b.style.textDecoration = "line-through";
   b.style.color = "orangered";
   var a=document.getElementById(`mark_complete-${value}`)
   a.style.backgroundColor="white";
   a.style.width="0px";
   a.style.border="2px solid white";
   a.innerHTML = '';
   a.style.visibility="hidden";
};

