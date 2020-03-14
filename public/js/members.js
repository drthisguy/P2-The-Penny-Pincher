$(document).ready(function() {

  const ui = new UICtrl;

  
  //init datatables
  $("#table").DataTable({ responsive: true });
  
  //init materialize 
  M.AutoInit();
  
  //hide edit state buttons
  ui.hideEditState();
  
  //set global variable in event of a delete
  let editId;
  
  function reloader() {
    location.reload();
   }

  //set default category
  let catInput = $("#category-field");
  catInput.siblings("label").toggleClass("active", true );
  catInput.blur();
  catInput.val('Miscellaneous');

  //listen for new category
  $('li>a.cat').on('click',  function() {
   
  catInput.val($(this).text());       
});

  //set default priority
  let priorInput = $("#priority-field");
  priorInput.siblings("label").toggleClass("active", true );
  priorInput.blur();
  priorInput.val('Medium');

  //listen for new priority
  $('li>a.pri').on('click',  function() {
   
  priorInput.val($(this).text());       
});

//listen for edit btn
$(".edit").on("click",  async function()  {

  ui.startEditState();

  //set data in global variable in case of delete event.
  editId = $(this).data();
 
   currentItem = await ItemCtrl.getItemById(editId.id);

  const edit = {
    name: currentItem.name,
    category: currentItem.category,
    priority: currentItem.priority,
    amount: currentItem.amount
  }
  ui.populate(edit);
})

//listen for cancel edit btn
$("#cancel-btn").on("click", (e) => {
  e.preventDefault();
  ui.hideEditState();
  ui.clearInputs();
})


//listen to amount input field for formatting.  
$("#amount-field").on({
  keyup: function() {
    ui.formatCurrency($(this));
  },
  blur: function() { 
    ui.formatCurrency($(this), "blurred");
  }
});


// add new item to budget
$("#add-btn").on("click", async (e) => {
e.preventDefault();

  //gather any data that may be needed
   const user = await ItemCtrl.getUser();
   user.itemId = null;
  
   ui.dbWrite(user, ItemCtrl.newItem);
   setTimeout(() => reloader(), 650);
});

// update item in budget
$("#update-btn").on("click", async (e) => {
e.preventDefault();

  //gather any data that may be needed
   const user = await ItemCtrl.getUser();
   user.itemId = editId.id;
  
   ui.dbWrite(user, ItemCtrl.updateItem);
   setTimeout(() => reloader(), 650);
});

// delete item in budget
$("#delete-btn").on("click", async (e) => {
  e.preventDefault();
  // const user = await ItemCtrl.getUser();
  itemId = editId
  
  ItemCtrl.deleteItem(itemId);
  setTimeout(() => reloader(), 650);
});


const ItemCtrl = (function(){ 
  return {
    
    getItems: () => $.get("/api/expenses").then(data => data),

    getUser: () => $.get("/api/user_data").then(data => data),

    getItemById: id => $.get(`/api/expenses/${id}`).then(data => data),
    
    newItem: newItem => $.post("/api/expenses", newItem).then(data => data),

    updateItem: chngdItem => {
      $.ajax({
        method: "PUT",
        url: "/api/expenses",
        data: chngdItem
      }).then((data => data))},

    deleteItem: rmItem => {
      $.ajax({
        method: "DELETE",
        url: `/api/expenses/${rmItem.id}`,
        data: rmItem
      }).then((data => data))},
  }
})();

})
