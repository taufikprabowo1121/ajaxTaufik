//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();

    $('.datepicker').datepicker({
    format: 'd/mm/yyyy',
    startDate: '-3d'
    });
    var table;
});
//Load Data function
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            /*
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ID + '</td>';
                html += '<td>' + item.LastName + '</td>';
                html += '<td>' + item.FirstName + '</td>';
                html += '<td>' + moment(item.EnrollmentDate).format("D/MM/ YYYY") + '</td>';
                html += '<td align="center"><a href="#" onclick="return getbyID(' +item.ID + ')" class="btn btn-info btn-sm">Edit</a>  <a href="#" onclick="Delete(' + item.ID + ')" class="btn btn-danger btn-sm">Delete</a></td>';
                html += '</tr>';
            });
            $('#example tbody').html(html);
            */
           table =  $('#example').DataTable(
               {
                   "retrieve": true,
                   "processing" : true,
                   "ajax": {
                   "url":"/Home/List",
                   "dataSrc" : ""
                   },
                   
                   "columns": [
                        { "data" : "ID" },
                        { "data" : "FirstName" },
                        { "data" : "LastName" },
                        { "data" : "EnrollmentDate",
                        "render": function (data) { return moment(data).format("D/MM/ YYYY"); }
                        },
                        {
                            "mRender": function (data, type, row) {
                                return '<td align="center"><a href="#" onclick="return getbyID(' + row.ID + ')" class="btn btn-info btn-sm">Edit</a>  <a href="#" onclick="Delete(' + row.ID + ')" class="btn btn-danger btn-sm">Delete</a></td>';
                            }
                        }
                   ]
               }

                );
            
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(EmpID) {
    $('#LastName').css('border-color', 'lightgrey');
    $('#FirstName').css('border-color', 'lightgrey');
    $('#EnrollmentDate').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
        
            $.each(result, function (key, item) {
            $('#ID').val(item.ID);
            $('#LastName').val(item.LastName);
            $('#FirstName').val(item.FirstName);
            $('#EnrollmentDate').val(moment(item.EnrollmentDate).format("D/MM/YYYY"));
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ID: $('#ID').val(),
        LastName: $('#LastName').val(),
        FirstName: $('#FirstName').val(),
        EnrollmentDate: $('#EnrollmentDate').val(),
  
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "benar")
            {
                $('#foryou').removeClass();
                $('#foryou').addClass('alert alert-success alert-dismissable');
                $("#foryou").empty();
                $('#foryou').html("<b>Your Update Success</b>");
                //$('#my-div').fadeTo(2000, 500).slideUp(500, function () { $('#my-div').empty(); $().slideUp(500); });
                $('#foryou').fadeTo(2000, 500).slideUp(500, function () { $('#foryou').empty(); $().slideUp(500); });
            }
            else
            {
                $('#foryou').addClass('alert alert-info alert-dismissable');
                $("#my-div").empty();
                $('#my-div').html("Your Update Failed");
            }

            table.ajax.reload(null, false);
            loadData();
            $('#myModal').modal('hide');
            $('#ID').val("");
            $('#LastName').val("");
            $('#FirstName').val("");
            $('#EnrollmentDate').val("");
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ID: $('#ID').val(),
        LastName: $('#LastName').val(),
        FirstName: $('#FirstName').val(),
        EnrollmentDate: $('#EnrollmentDate').val(),
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "benar")
            {
                $('#foryou').removeClass();
                $('#foryou').addClass('alert alert-success alert-dismissable');
                $("#foryou").empty();
                $('#foryou').html("<b>Your Input Success</b>");
                //$('#my-div').fadeTo(2000, 500).slideUp(500, function () { $('#my-div').empty(); $().slideUp(500); });
                $('#foryou').fadeTo(2000, 500).slideUp(500, function () { $('#foryou').empty(); $().slideUp(500); });
             
                table.ajax.reload(null, false);

               //var table = $('#example').DataTable({
               //     url: "/Home/List"
               //});
               //setInterval(function () {
               //    table.ajax.reload();
               //}, 30000);
               // setTimeout(location.reload.bind(location), 1000);
                loadData();
                $('#myModal').modal('hide');
                
            }
            else
            {
                $('#my-div').text("Input Failed ");
                $('#foryou').addClass('alert alert-warning alert-dismissable');
            }
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                //var myDiv = document.querySelector('#my-div');
         
                //myDiv.dataset.info = "Yeah";
                if (result == "benar") {
                    $('#foryou').removeClass();
                    $('#foryou').addClass('alert alert-info alert-dismissable');
                    $("#foryou").empty();
                    $('#foryou').html("<b>Your Data Deleted</b>");
                    //$('#my-div').fadeTo(2000, 500).slideUp(500, function () { $('#my-div').empty(); $().slideUp(500); });
                    $('#foryou').fadeTo(2000, 500).slideUp(500, function () { $('#foryou').empty(); $().slideUp(500); });
                }
                else
                {
                    alert("Something Wrong");
                }

                table.ajax.reload(null, false);
                loadData();
               
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#LastName').val().trim() == "") {
        $('#LastName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LastName').css('border-color', 'lightgrey');
    }
    if ($('#FirstName').val().trim() == "") {
        $('#FirstName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FirstName').css('border-color', 'lightgrey');
    }
    if ($('#EnrollmentDate').val().trim() == "") {
        $('#EnrollmentDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EnrollmentDate').css('border-color', 'lightgrey');
    }
    return isValid;
}
//Function for clearing the textboxes
function clearTextBox() {
    $('#ID').val("");
    $('#LastName').val("");
    $('#FirstName').val("");
    $('#EnrollmentDate').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#LastName').css('border-color', 'lightgrey');
    $('#FirstName').css('border-color', 'lightgrey');
    $('#EnrollmentDate').css('border-color', 'lightgrey');
}
function confirmationDel()
{
    $('#ID').hidden;
    $('#LastName').hidden;
    $('#FirstName').hidden;
    $('#EnrollmentDate').hidden;
    $('#btnUpdate').hide();
    $('#btnAdd').hide();
    
}

