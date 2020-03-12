console.log('hello world');
class UICtrl  {

    constructor() { 
      this.addBtn = $('#add'),
      this.addBtn = $('#add'),
      this.updateBtn = $('#update-btn'),
      this.deleteBtn = $('#delete-btn'),
      this.cancelBtn = $('#cancel-btn')
    }


   getUserInput(user, cb) {
        

       const newItem = {
          user_id: user.id,
          name:   $("#name-field").val().trim(),
          amount: $("#amount-field").val().trim().replace(/[$,]/gi, ""),  //remove $ sign and commas,
          category:$("#category-field").val().trim(),
          priority: $("#priority-field").val().trim()
        }
        console.log(newItem);
        cb(newItem).catch(err => {
          if (err.status === 501) {
            console.log('Invalid Input. Please try again');
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
}
