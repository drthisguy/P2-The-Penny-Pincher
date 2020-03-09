$(document).ready(function() {

  M.AutoInit();
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    console.log("data", data.id)

    //get list of expenses. 
    $.ajax({ 
      url: `/api/expenses/${data.id}`, 
      method: "GET" 
    })
    .then(function(expenses) {
    console.log("expenses", expenses)
  
          
      }
  )
  });

//The rest of this code, formats the "Amount" value for currency.  
$("#currency").on({
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
console.log("formatCurrency -> currency", currency)

// restore cursor
const finalLength = amount.length;
cursorPosition = finalLength - startLength + cursorPosition;
currency[0].setSelectionRange(cursorPosition, cursorPosition);
}
});
