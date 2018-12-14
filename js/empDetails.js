$(function() {
$("#answerRadios").click(function() {

    alert("asnser answerRadios")

    var empName = $("#empName").val();
    var empId = $("#empId").val();
    var empMailID = $("#empMailID").val();
    var designation = $("#designation").val();
    var manager_name = $("#manager").val();
    var manager_mail = $("#manager-mail").val();
    var doj = $("#doj").val();


    var empDetails = {
        empName: empName,
        empId: empId,
        empMailID: empMailID,
        designation: designation,
        manager_name: manager_name,
        manager_mail: manager_mail,
        doj: doj
    }



    if (empDetails.empName == "") {
        alert("Please enter the Employee Name");
        return;
    } else if (empDetails.empId == "") {
        alert("Please enter the Employee ID");
        return;
    } else if (empDetails.empMailID == "") {
        alert("Please enter the Employee Email ID");
        return;
    } else if (empDetails.designation == "") {
        alert("Please enter the Employee designation");
        return;
    } else if (empDetails.manager_name == "") {
        alert("Please enter the Manager's Name");
        return;
    } else if (empDetails.manager_mail == "") {
        alert("Please enter the Manager's Mail ID");
        return;
    } else if (empDetails.doj == "") {
        alert("Please enter the Date of Joining");
        return;
    } else {
        localStorage.setItem('empDetails', JSON.stringify(empDetails));
        //displayPage('teamAndCollab')
    }
})

});