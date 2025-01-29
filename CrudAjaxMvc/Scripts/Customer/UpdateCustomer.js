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

function fnCustomerData(customer){
    $('#txtProductID').val(customer.ProductID);
    $('#txtCustomerName').val(customer.CustomerName);
    $('#txtCustomerNO').val(customer.CustomerNO);
    $('#txtQuantity').val(customer.Quantity);
    $('#txtTotal').val(customer.Total);
    $('#txtDate').val(customer.strDate);
}
$("#btnUpdateCustomer").click(function () {

    let productID = $('#txtProductID').val();
    let customerName = $('#txtCustomerName').val();
    let customerNO = $('#txtCustomerNO').val();
    let quantity = $('#txtQuantity').val();
    let total = $('#txtTotal').val();
    let date = $('#txtDate').val();


    let customerObj = {
        CustomerID:gblCustomerId,
        ProductID: productID,
        CustomerNO: customerNO,
        CustomerName: customerName,
        Quantity: quantity,
        Total: total,
        Date: date,
    }

    $.ajax({
        type: "POST",
        url: "/Customer/UpdateCustomerData",
        data: JSON.stringify(customerObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.Result == 'OK') {
                //alert(`${response.Data} records updated successfully!`);
                //window.location.href = "/Home/Index";
                window.location.href = "/Customer/Index?Notification=Record updated successfully!";
            } else {
                alert(response.Result);
            }

        },
        failure: function (error) {
            alert(error.d);
        }
    });

});