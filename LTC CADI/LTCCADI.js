
/*
Created by Matthew Paul. For questions, please contact me at Matthew.Paul@CNOInc.com. Thank you.
*/

// Here, I declare a global array which I will use to pass the secondary authorization variables.
var SecondAuth = {};
SecondAuth.type = "";
SecondAuth.surrender = "";
SecondAuth.sla = "";
SecondAuth.ID = "";
SecondAuth.DocID = "";
SecondAuth.AssignmentType = "";
SecondAuth.PolNumCheck = "";
SecondAuth.SSNCheck = "";

// This variable is designed to hold the text from the checkboxes to process into the wrapup.
var VariableArray = {};
VariableArray.one = "";
VariableArray.two = "";
VariableArray.three = "";
VariableArray.four = "";
VariableArray.five = "";
VariableArray.six = "";
VariableArray.seven = "";
VariableArray.eight = "";
VariableArray.nine = "";
VariableArray.ten = "";

// This is to keep reps from hitting the "Escape" key and accidentally deleting the whole CADI.
var noEscape = {};

// This is where the health verification process will be.
function VerifyAllInfo() {

    // Lets declare our variables!

    // Now, the policy number.
    var PolNum = document.forms["validate"]["PolicyNumberText"].value;
    // The callers name.
    var CallName = document.forms["validate"]["CallersNameText"].value;
    // The relationship.
    var Relation = document.forms["validate"]["RelationshipListbox"].value;
    // The radio button choice
    var Radio = document.forms["validate"]["RadioButton"].value;
    // The SSN
    var SSN = document.forms["validate"]["SSNText"].value;
    SSN = SSN.length;
    // The Insureds Name Checkbox
    var InsuredNameCheck = document.forms["validate"]["InsuredNameText"].checked;
    // The Insureds DOB Checkbox
    var InsuredDOBCheck = document.forms["validate"]["InsuredDOBText"].checked;
    // The Secondary Auth Type
    var SecondAuth = document.forms["validate"]["SecondaryAuthListbox"].value;
    // The Secondary Auth DocID
    var DocID = document.forms["validate"]["SecondaryAuthText"].value;
    DocID = DocID.length;
    // The CTI Qualified Checkbox
    var CTI = document.forms["validate"]["CTIQualified"].checked;
    // The Transferred Checkbox
    var Transfer = document.forms["validate"]["Transferred"].checked;

    if (PolNum != "" && CallName != "" && (Relation == "Insured" || Relation == "Covered Dependent") && (CTI == true || Transfer == true || (Radio == 1 || Radio == 2 && SSN == "4") && InsuredNameCheck == true && InsuredDOBCheck == true)) {
        document.getElementById("InfoYes").innerHTML = "&#8226;All (except as specifically listed)";
        document.getElementById("InfoNo").innerHTML = "&#8226;A guarantee of days the claim will be processed \n &#8226;A guarantee of what will be covered under the policy (i.e., pre-approval) \n  &#8226;Full SSN #";
        document.getElementById("Variable").innerHTML = "Verified";
    }
    else if (PolNum != "" && CallName != "" && Relation == "POA of Insured" && SecondAuth == "Valid CIR on file for caller*" && DocID != "0" && (CTI == true || Transfer == true || (Radio == 1 || Radio == 2 && SSN == "4") && InsuredNameCheck == true && InsuredDOBCheck == true)) {
        document.getElementById("InfoYes").innerHTML = "&#8226;All (except as specifically listed)";
        document.getElementById("InfoNo").innerHTML = "&#8226;A guarantee of days the claim will be processed \n &#8226;A guarantee of what will be covered under the policy (i.e., pre-approval) \n &#8226;Full SSN #";
        document.getElementById("Variable").innerHTML = "Verified";
    }
    else if (PolNum != "" && CallName != "" && Relation == "Policy Owner" && (CTI == true || Transfer == true || (Radio == 1 || Radio == 2 && SSN == "4") && InsuredNameCheck == true && InsuredDOBCheck == true)) {
        document.getElementById("InfoYes").innerHTML = "&#8226; Policy Information:    \n &#8226; Policy Coverage (Cancer, Heart, Accident, Critical Illness, etc.)    \n &#8226;Premium Amounts    \n &#8226;Premium Due Dates    \n &#8226;Policy Status \n &#8226;Information in a letter or EOB addressed to the Policy Owner  \n &#8226;Claims Received Dates  \n &#8226;Claims Paid Dates  \n &#8226;Claim Dollar Amounts  \n &#8226;Policy Maximum  \n &#8226;Maximum benefit for any one period of expense  \n &#8226;Policy Balance";
        document.getElementById("InfoNo").innerHTML = "&#8226;A guarantee of days the claim will be processed  \n &#8226;A guarantee of what will be covered under the policy (i.e., pre-approval) \n &#8226;Full SSN #  \n &#8226;If Policy Owner calling about covered dependent&#42;, do not provide Health Status/Condition:    \n &#8226;Diagnosis    \n &#8226;Assessment Scores    \n &#8226;Medical Records  \n &#8226; Payment for health services provided to the Insured  \n &#8226; Provider name, dates of service and activities    \n &#42; Legal guardians, conservators and parents of minor children are entitled to all information pertaining to those for whom they have a legal responsibility.";
        document.getElementById("Variable").innerHTML = "Verified";
    }
    else if (PolNum != "" && CallName != "" && Relation == "Spouse/Family" && (Transfer == true || (Radio == 1 || Radio == 2 && SSN == "4") && InsuredNameCheck == true && InsuredDOBCheck == true)) {
        document.getElementById("InfoYes").innerHTML = "Minimum amount necessary to accomplish the intended purpose of the request:   \n &#8226; Policy information:    \n &#8226; Policy Coverage (Cancer, Heart, Accident, Critical Illness, etc.)    \n &#8226; Premium amounts    \n &#8226; Premium Due Dates    \n &#8226; Policy Status  \n &#8226; Claims Received Dates  \n &#8226; Claims Paid Dates";
        document.getElementById("InfoNo").innerHTML = "&#8226;A guarantee of days the claim will be processed  \n &#8226;A guarantee of what will be covered under the policy (i.e., pre-approval)  \n &#8226;Full SSN #  \n &#8226;If calling about covered insured, do not provide Health Status/Condition:    \n &#8226;Diagnosis    \n &#8226;Assessment Scores    \n &#8226;Medical Records  \n &#8226; Payment for health services provided to the Insured  \n &#8226; Provider name, dates of service and activities  \n &#8226; Policy Maximum  \n &#8226; Maximum benefit for any one period of expense  \n &#8226; Policy Balance";
        document.getElementById("Variable").innerHTML = "Verified";
    }
    else if (PolNum != "" && CallName != "" && Relation == "Third Party/Other" && SecondAuth == "Verbal Auth from Insured" && (Radio == 1 || Radio == 2 && SSN == "4") && InsuredNameCheck == true && InsuredDOBCheck == true) {
        document.getElementById("InfoYes").innerHTML = "&#8226; Only information that has been authorized by the PolicyOwner via verbal authorization";
        document.getElementById("InfoNo").innerHTML = "&#8226;A guarantee of days the claim will be processed  \n &#8226;A guarantee of what will be covered under the policy (i.e., pre-approval)  \n &#8226;Full SSN #  \n &#8226; Information that has not been authorized by the PolicyOwner via verbal authorization";
        document.getElementById("Variable").innerHTML = "Verified";
    }
    else if (PolNum != "" && CallName != "" && Relation == "Third Party/Other" && SecondAuth == "Valid CIR on file for caller*" && DocID != "0" && (Radio == 1 || Radio == 2 && SSN == "4") && InsuredNameCheck == true && InsuredDOBCheck == true) {
        document.getElementById("InfoYes").innerHTML = "&#8226; Only information that has been authorized by the PolicyOwner via the Third Party Authorization form";
        document.getElementById("InfoNo").innerHTML = "&#8226;A guarantee of days the claim will be processed &#8226;A guarantee of what will be covered under the policy (i.e., pre-approval)  \n &#8226;Full SSN # &#8226; Information that has not been authorized by the PolicyOwner via the Third Party Authorization form";
        document.getElementById("Variable").innerHTML = "Verified";
    }
    else {
        document.getElementById("InfoYes").innerHTML = "&#8226; What is needed to file a claim  \n &#8226; What the generic policy covers (nursing home, HHC, etc.)  \n &#8226; Elimination period";
        document.getElementById("InfoNo").innerHTML = "&#8226; Policy Maximum  \n &#8226; Maximum benefit for any one period of expense  \n &#8226; Policy balance  \n &#8226; Health Status/Condition    \n &#8226; Diagnosis    \n &#8226; Assessment Scores    \n &#8226; Medical Records  \n &#8226; Policy Information:    \n &#8226; Policy Coverage    \n &#8226; Premium Amounts    \n &#8226; Premium Due Dates    \n &#8226; Policy Status  \n &#8226; Claims Received Dates  \n &#8226; Claims Paid Dates";
        document.getElementById("Variable").innerHTML = "Not Verified";
    }
}

function validateOther() {

    // The callers name variable.
    var CallName = document.forms["validate"]["CallersNameText"].value;
    // The relationship variable.
    var Relation = document.forms["validate"]["RelationshipListbox"].value;
}

function AddToWrapUp(name) {
    var CADI = document.forms["validate"]["CADIText"].value;
    document.getElementById("CADIText").innerHTML = CADI + name + " // ";
}

function AddToCADI() {

    // Lets declare our variables!

    // First stop, the overarching variable.
    var CADI;
    // Now, the policy number.
    var PolNum = document.forms["validate"]["PolicyNumberText"].value;
    // The callers name.
    var CallName = document.forms["validate"]["CallersNameText"].value;
    // The relationship.
    var Relation = document.forms["validate"]["RelationshipListbox"].value;
    if (Relation == "Policy Owner/Patient" || Relation == "Policy Owner/Non-Patient") {
        Relation = "Policy Owner";
    }
    else if (Relation == "Spouse/Patient" || Relation == "Spouse/Non-Patient") {
        Relation = "Spouse";
    }
    else if (Relation == "Dependant/Patient" || Relation == "Dependant/Non-Patient") {
        Relation = "Dependant";
    }
    else {
    }
    // The radio button choice
    var Radio = document.forms["validate"]["VerifyRadio"].value;
    // The Insureds Name Checkbox
    var InsuredNameCheck = document.forms["validate"]["InsuredNameText"].value;
    // The Insureds DOB Checkbox
    var InsuredNameCheck = document.forms["validate"]["InsuredDOBText"].value;
    // The CTI Qualified Checkbox
    var CTI = ""
    // The Transferred Checkbox
    var Transfer = ""
    // The CTI Qualified Checkbox
    var CTICheck = document.forms["validate"]["CTIQualified"].checked;
    if (CTICheck == true && (Relation == "Policy Owner/Patient" || Relation == "Policy Owner/Non-Patient")) {
        CTI = document.forms["validate"]["CTIQualified"].value;
    }
    // The Transferred Checkbox
    var TransferCheck = document.forms["validate"]["Transferred"].checked;
    if (TransferCheck == true) {
        Transfer = document.forms["validate"]["Transferred"].value;
    }
    // The Secondary Auth Type
    var SecondAuth = "";
    var SecondaryAuth = document.forms["validate"]["SecondaryAuthListbox"].value;
    if (SecondaryAuth != "") {
        SecondAuth = "  || Secondary Authorization: " + SecondaryAuth;
    }
    // The Secondary Auth DocID
    var DocID = document.forms["validate"]["SecondaryAuthText"].value;
    // Lastly, whether or not the caller was verified
    var Verified = document.forms["AuthorizedInfo"]["Variable"].value;

    CADI = "Policy Number: " + PolNum + " || " + CallName + " || " + "(" + Relation + ") || " + Verified + SecondAuth + " " + DocID + " || " + CTI + Transfer;
    window.clipboardData.setData('text', CADI + document.getElementById('CADIText').innerText);

    CheckFields();
}


//Let's make sure that we didn't forget to input the Policy Number, Caller Name, and Relationship
function CheckFields() {

    // Now, the policy number.
    var PolNum = document.forms["validate"]["PolicyNumberText"].value;
    // The callers name.
    var CallName = document.forms["validate"]["CallersNameText"].value;
    // The relationship.
    var Relation = document.forms["validate"]["RelationshipListbox"].value;
    if (Relation == "Policy Owner/Patient" || Relation == "Policy Owner/Non-Patient") {
        Relation = "Policy Owner";
    }
    else if (Relation == "Spouse/Patient" || Relation == "Spouse/Non-Patient") {
        Relation = "Spouse";
    }
    else if (Relation == "Dependant/Patient" || Relation == "Dependant/Non-Patient") {
        Relation = "Dependant";
    }
    else {
    }

    if (PolNum == "") {
        var TempPolNum = prompt("Please enter a policy number.", "");
        document.forms["validate"]["PolicyNumberText"].value = TempPolNum;
    }
    if (CallName == "") {
        var TempCallName = prompt("Please enter a caller name.", "");
        document.forms["validate"]["CallersNameText"].value = TempCallName;
    }
    if (Relation == "") {
        alert("Please enter a relationship.");
    }
    else {
    }
}



/*
Ah, the site of much voodoo. This is for the versions of CADI in which we are using checkboxes to add directly to the CADI TextArea.
We are opening this function with the ability to accept up to ten input variables. What we are doing here is to accept whatever checkbox is checked, 
along with whatever variables there may be, and assigning them to the global VariableArray.
	
This one is a bit fickle, and "getElementById" methods are notoriously easy to break, so I put it in a try - catch loop.
*/
function Addtext(vone, vtwo, vthree, vfour, vfive, vsix, vseven, veight, vnine, vten) {

    try {
        VariableArray.one = document.getElementById(vone).value;
        VariableArray.two = document.getElementById(vtwo).value;
        VariableArray.three = document.getElementById(vthree).value;
        VariableArray.four = document.getElementById(vfour).value;
        VariableArray.five = document.getElementById(vfive).value;
        VariableArray.six = document.getElementById(vsix).value;
        VariableArray.seven = document.getElementById(vseven).value;
        VariableArray.eight = document.getElementById(veight).value;
        VariableArray.nine = document.getElementById(vnine).value;
        VariableArray.ten = document.getElementById(vten).value;
    }

    catch (err) {

    }



}

/*
This is for the versions of CADI in which we are using checkboxes to add directly to the CADI TextArea.
Now we encounter the function in which we set the tabbed checkboxes. By setting the innertext of the tabs to labels, we are able
to control the look & size of the tabs directly.
*/
function public_Labels(label1, label2, label3, label4, label5) {

    t1.innerText = label1;
    t2.innerText = label2;
    t3.innerText = label3;
    t4.innerText = label4;
    t5.innerText = label5;
}

/*
This is for the versions of CADI in which we are using checkboxes to add directly to the CADI TextArea.
We will use this function to pass in values for the card containers. In other words, this is where we actually set the
contents of the various tabbed pages.
*/
function public_Contents(contents1, contents2, contents3, contents4, contents5) {

    t1Contents.innerHTML = contents1;
    t2Contents.innerHTML = contents2;
    t3Contents.innerHTML = contents3;
    t4Contents.innerHTML = contents4;
    t5Contents.innerHTML = contents5;

    init();
}

/* 
This is for the versions of CADI in which we are using checkboxes to add directly to the CADI TextArea.
We are using this function to set the default display tab to 1. Theoretically, it could be whichever one we wanted.
The important thing here is that these are the starting parameters for when the CADI initially loads.
*/
function init() {
    SecondAuth.Type = "N/A";
    SecondAuth.ID = "";
    tabContents.innerHTML = t1Contents.innerHTML;
}


/*
This is for the versions of CADI in which we are using checkboxes to add directly to the CADI TextArea.
We are declaring some variables to track exactly what is going on as we switch between tabs. We are also setting "firstFlag" to it's default value.
*/
var currentTab;
var tabBase;
var firstFlag = true;

/*
This is for the versions of CADI in which we are using checkboxes to add directly to the CADI TextArea.
Now we call the function to allow us to actually change between tabs. This will be call whenever a click is detected anywhere in the html body.
*/
function changeTabs() {

    /* 
    If this is the first click anywhere in the body, then we are going to be moving from where we set the function "init" to an active state. 
    Since we do not want it to revert back to default, we are changing firstFlag from true to false. We will also set our starting point, tab 1.
    */
    if (firstFlag == true) {
        currentTab = t1;
        tabBase = t1base;
        firstFlag = false;
    }

    /*
    This is going to determine how the tabs will react to our selections. This "if" statement will only be true if the user clicks on an element
    with the class name "tab". I am not going to spend much time explaining this because it is almost entirely cosmetic. 
    */
    if (window.event.srcElement.className == "tab") {

        currentTab.className = "tab";
        tabBase.style.backgroundColor = "white";
        currentTab = window.event.srcElement;
        tabBaseID = currentTab.id + "base";
        tabContentID = currentTab.id + "Contents";
        tabBase = document.all(tabBaseID);
        tabContent = document.all(tabContentID);
        currentTab.className = "selTab";
        tabBase.style.backgroundColor = "";
        tabContents.innerHTML = tabContent.innerHTML;

    }
}



/*
This is the section where we deal with accidentally hitting "Escape" when making the wrap up. If the escape key is pressed, it comes here first.
We cannot stop the escape key from working, and we don't really want to. We just want to make sure that the information is saved. So we send the current
wrap up to the noEscape.CADI variable to save it.
*/
function GetKey(e) {
    var code;
    noEscape.CADI = document.getElementById('CADIText').innerText;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    setTimeout('ShowTree(' + code + ');', 100);
}

/*
This is how we are going to clear the CADI between calls, with a pop up to make sure we don't clear it on accident. 
(That would be quite unfortunate.)
*/
function clearForm(cname, cvalue, exdays) {

    var ClearCADI = confirm("Are you sure you want to clear the CADI?");

    if (ClearCADI == true) {
        document.getElementById("validate").reset();
    } else {
    }
}

/* 
This is the section where we deal with accidentally hitting "Escape" when making the wrap up. 
Here we check to see if it is the "Escape" key being pressed, wait until the escape key is done being pressed, and add it back into the CADI TextArea.
*/
function ShowTree(character, esc) {
    if (character == 27) {
        document.getElementById("CADIText").innerHTML = noEscape.CADI;
    }
}