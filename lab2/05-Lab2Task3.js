var student1 = {
    name: "Johnson",
    adminNumber: "123456X",
    contactNumber: 91234567
}

var student2 = {
    name: "David",
    adminNumber: "155223K",
    contactNumber: 81122368
}

function printInfoV1(student) {
    console.log(student.name+" "+student.adminNumber+" "+student.contactNumber);    
}

function printInfoV2(n,a,c) {
    console.log("===============================");
    console.log("Name: "+n);
    console.log("Admin Number: "+a);
    console.log("Contact Number: "+c);
    console.log("===============================");
}

printInfoV1(student1);
printInfoV2(student2.name,student2.adminNumber,student2.contactNumber);