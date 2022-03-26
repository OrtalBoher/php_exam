// jQuery snippet which listens for a submit function
//checks to see if the Bootstrap validator has found an issue and stopped it from processing.

$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();

    //Initiate an AJAX object within jQuery
    $.ajax({
        type: "POST",
        url: "api.php",
        data: "name=" + name + "&email=" + email + "&phone=" + phone,
        success: function (text) {
            if (text == "success") {
                formSuccess();
            } else {
                formError();
                submitMSG(false, text);
            }
        }
    });
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}


