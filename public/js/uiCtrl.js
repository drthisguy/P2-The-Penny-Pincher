
class UICtrl  {

    constructor() { 
      this.name = "#name-field",
      this.amount = "#amount-field",
      this.category = "#category-field",
      this.priority = "#priority-field",
      this.addBtn = $("#add-btn"),
      this.updateBtn = $("#update-btn"),
      this.deleteBtn = $("#delete-btn"),
      this.cancelBtn = $("#cancel-btn")
    }


   dbWrite(user, cb) {
 
       const item = {
          id: user.itemId,
          user_id: user.id,
          name:   $(this.name).val().trim(),
          amount: $(this.amount).val().replace(/[$,]/gi, ""),  //remove $ sign and commas,
          category: $(this.category).val().trim(),
          priority: $(this.priority).val().trim()
        }
        console.log("UICtrl -> dbWrite -> item", item)
        
        cb(item);
    }

    startEditState() {
        this.updateBtn.show();
        this.cancelBtn.show();
        this.deleteBtn.show();
        this.addBtn.hide();
    }

    hideEditState() {
        this.updateBtn.hide();
        this.cancelBtn.hide();
        this.deleteBtn.hide();
        this.addBtn.show();
    }

    populate(edit) {
      
      let nameField = $("#name-field");
      nameField.siblings("label").toggleClass("active", true );
      nameField.blur();
      nameField.val(edit.name);

      let categoryField = $("#category-field");
      categoryField.siblings("label").toggleClass("active", true );
      categoryField.blur();
      categoryField.val(edit.category);

      let priorityField = $("#priority-field");
      priorityField.siblings("label").toggleClass("active", true );
      priorityField.blur();
      priorityField.val(edit.priority);

      let amountField = $("#amount-field");
      amountField.siblings("label").toggleClass("active", true );
      amountField.blur();
      amountField.val(edit.amount);

    }

    clearInputs() {
      $(this.name).val("");
      $(this.amount).val("");
      $(this.category).val("Miscellaneous");
      $(this.priority).val("Medium");
    }

    formatAmount(number) {
      return number.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    //formats the "Amount" value for currency.
    formatCurrency(currency, ...arg) {
            
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
        wholeNum = this.formatAmount(wholeNum);
        decimal = this.formatAmount(decimal);
        // Limit decimal digits to 2
        decimal = decimal.substring(0, 2);

        // Amount string with decimal
        amount = `$${wholeNum}.${decimal}`;

      } else {
        amount = this.formatAmount(amount);
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

          
}
