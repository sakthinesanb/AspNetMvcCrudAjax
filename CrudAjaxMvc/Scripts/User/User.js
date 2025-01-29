$(document).ready(function () {
    //fnLogin();
});


$("#btnLogin").click(function () {

    let valTxtUser = $("#txtUser").val();
    let valTxtPass = $("#txtPass").val();
    //alert(valTxtUser, valTxtPass);
    //alert(SearchVal);
    $.ajax({
        type: "POST",
        url: `/User/UserLogin?username=${valTxtUser}&password=${valTxtPass}`,
        //url: '/Login/UserLogin?username=' + valTxtUser + '&password=' + valTxtPass,
        //url: "Login/UserLogin?=" + "username=valTxtUser"& 
        //data: '{name: "' + $("#<%=txtUserName.ClientID%>")[0].value + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            //alert(response.Result);
        },
        failure: function (error) {
            //alert(error.d);
        }
    });
}

//function fnLogin() {
//    let valTxtUser = $("#txtUser").val();
//    let valTxtPass = $("#txtPass").val();
//    alert(valTxtUser + valTxtPass);
//}

$("#btnClr").click(function () {
    fnClear();
});
function fnClear() {
    $("#txtUser").val('');
    $("#txtPass").val('');
}