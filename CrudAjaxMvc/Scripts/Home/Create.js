var gblProdid = 0;


$(document).ready(function () {
    gblProdid = $("#hdnProdId").val();
    if (gblProdid > 0) {
         fnLoadData();
    }
});


function fnLoadData() {
    $.ajax({
        type: "GET",
        /* url: "/Home/GetProduct?ProId=" + ProdId,*/
        url: "/Home/GetProductList?ProId=" + gblProdid,
        //data: '{name: "' + $("#<%=txtUserName.ClientID%>")[0].value + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.Result == 'OK') {

                fnProductData(response.Data);
            } else {
                alert(response.Result);
            }
        },
        failure: function (error) {
            alert(error.d);
        }
    });
}

function fnProductData(Product) {
    $('#txtProductNO').val(Product.ProductNO);
    $('#txtProductName').val(Product.ProductName);
    $('#txtCategory').val(Product.Category);
    $('#txtPrice').val(Product.Price);
}

$("#btnAdd").click(function () {

    let productNO = $('#txtProductNO').val();
    let productName = $('#txtProductName').val();
    let category = $('#txtCategory').val();
    let price = $('#txtPrice').val();

    let productObj = {
        ProductNO: productNO,
        ProductName: productName,
        Category: category,
        Price: price,
    }

    $.ajax({
        type: "POST",
        url: "/Home/CreateOrUpdateProduct",
        data: JSON.stringify(productObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.Result == 'OK') {
               // alert(`${response.Data} records inserted successfully!`);
                // fnClearControls();
                window.location.href = "/Home/Index?Notification=Record inserted successfully!";

            }
            else {
                alert(response.Result);
            }

        },
        failure: function (error) {
            alert(error.d);
        }
    });

});


$("#btnUpdate").click(function () {

    let productNO = $('#txtProductNO').val();
    let productName = $('#txtProductName').val();
    let category = $('#txtCategory').val();
    let price = $('#txtPrice').val();

    let productObj = {
        ProductID: gblProdid,
        ProductNO: productNO,
        ProductName: productName,
        Category: category,
        Price: price,
    }

    $.ajax({
        type: "POST",
        url: "/Home/CreateOrUpdateProduct",
        data: JSON.stringify(productObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.Result == 'OK') {
                //alert(`${response.Data} records updated successfully!`);
                //window.location.href = "/Home/Index";
                window.location.href = "/Home/Index?Notification=Record updated successfully!";
            } else {
                alert(response.Result);
            }

        },
        failure: function (error) {
            alert(error.d);
        }
    });

});


$("#btnDelete").click(function () {

    $.ajax({
        type: "POST",
        url: "/Home/DeleteProduct?ProId=" + gblProdid,
        //data: JSON.stringify(productObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response == 'OK') {
                //alert(`Record Deleted successfully!`);
                //window.location.href = "/Home/Index";
                window.location.href = "/Home/Index?Notification=Record Deleted successfully!";

            } else {
                alert(response);
            }

        },
        failure: function (error) {
            alert(error.d);
        }
    });

});

$("#btnBack").click(function () {
    window.location.href = "/Home/Index";
});

$("#btnClr").click(function () {
    fnClearControls();
});
function fnClearControls() {
    $('#txtProductNO').val('');
    $('#txtProductName').val('');
    $('#txtCategory').val('');
    $('#txtPrice').val('');
}