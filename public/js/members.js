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


//The rest of this code, formats the "Amount" value for currency.  
$("#amount-field").on({
  keyup: function() {
    formatCurrency($(this));
  },
  blur: function() { 
    formatCurrency($(this), "blurred");
  }
});

//format number with comas. 
function formatNumber(number) {
return number.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Adds $ to value, validates decimal places
function formatCurrency(currency, ...args) {

let amount = currency.val();

if (amount === "") { 
  return;
 }
const startLength = amount.length;

//get cursor position 
let cursorPosition = currency.prop("selectionStart");
  
//if there's a decimal
if (amount.indexOf(".") >= 0) {

  
  const decimalLocation = amount.indexOf(".");

  // split number by decimal point
  let wholeNum = amount.substring(0, decimalLocation);
  let decimal = amount.substring(decimalLocation);

  //format both sides
  wholeNum = formatNumber(wholeNum);
  decimal = formatNumber(decimal);
  // Limit decimal digits to 2
  decimal = decimal.substring(0, 2);

  // Amount string with decimal
  amount = `$${wholeNum}.${decimal}`;

} else {
  amount = formatNumber(amount);
  amount = `$${amount}`;

  // ensure decimal + 2 zeros after whole number
  amount = arguments.length > 1 ? `${amount}.00` : amount;
}

// return string to field
currency.val(amount);

// restore cursor
const finalLength = amount.length;
cursorPosition = finalLength - startLength + cursorPosition;
currency[0].setSelectionRange(cursorPosition, cursorPosition);
}


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
