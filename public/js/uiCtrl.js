
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
          category:$(this.category).val().trim(),
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
      nameField.val(edit.name);
      nameField.blur();

      let categoryField = $("#category-field");
      categoryField.siblings("label").toggleClass("active", true );
      categoryField.val(edit.category);
      categoryField.blur();

      let priorityField = $("#priority-field");
      priorityField.siblings("label").toggleClass("active", true );
      priorityField.val(edit.priority);
      priorityField.blur();

      let amountField = $("#amount-field");
      amountField.siblings("label").toggleClass("active", true );
      amountField.val(edit.amount);
      amountField.blur();

    }

    clearInputs() {
      $(this.name).val("");
      $(this.amount).val("");
      $(this.category).val("Miscellaneous");
      $(this.priority).val("Medium");
    }
}
