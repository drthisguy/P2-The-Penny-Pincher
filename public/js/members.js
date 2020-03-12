$(document).ready(function() {

  const ui = new UICtrl;

  //init datatables
  $("#table").DataTable({ responsive: true });

  //init materialize 
  M.AutoInit();

  //hide edit state buttons
  ui.hideEditState();
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    console.log("data", data.id)

    //get list of expenses. 
    $.ajax({ 
      url: "/api/expenses", 
      method: "GET" 
    })
    .then(function(expenses) {
    console.log("expenses", expenses) 
      }
  )
  });

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
$(".edit").on("click", (e) => {
  // e.preventDefault();
  ui.startEditState();
})

//listen for cancel edit btn
$("#cancel-btn").on("click", (e) => {
  e.preventDefault();
  ui.hideEditState();
})

//listen for update btn
$("#update-btn").on("click", () => {
  
  ui.hideEditState();
})

//The rest of this code, formats the "Amount" value for currency.  
$("#amount-field").on({
  keyup: function() {
    formatCurrency($(this));
  },
  blur: function() { 
    formatCurrency($(this), "blured");
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
$("#add").on("click", async (e) => {
  e.preventDefault();
  
   const user = await ItemCtrl.getUser();

  //  newItem = {
  //    user_id: user.id,
  //    name:  $("#name-field").val().trim(),
  //    amount: $("#amount-field").val().trim().replace(/[$,]/gi, ""),  //remove $ sign and commas,
  //    category: $("#category-field").val().trim(),
  //    priority: $("#priority-field").val().trim()
  //  }
  

  ui.getUserInput(user, ItemCtrl.newPost);
  })


const ItemCtrl = (function(){ 
  return {
    
    getItems: () => $.get("/api/expenses").then( data => data),

    getUser: () => $.get("/api/user_data").then(data => data),

    newPost: (newItem) => $.post("/api/expenses", newItem).then(data => data),
    
    updatePost: (changedItem) => $.put("/api/expenses", changedItem).then(data => data),

    deletePost: (rmItem) => $.delete("/api/expenses", rmItem).then(data => data),

  }

})();

})
