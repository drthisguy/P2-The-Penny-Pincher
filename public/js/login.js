$(document).ready(function() {
  // gather form inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  loginForm.on("submit", event => {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    //login, clear forms
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // login -> redirect
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then( () => {
        window.location.replace("/members");
      })
      .catch( err => {console.log(err)});
  }
});
