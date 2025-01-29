$(document).ready(function () {

});

$("#btnCreate").click(function () {

    //let ProductID = $('#txtProductID').val();
    let CustomerName = $('#txtCustomerName').val();
    let CustomerNO = $('#txtCustomerNO').val();
    let Quantity = $('#txtQuantity').val();
    let Total = $('#txtTotal').val();
    //let Date = $('#txtDate').val();


    let customerObj = {
       // ProductID: ProductID,
        CustomerName: CustomerName,
        CustomerNO: CustomerNO,
        Quantity: Quantity,
        Total: Total,
        //Date: Date,

    }

    $.ajax({
        type: "POST",
        url: "/Customer/CreateCustomerData",
        data: JSON.stringify(customerObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.Result == 'OK') {
                //alert(`${response.Data} Record inserted successfully!`);
                fnClearControls();
                window.location.href = "/Customer/Index";
                alert(`${response.Data} Record inserted successfully!`);
            } else {
                alert(response.Result);
            }

        },
        failure: function (error) {
            alert(error.d);
        }
    });

});


$("#btnClr").click(function () {
    fnClearControls();
});
function fnClearControls() {
    //$('#txtProductID').val('');
    $('#txtCustomerName').val('');
    $('#txtCustomerNO').val('');
    $('#txtQuantity').val('');
    $('#txtTotal').val('');
    $('#txtDate').val('');
}

$("#btnBack").click(function () {
    window.location.href = "/Customer/index";
});