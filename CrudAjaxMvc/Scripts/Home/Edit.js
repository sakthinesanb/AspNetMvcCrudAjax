var gblProdid = 0;

$(document).ready(function () {
    gblProdid = $("#hdnProdId").val();
    fnLoadData();
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
                alert(`${response.Data} records updated successfully!`);
                window.location.href = "/Home/Index";
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
    $('#txtProductNO').val('');
    $('#txtProductName').val('');
    $('#txtCategory').val('');
     $('#txtPrice').val('');
}