var gblCustomerId = 0;


$(document).ready(function () {
    fnLoadData();
});


function fnLoadData() {
    $.ajax({
        type: "GET",
        url: "/Customer/GetCustomerList",
        //data: '{name: "' + $("#<%=txtUserName.ClientID%>")[0].value + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.Result == 'OK') {
                let sTableRows = '';
                for (let row of response.Data) {
                    sTableRows += `
                            <tr>
                                <td>${row.CustomerID}</td>
                                <td>${row.ProductID}</td>
                                <td>${row.CustomerName}</td>
                                <td>${row.CustomerNO}</td>
                                <td>${row.Quantity}</td>
                                <td>${row.Total}</td>
                                <td>${row.strDate}</td>

                                <td>
                                    <button type="button" onclick="fnEdit(${row.CustomerID})" class="btn btn-info btn-sm">Edit</button>
                                    <button type="button"  onclick="fnDelete(${row.CustomerID})" class="btn btn-warning btn-sm">Delete</button>
                                </td>
                            </tr>
                        `;
                }
                $('#tblBody').html(sTableRows || `<tr><td colspan="6" style="text-align:center">No data found</td></tr>`);
            } else {
                alert(response.Result);
            }
        },
        failure: function (error) {
            alert(error.d);
        }
    });
}

function fnEdit(Id) {
    //alert(Id);
    window.location.href = "/Customer/UpdateCustomer?customerId=" + Id ;
}

function fnDelete(Id) {
    //alert(Id);
    window.location.href = "/Customer/DeleteCustomer?customerId=" + Id;
}

$("#btnAdd").click(function () {
    window.location.href = "/Customer/CreateCustomer";
});

function fnSearchData() {
    let SearchVal = $("#txtSearch").val();
    //alert(SearchVal);
    $.ajax({
        type: "GET",
        url: "/Customer/IndexSearch?SearchTerm=" + SearchVal,
        //data: '{name: "' + $("#<%=txtUserName.ClientID%>")[0].value + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.Result == 'OK') {
                let sTableRows = '';
                for (let row of response.Data) {
                    sTableRows += `
                            <tr>
                                <td>${row.CustomerID}</td>
                                <td>${row.ProductID}</td>
                                <td>${row.CustomerName}</td>
                                <td>${row.CustomerNO}</td>
                                <td>${row.Quantity}</td>
                                <td>${row.Total}</td>
                                <td>${row.Date}</td>
                                <td>
                                    <button type="button" onclick="fnEdit(${row.CustomerID})" class="btn btn-info btn-sm">Edit</button>
                                    <button type="button"  onclick="fnDelete(${row.CustomerID})" class="btn btn-warning btn-sm">Delete</button>
                                </td>
                            </tr>
                        `;
                }
                $('#tblBody').html(sTableRows || `<tr><td colspan="8" style="text-align:center">No data found</td></tr>`);
            } else {
                alert(response.Result);
            }
        },
        failure: function (error) {
            alert(error.d);
        }
    });
}

function fnClrData() {
    $("#txtSearch").val("");
    //$("#tblBody").html("");
    fnLoadData();
    //alert("hi");
}



