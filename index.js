firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();

    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
    dialog.close();
    //kad se prvi put prijavi
    var user = firebase.auth().currentUser;
    if(user != null){
      var email = user.username;
      $("#headerEmail").html(username)
    }
  } else {
    // No user is signed in.
  //  alert("Niste prijavljeni!");
  //ako korisnik nije prijavnjen prikazati mu login dio u ovom slucaju je to dialog mada moze i div
     $(".login-cover").show();
     var dialog = document.querySelector('#loginDialog');
     if (! dialog.showModal) {
     dialogPolyfill.registerDialog(dialog);
   }
     dialog.showModal();
  }
});

//lisiner za loginButton
$("#loginButton").click(
    function(){

      var email = $("#loginEmail").val();
      var password = $("#loginPassword").val();
      console.log(email);
      if(email != "" && password != ""){
        //ako nisu prazni dodamo progres bar
        $("#loginProgress").show();
        $("#loginButton").hide();
      }
      $('#loginEmail').val("");
      $('#loginPassword').val("");
      firebase.auth().signInWithEmailAndPassword(email, password).catch( function(error) {
          $("#loginError").show().text(error.message);

          $("#loginProgress").hide();
          $("#loginButton").show();


});

    }
  );


//lisiner za logoutButto
$("#logoutButton").click(
    function(){
      firebase.auth().signOut().then(function() {
            // Sign-out successful.

            $("#loginProgress").hide();
            $("#loginButton").show();
            $("#loginError").hide();
          }).catch(function(error) {
            // An error happened.
            alert(error.message);
});
    }
  );
