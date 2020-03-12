console.log('hello world');
class UICtrl  {

    constructor() { 
      this.name=  $("#name-field").val().trim(),
      this.amount= $("#amount-field").val().trim(),
      this.category= $("#category-field").val().trim(),
      this.priority= $("#priority-field").val().trim()
      this.addBtn = $('#add');
      this.addBtn = $('#add');
      this.updateBtn = $('#update-btn');
      this.deleteBtn = $('#delete-btn');
      this.cancelBtn = $('#cancel-btn');
      
    }


    addNewItem(user) {
        // const user = await ItemCtrl.getUser(),

       const newItem = {
          // user_id: user.id,
          name:  this.name,
          amount: this.amount.replace(/[$,]/gi, ""),  //remove $ sign and commas,
          category: this.category,
          priority: this.priority
        }
        ItemCtrl.newPost(newItem).then( response => {
        console.log("UICtrl -> addNewItem -> response", response)
         
        }).catch(err => {
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
