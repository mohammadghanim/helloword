$(document).ready(function () {
    
    $('#landingPrivacyPolicy').on('click', function () {
        $('#termsAndConditions').animate({ 'top': '1000px', 'opacity': 0 }, 600);
        $('#privacyPolicy').animate({ 'top': '20px', 'opacity': 1 }, 600);

        return false;
    });
    $('#closeButtonIcon').on('click', function () {
        $('#privacyPolicy').animate({ 'top': '1000px', 'opacity': 0 }, 600);
    });
    $('#landingTermsConditions').on('click', function () {
        $('#privacyPolicy').animate({ 'top': '1000px', 'opacity': 0 }, 600);
        $('#termsAndConditions').animate({ 'top': '20px', 'opacity': 1 }, 600);
        return false;
    });
    $('#closeButtonTermsConditions').on('click', function () {
        $('#termsAndConditions').animate({ 'top': '1000px', 'opacity': 0 }, 600);
    });

    
    $('#btnsend').on('click', function () {
        
       
        var email = document.getElementById('txtnotefie').value;

        var website = email.match(/[^@]*$/);
        var fname = email.match(/.+(?=@)/);
        var comp = email.lastIndexOf(".");
        var company = email.lastIndexOf("@");
        var compname = email.substring(company + 1, comp);

        var JSONObj = [];
        var itememail = {};
        itememail["email"] = email;
        JSONObj.push(itememail);
        var itemfname={};
        itemfname["firstname"] = fname;
        JSONObj.push(itemfname);
        var itemlname = {};

        itemlname["lastname"] = fname;
        JSONObj.push(itemlname);
        var itemwebsite = {};
        itemwebsite["website"] = "www." + website;
        JSONObj.push(itemwebsite);
        var itemcompany = {};
        itemcompany["company"] = compname;
        JSONObj.push(itemcompany);
        var itemphone = {};
        itemphone["phone"] = "555-122-2323";
        JSONObj.push(itemphone);
        var itemcity = {};
        itemcity["city"] = "Cambridge";
        JSONObj.push(itemcity);
        var itemstate = {};
        itemstate["state"] = "MA";
        JSONObj.push(itemstate);
        var itemzip = {};
        itemzip["zip"] = "02139";
        JSONObj.push(itemzip);
       
        
        console.log(JSONObj);
        if (email == "") {
            $('#vaalidationMessage').fadeIn();
            $('.arrow-right').fadeIn();
           

        }
        else {
            var validemail = validateEmail();

            
          if (validemail == false)
          {
              //alert('Please provide a valid email address false returned');
              $('#vaalidationEmailFormat').fadeIn();
              $('.arrow-right').fadeIn();
          }
          else
              {
              $.ajax({
                type: 'POST',
                url: "https://api.hubapi.com/contacts/v1/contact/?hapikey=f9bb2752-614a-437a-a3fe-ff5eb650e539",
                crossDomain: true,
                dataType: 'jsonp',
                  processData:false,
                  contentType: 'application/json;  charset=utf-8"',
                async: true,
                data: { 'properties': JSONObj },
                headers: {
                   

                   
                },
                
              xhrFields: {
                  
              },

                beforeSend: function () {
                   
                    $('#divloading').fadeIn();
                },
                success: function () {
                    alert('success');
                },
                error:alert('error')

            });
          }
        }

    });
    $(document).on('input', '#txtnotefie:text', function () {
        $('#vaalidationMessage').fadeOut();
        $('#vaalidationEmailFormat').fadeOut();
        $('.arrow-right').fadeOut();
    });
});
function validateEmail() {
    var email = document.getElementById('txtnotefie');
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(email.value)) {
        email.focus;
        return false;
    }
    else
    {
        return true;
    }
}
;