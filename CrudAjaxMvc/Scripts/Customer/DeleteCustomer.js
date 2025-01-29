$("#btnBack").click(function () {
    window.location.href = "/Customer/index";
});

var gblCustomerId = 0;


$(document).ready(function () {
    gblCustomerId = $("#hdncustomerId").val();
    if (gblCustomerId > 0) {
        fnLoadData();
    }   
});


function fnLoadData() {
    $.ajax({
        type: "GET",
        url: "/Customer/GetCustomerList?customerId=" + gblCustomerId,
        //data: '{name: "' + $("#<%=txtUserName.ClientID%>")[0].value + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.Result == 'OK') {

                fnCustomerData(response.Data);
            } else {
                alert(response.Result);
            }
        },
        failure: function (error) {
            alert(error.d);
        }
    });
}

function fnCustomerData(customer) {
    $('#txtProductID').val(customer.ProductID);
    $('#txtCustomerName').val(customer.CustomerName);
    $('#txtCustomerNO').val(customer.CustomerNO);
    $('#txtQuantity').val(customer.Quantity);
    $('#txtTotal').val(customer.Total);
    $('#txtDate').val(customer.strDate);
}

$("#btnDeleteCustomer").click(function () {

    $.ajax({
        type: "POST",
        url: "/Customer/DeleteCustomerData?customerId=" + gblCustomerId,
        //data: JSON.stringify(productObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response == 'OK') {
                //alert(`Record Deleted successfully!`);
                //window.location.href = "/Home/Index";
                window.location.href = "/Customer/Index?Notification=Record Deleted successfully!";

            } else {
                alert(response);
            }

        },
        failure: function (error) {
            alert(error.d);
        }
    });

});