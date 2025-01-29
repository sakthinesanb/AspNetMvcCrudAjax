
$(document).ready(function () {
    fnLoadData();

    if ($("#hdnNotification").val() != '') {
        alert($("#hdnNotification").val());
    }
});



function fnLoadData() {
    $.ajax({
        type: "GET",
        url: "/Home/GetProductList",
        //data: '{name: "' + $("#<%=txtUserName.ClientID%>")[0].value + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.Result == 'OK') {
                //let sTableRows = '';
                //for (let row of response.Data) {
                //    sTableRows += `
                //        <tr>
                //            <td>${row.ProductID}</td>
                //            <td>${row.ProductNO}</td>
                //            <td>${row.ProductName}</td>
                //            <td>${row.Category}</td>
                //            <td>${row.Price}</td>
                //            <td>
                //                <button type="button" onclick="fnEdit(${row.ProductID})" class="btn btn-info btn-sm">Edit</button>
                //                <button type="button"  onclick="fnDelete(${row.ProductID})" class="btn btn-warning btn-sm">Delete</button>
                //            </td>
                //        </tr>
                //    `;
                //}
                //$('#tblBody').html(sTableRows || `<tr><td colspan="6" style="text-align:center">No data found</td></tr>`);

                fnRenderTblData(response.Data);
            } else {
                alert(response.Result);
            }
        },
        failure: function (error) {
            alert(error.d);
        }
    });
}

function fnRenderTblData(Products) {
    let sTableRows = '';
    for (i = 0; i < Products.length; i++) {
        sTableRows += "<tr>";
        sTableRows += "<td>" + Products[i].ProductID + "</td>";
        sTableRows += "<td>" + Products[i].ProductNO + "</td>";
        sTableRows += "<td>" + Products[i].ProductName + "</td>";
        sTableRows += "<td>" + Products[i].Category + "</td>";
        sTableRows += "<td>" + Products[i].Price + "</td>";
        sTableRows += "<td>";
        sTableRows += "<button type='button' onclick='fnEdit(" + Products[i].ProductID + ")' class='btn btn-info btn-sm'>Edit</button>   ";
        sTableRows += "<button type='button' onclick='fnDelete(" + Products[i].ProductID + ")' class='btn btn-warning btn-sm'>Delete</button>";
        sTableRows += "<td>";
        sTableRows += "<tr>";
    }
    $('#tblBody').html(sTableRows || `<tr><td colspan="6" style="text-align:center">No data found</td></tr>`);
}

//function fnEdit(Id) {
//    /* alert(Id);*/
//    window.location.href = "/Home/Edit?ProId=" + Id;
//}

function fnEdit(Id) {
    /* alert(Id);*/
    window.location.href = "/Home/Create?ProId=" + Id + "&Page=Edit";
}

function fnDelete(Id) {
    /* alert(Id);*/
    window.location.href = "/Home/Create?ProId=" + Id + "&Page=Delete";
}

$("#btnAdd").click(function () {
    window.location.href = "/Home/Create";
});



