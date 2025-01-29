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

$("#btnDelete").click(function () {

    $.ajax({
        type: "POST",
        url: "/Home/DeleteProduct?ProId=" + gblProdid,
        //data: JSON.stringify(productObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response == 'OK') {
                alert(`Record Deleted successfully!`);
                window.location.href = "/Home/Index";
            } else {
                alert(response);
            }

        },
        failure: function (error) {
            alert(error.d);
        }
    });

});


