console.log("hello world");
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
 
       const newItem = {
          user_id: user.id,
          name:   $(this.name).val().trim(),
          amount: $(this.amount).val().replace(/[$,]/gi, ""),  //remove $ sign and commas,
          category:$(this.category).val().trim(),
          priority: $(this.priority).val().trim()
        }
        console.log(newItem);
        cb(newItem).catch(err => {
          if (err.status === 501) {
            console.log("Invalid Input. Please try again");
          } 
        })
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
}
