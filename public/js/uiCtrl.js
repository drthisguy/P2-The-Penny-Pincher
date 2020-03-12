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
          amount: $(this.amount).val().trim().replace(/[$,]/gi, ""),  //remove $ sign and commas,
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
      $(this.name).val(edit.name);
      $(this.priority).val(edit.priority);
      $(this.category).val(edit.category);
      $(this.amount).val(edit.amount);
    }
}
