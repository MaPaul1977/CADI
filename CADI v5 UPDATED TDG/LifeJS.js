
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


// This is explicitly to hold both the CADI wrap up & to check whether the caller is verified.
var CADIGlobal = {};
CADIGlobal.CADI = "";
CADIGlobal.Verified = "Verified";

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


	
// This does not currently have any functionality. Might delete.
var PremiumAttempt = {};
PremiumAttempt.Attempt = "";

// This is to keep reps from hitting the "Escape" key and accidentally deleting the whole CADI.
var noEscape = {};
			
/* 
This is going to be where most of the work is done with verification.

Calling the VerifyAllInfo function will check the info entered into the various textboxes/checkboxes & validate. Next, it will be sent to THE LOGIC.
THE LOGIC will look at all the information that is entered & based on a chained series of "if" statements, will decide which of the AP variables to display.
*/
	
	function AuthorizationCheck() {
	//alert("test");
	// Setting our SecondAuth Global Variables to what their default values (for this function) need to be.
		SecondAuth.Type = "N/A";
		SecondAuth.ID = "";
		SecondAuth.DocID = "";
		SecondAuth.AssignmentType = "";
		SecondAuth.PolNumCheck = document.getElementById("chkPolNum").checked;
		SecondAuth.SSNCheck = document.getElementById("chkSSN").checked;
		
		// Lets declare our variables!
		var AP1 = "Correspondence Confirmation (Incoming) - Can confirm what date it was received by CNO and can confirm and review any errors on a form submitted by the caller";
		var AP2 = "No disclosure";
		var AP3 = "ALL";
		var AP4 = "Policy Status [Active or Inactive Only]";
		var AP5 = "[Caller not verified]";
		var AP6 = "Correspondence Confirmation (Outgoing) - Can confirm correspondence to the caller";
		var AP7 = "Confirmation of Insured";
		var AP8 = "Name of Owner";
		var AP9 = "Face Amount";
		var AP10 = "PPSP Draft Information Only";
		var AP11 = "Refer to POA Paperwork on File [Valid Until Owner's Death]";
		var AP12 = "Refer to CIR/ARI on File";
		var AP13 = "Verify DOD and check for Claim Assignment";
		var AP14 = "Beneficiary Confirmation";
		var AP15 = "Status of the Contestability Period (can give status but cannot release effective date)";
		var AP16 = "Paid to Date (last premium received)";
		var AP17 = "Cost of Insurance";
		var AP18 = "Cash Value (based on assignment)";
		var AP19 = "Loans";
		var AP20 = "Interest Rates";
		var AP21 = "Refer to Legal Auth on File";
		var AP22 = "Information related to the assignment";
		var AP23 = "Information related to the caller's specific claim";
		var AP24 = "Confirmation of Assignment";
		var AP25 = "Executorship not valid until after owner's death";
		var AP26 = "Information related to the claim dollar amount of the assignment";
		var AP27 = "Identity of Beneficiaries";
		var AP28 = "Information pertaining to specific claim";
		var AP29 = "Confirmation of Insured";
		var AP30 = "Beneficiary Confirmation";
		var AP31 = "Only information which the person who gave verbal authorization would have been able to obtain. Only verbally release information, and the information can only be specific to this call";
		var AP32 = "After DOD: If the call was the person named in bene change form, can confirm that the bene change form was received and rejected, and caller was not named as bene. Can confirm that rejection letter was sent to Owner";
		var AP33 = "Premium Amount";
		var AP34 = "Information related to the claim dollar amount of the collateral assignment";
		var AP35 = "Can update Payor address";
		var AP36 = "APL can be discussed only in general terms, but nothing specific to the policy. i.e. date APL was taken cannot be given.";
		var AP37 = "Information related to the assignment. Can disclose whether the policy is in grace and the paid to date.";
		var AP38 = "Can explain the benefit payment amount including any loans (when it was taken and the amount).";
		var AP39 = "NFO - when it took place and a general explanation of the NFO option.";
		var AP40 = "Beneficiary Confirmation with Date of Death";
		var AP41 = "Confirm date of birth";
		var AP42 = "Can release if there is another assignment on file (cannot give specifics about the assignment)";
		var AP43 = "Information related to calculating the claim (information related to their assigned amount, i.e. loans, premiums due)";
		var AP44 = "Premium amount";
		var AP45 = "Confirm callers contact information on file";
		var AP46 = "If notice letter has been sent to the Third Party Designee, premium amount/grace amount due, date premium or grace is due, lapse date, paid-to-date (PTD), payment methods";
		var AP47 = "Status of the request";
		var AP48 = "Amount of 1035x";
		var AP49 = "1035x calculations including cost basis if available";
		var AP50 = "Mail date from Policy Disbursements";
		var AP51 = "Address the check was mailed to";
		
		// Here, we are checking the four main inputs for verification to make sure that they are not empty
		
		// Now, the policy number.
			var PolNum = document.forms["Validate"]["PolicyNumberText"].value;
		// The callers name.
			var CallName = document.forms["Validate"]["CallersNameText"].value;
		// The relationship.
			var Relation = document.forms["Validate"]["RelationshipListbox"].value;
		// The Insureds DOB Checkbox
			var OtherAuth = document.forms["Validate"]["OtherAuthList"].value;
		// The length of the identification put in OtherAuthText	
			SecondAuth.DocID = document.forms["Validate"]["OtherAuthText"].value;
			SecondAuth.DocID = SecondAuth.DocID.length;
			SecondAuth.ID = document.forms["Validate"]["OtherAuthText"].value;
				
		
				/* 
				In plain English, if the Verbal Auth checkbox is checked, make sure SecondAuth.ID is correct for the wrap up,
				and set SecondAuth.Type to the right type for the wrap up. 
				*/
				
				if (document.getElementById('OtherAuthList').value == "Verbal Authorization") {
					SecondAuth.ID = "";
					SecondAuth.Type = "Verbal Auth";
				}
				
				else if (document.getElementById('OtherAuthList').value == "Confidential Information Release Form") {
					SecondAuth.Type = "CIR/ARI";
				}
				else if (document.getElementById('OtherAuthList').value == "Legal Authorization") {
					SecondAuth.Type = "Legal Auth";
				}
				else if (document.getElementById('OtherAuthList').value == "Assignment") {
					SecondAuth.Type = "Assignment";
					var aType = prompt("Is this an Absolute Assignment or a Collateral Assignment? Type 'A' for absolute or 'C' for collateral. Default is 'A'.", "A");
					
						if (aType == "A"){
							SecondAuth.AssignmentType = "Absolute";
						} else if (aType == "C"){
							SecondAuth.AssignmentType = "Collateral";
						} else {
							SecondAuth.AssignmentType = "";
						}
				}
				else if (document.getElementById('OtherAuthList').value == "1035x") {
					SecondAuth.Type = "1035x";
				}
				else {
				}
				
				
		// The CTIPop Checkbox
			var CTIPop = document.forms["Validate"]["CTIBox"].checked;
				
				/* The next few sections are going to be validating the interactions with our textbox/checkbox combos. 
				If SSN, Owner's DOD, or Insured's DOD are left empty, then we will also uncheck the corresponding check box. */
				
		// Verify if we have a valid social security number. Must be longer than 3 digits (the last 4 are acceptable). This may need to be more strict later.
			var SSN = document.forms["Validate"]["SSNText"].value;
				SSN = SSN.length;
				 if (SSN > 3) {
					document.getElementById("chkSSN").checked = true;
				}
				else if (SSN < 4) {
					document.getElementById("chkSSN").checked = "";
				}
				else{
				}
			
		// The Owner's DOD must be at least 4 digits. A single digit day of a single digit month of any year can be displayed minimally as DMYY.
			var OwDOD = document.forms["Validate"]["OwnerDODText"].value;
				OwDOD = OwDOD.length;
				 if (OwDOD > 3) {
					document.getElementById("chkOwDOD").checked = true;
				}
				else if (OwDOD < 4) {
					document.getElementById("chkOwDOD").checked = "";
				}
				else{
				}			
			
				
		// The Insureds DOD must be at least 4 digits. A single digit day of a single digit month of any year can be displayed minimally as DMYY.
			var InsDOD = document.forms["Validate"]["InsuredDODText"].value;
				InsDOD = InsDOD.length;
				 if (InsDOD > 3) {
					document.getElementById("chkInsDOD").checked = true;
				}
				else if (InsDOD < 4) {
					document.getElementById("chkInsDOD").checked = "";
				}
				else{
				}				
				
				
			/* 
			Here we loop through the check boxes used for validation, counting them as we go. 
			At the end of this object, we make it a usable integer for the verification logic later. 
			*/
			
			// First, we set the default values for VerifyCount and count.
			var VerifyCount = "";
			var count = "";
				
				/* 
				Here, we are actually counting the boxes checked. Literally, this means: 
				"Set x to 0; Run this as long as x is less than the number of checkboxes checked; Every time you run this, add 1 to x"
				*/
				for(x=0; x<document.forms["Validate"]["Checkbox"].length; x++){
					
					// If a checkbox is checked, add it to the number of checkboxes we count as checked. Otherwise, do not add it to the number we count as checked.
					if(document.forms["Validate"]["Checkbox"][x].checked==true){
					
					count += document.forms["Validate"]["Checkbox"][x].value;
					
					// Make sure the count is an actual number & not something weird.
					VerifyCount = parseInt(count.length);
					
					}
				}
			
			/* 
			THE LOGIC -- This is the logic for the verification. 
			
			Here is a lexicon of which variables mean what:
			
			 - PolNum is the "Policy Number" textbox.
			 - CallName is the "Caller's Name" textbox.
			 - Relation is the "Relationship" list. 
			 - SecondAuth.Type == "1035x" is the way to see if there is a secondary authorization type which has been selected.
			 - VerifyCount is the function above where we saw how many checkboxes were checked for verification.
			 - CTIPop is just the checkbox asking if the caller was previously qualified.
			 - document.getElementById('chkOwDOD').checked is the way to see if the policy owner is dead.
			 - document.getElementById('chkInsDOD').checked is the way to see if the policy's insured is dead.
			 - DocID is the function above where we make sure that there is a reference to the document in Content Navigator.
			 
			The basic logic works like this:
			
			1) We will check the most basic possibilities. Do we have the policy number and caller's name? If not, go to the end.
			2) Because of the nature of the logic, for now I have to put the extra authorization methods before all else in order to override the other options. This is being worked on.
			3) Now, we find out who they are.
			4) If they are not a typical type of caller, we use "Other" to figure out what to do with them.
			5) If they do not match any of our categories, or there is an error, then we get to the end of the logic & we cannot give out info.

			Each time, we update the innerHTML objects with the pre-declared variables for which items are allowed to be discussed. 
			*/
		
		
		
		// Do they have a name and policy number?
		if (PolNum != "" && CallName != "" && (VerifyCount > 3 && (SecondAuth.PolNumCheck == true || SecondAuth.SSNCheck == true) || CTIPop == true)) {
			
			if (SecondAuth.Type == "1035x"){
				if (SecondAuth.DocID > 0) {
					document.getElementById("NonFi").innerHTML = AP8 + ", " + AP1 + ", " + AP6 + ", " + AP4 + ", " + AP47;
					document.getElementById("Prem").innerHTML = AP2;
					document.getElementById("Finance").innerHTML = AP48 + ", " + AP49 + ", " + AP50 + ", " + AP51;
					document.getElementById("Claim").innerHTML = AP2;
					CADIGlobal.Verified = "Verified" ;
					
				} else {
					document.getElementById("NonFi").innerHTML = AP8 + ", " + AP1 + ", " + AP6 + ", " + AP4 + ", " + AP47;
					document.getElementById("Prem").innerHTML = AP2;
					document.getElementById("Finance").innerHTML = AP48 + ", " + AP49 + ", " + AP50 + ", " + AP51;
					document.getElementById("Claim").innerHTML = AP2;
					CADIGlobal.Verified = "Verified" ;
					
				}
				
			} else if (SecondAuth.Type == "CIR/ARI" && SecondAuth.DocID > 0) {
				document.getElementById("NonFi").innerHTML = AP12;
				document.getElementById("Prem").innerHTML = AP12;
				document.getElementById("Finance").innerHTML = AP12;
				document.getElementById("Claim").innerHTML = AP12;
				CADIGlobal.Verified = "Verified" ;
				
			} else if (SecondAuth.Type == "Verbal Auth") {
				document.getElementById("NonFi").innerHTML = AP31;
				document.getElementById("Prem").innerHTML = AP31;
				document.getElementById("Finance").innerHTML = AP31;
				document.getElementById("Claim").innerHTML = AP31;
				CADIGlobal.Verified = "Verified" ;
				
			} else if (Relation == "Owner") {
				document.getElementById("NonFi").innerHTML = AP3;
				document.getElementById("Prem").innerHTML = AP3;
				document.getElementById("Finance").innerHTML = AP3;
				document.getElementById("Claim").innerHTML = AP3;
				CADIGlobal.Verified = "Verified" ;
				
				OwnerIsDead();
				
			} else if (Relation == "Insured") {
				document.getElementById("NonFi").innerHTML = AP4 + ", " + AP1 + ", " + AP6 + ", " + AP7 + ", " + AP8;
				document.getElementById("Prem").innerHTML = AP2;
				document.getElementById("Finance").innerHTML = AP9;
				document.getElementById("Claim").innerHTML = AP2;
				CADIGlobal.Verified = "Verified" ;
				
				InsuredIsDead();
				
			} else if (Relation == "Payor") {
				
				var OfUnofPayor = prompt("Is the caller the official payor or the unofficial payor? Enter 'O' for official or 'U' for unofficial. The default is official.", "O")
				if (OfUnofPayor == "O"){
					document.getElementById("NonFi").innerHTML = AP4 + ", " + AP1 + ", " + AP6 + ", " + AP35;
					document.getElementById("Prem").innerHTML = AP3 + ", " + AP36;
					document.getElementById("Finance").innerHTML = AP2;
					document.getElementById("Claim").innerHTML = AP2;
					CADIGlobal.Verified = "Verified" ;	
				} else {
					document.getElementById("NonFi").innerHTML = AP1;
					document.getElementById("Prem").innerHTML = AP10;
					document.getElementById("Finance").innerHTML = AP2;
					document.getElementById("Claim").innerHTML = AP2;
					CADIGlobal.Verified = "Verified" ;	
				}
				
			} else if (Relation == "Beneficiary") {
				if (document.getElementById("chkInsDOD").checked) {
					document.getElementById("NonFi").innerHTML = AP27 + ", " + AP29 + ", " + AP6;
					document.getElementById("Prem").innerHTML = AP37;
					document.getElementById("Finance").innerHTML = AP38 + ", " + AP39;
					document.getElementById("Claim").innerHTML = AP23;
					CADIGlobal.Verified = "Verified" ;	
				} else {
					document.getElementById("NonFi").innerHTML = AP4 + ", " + AP1 + ", " + AP6;
					document.getElementById("Prem").innerHTML = AP2;
					document.getElementById("Finance").innerHTML = AP2;
					document.getElementById("Claim").innerHTML = AP2;
					CADIGlobal.Verified = "Verified" ;	
				}
				
			} else if (Relation == "POA or Executor") {

				if (SecondAuth.Type == "Legal Auth" && SecondAuth.DocID > 0) {
					document.getElementById("NonFi").innerHTML = AP3;
					document.getElementById("Prem").innerHTML = AP3;
					document.getElementById("Finance").innerHTML = AP3;
					document.getElementById("Claim").innerHTML = AP3;
					CADIGlobal.Verified = "Verified" ;
					
				} else {
					document.getElementById("NonFi").innerHTML = AP4;
					document.getElementById("Prem").innerHTML = AP2;
					document.getElementById("Finance").innerHTML = AP2;
					document.getElementById("Claim").innerHTML = AP2;
					CADIGlobal.Verified = "Verified" ;
				}
				
			} else if (Relation == "Funeral Home") {
				if (SecondAuth.AssignmentType == "Absolute" || SecondAuth.AssignmentType == "Collateral"){
					document.getElementById("NonFi").innerHTML = AP4 + ", " + AP1 + ", " + AP6 + ", " + AP15 + ", " + AP1 + ", " + AP40+ ", " + AP29;
					document.getElementById("Prem").innerHTML = AP37;
					document.getElementById("Finance").innerHTML = AP43 + ", " + AP24 + ", " + AP9;
					document.getElementById("Claim").innerHTML = AP22;
					CADIGlobal.Verified = "Verified" ;	
				} else {
					document.getElementById("NonFi").innerHTML = AP4 + ", " + AP1 + ", " + AP15 + ", " + AP40 + ", " + AP41 + ", " + AP42;
					document.getElementById("Prem").innerHTML = AP2;
					document.getElementById("Finance").innerHTML = AP9;
					document.getElementById("Claim").innerHTML = AP2;
					CADIGlobal.Verified = "Verified" ;	
				}
				
				
			} else if (Relation == "Other") {
				var OtherType = prompt("What is the 'other' relationship? Valid entries include: 'Absolute' (or 'Collateral') for assignments, 'Third Party', or something else entirely. Default is 'Other'.", "Other")
				OtherType = OtherType.toLowerCase();
				var CallName = document.forms["Validate"]["CallersNameText"].value;
						
					// This is saying that as long as there was something put in the prompt, then we should add it to the name. Otherwise, we should not do anything.
					if (OtherType != null) {
						document.getElementById("CallersNameText").value = CallName + " - " + OtherType;
					} else {
					}
			
				if (OtherType == "absolute"){
					document.getElementById("NonFi").innerHTML = AP3;
					document.getElementById("Prem").innerHTML = AP3;
					document.getElementById("Finance").innerHTML = AP3;
					document.getElementById("Claim").innerHTML = AP3;
					CADIGlobal.Verified = "Verified" ;
					
				} else if (OtherType == "collateral"){
					document.getElementById("NonFi").innerHTML = AP4 + ", " + AP1 + ", " + AP6;
					document.getElementById("Prem").innerHTML = AP16 + ", " + AP17 + ", " + AP44;
					document.getElementById("Finance").innerHTML = AP18 + ", " + AP19 + ", " + AP20;
					CADIGlobal.Verified = "Verified" ;
					
					if (document.getElementById("chkInsDOD").checked != true) {
						document.getElementById("Claim").innerHTML = AP2;
						
					} else {
						document.getElementById("Claim").innerHTML = AP26;
					}
					
				} else if (OtherType == "third party"){
					document.getElementById("NonFi").innerHTML = AP45;
					document.getElementById("Prem").innerHTML = AP46;
					document.getElementById("Finance").innerHTML = AP2;
					document.getElementById("Claim").innerHTML = AP2;
					CADIGlobal.Verified = "Verified" ;
					
				} else if (OtherType == "barry allen" || OtherType == "flash" || OtherType == "the flash"){
					alert("Superheroes need much more insurance than we can provide!");
					window.open("https://speedforce.org/");
					
				} else {
					document.getElementById("NonFi").innerHTML = AP4 + ", " + AP1 + ", " + AP40;
					document.getElementById("Prem").innerHTML = AP2;
					document.getElementById("Finance").innerHTML = AP2;
					document.getElementById("Claim").innerHTML = AP2;
					CADIGlobal.Verified = "Verified" ;	
				}
				
			} else {
				document.getElementById("NonFi").innerHTML = AP4;
				document.getElementById("Prem").innerHTML = AP2;
				document.getElementById("Finance").innerHTML = AP2;
				document.getElementById("Claim").innerHTML = AP2;
				CADIGlobal.Verified = "Not Verified" ;	
			}
			
		} else {
			document.getElementById("NonFi").innerHTML = AP2;
			document.getElementById("Prem").innerHTML = AP2;
			document.getElementById("Finance").innerHTML = AP2;
			document.getElementById("Claim").innerHTML = AP2;
			CADIGlobal.Verified = "Not Verified" ;	
		}
		
	}
	
	function InsuredIsDead() {
		// The Insured's DOD must be at least 4 digits. A single digit day of a single digit month of any year can be displayed minimally as DMYY.
			var OwDOD = document.forms["Validate"]["InsuredDODText"].value;
				OwDOD = OwDOD.length;
				 if (OwDOD > 3) {
					document.getElementById("chkInsDOD").checked = true;
					alert("If the Insured is dead, you may want to choose another relationship.")
				}
				else if (OwDOD < 4) {
					document.getElementById("chkInsDOD").checked = "";
				}
				else{
				}	
	}
	
	function OwnerIsDead () {
		// The Owner's DOD must be at least 4 digits. A single digit day of a single digit month of any year can be displayed minimally as DMYY.
			var OwDOD = document.forms["Validate"]["OwnerDODText"].value;
				OwDOD = OwDOD.length;
				 if (OwDOD > 3) {
					document.getElementById("chkOwDOD").checked = true;
					alert("If the Owner is dead, you may want to choose another relationship.")
				}
				else if (OwDOD < 4) {
					document.getElementById("chkOwDOD").checked = "";
					OwnerVerification()
				}
				else{
				}	
	}
	
	function OwnerVerification () {
		var reqAssist = prompt("Did the policy owner require assistance to verify? Enter 'Y' for yes or 'N' for no. The default is no.", "N")
		if (reqAssist == "Y"){
			document.getElementById("NonFi").innerHTML = "Policy Status - can tell the caller only if the policy is active or inactive. Can confirm incoming correspondence, what date it was received, and discuss any errors on a form submitted by the owner. Can confirm policy type and non-specific policy type information.";
			document.getElementById("Prem").innerHTML = "Premium amount, premium due date, grace period information (dates only), the grace amount due to keep the policy from lapsing, the paid-to-date (PTD) once premium is paid, and premium payment options.";
			document.getElementById("Finance").innerHTML = AP2;
			document.getElementById("Claim").innerHTML = AP2;
			CADIGlobal.Verified = "Verified" ;	
		} else {
			
		}
	}
	
		function AddToCADI(){
				
		/* 
		This is where we handle the copy functionality. 
		
		First, we declare some variables. 
		Second, we put together all the relevant header information. 
		Third, we add all of this to the clipboard. 
		*/

		// Get the policy number.
			var PolNum = document.forms["Validate"]["PolicyNumberText"].value;
			
		// Get the callers name.
			var CallName = document.forms["Validate"]["CallersNameText"].value;
			
		// Get the relationship.
			var Relation = document.forms["Validate"]["RelationshipListbox"].value;
			
		// Get the Owner's DOD. First, set the default "".
			var DODOwner = "";
			// Now, we find out if it is checked.
			var DODOwnerCheck = document.forms["Validate"]["OwnerDODBox"].checked;
				// If this box is checked, then we get the date that the Owner croaked.
				if (DODOwnerCheck == true) {
					DODOwner = "Owner DOD: " + document.forms["Validate"]["OwnerDODText"].value + " || ";
				}			
				
		// Get the Insured's DOD. First, set the default "".
			var DODInsured = "";
			// Now, we find out if it is checked.
			var DODInsuredCheck = document.forms["Validate"]["InsuredDODBox"].checked;
				// If this box is checked, then we get the date that the Insured died.
				if (DODInsuredCheck == true) {
					DODInsured = "Insured DOD: " + document.forms["Validate"]["InsuredDODText"].value + " || ";
				}
				
		// Set the default value of CTI to "". We want to prepare it for the next item.
			var CTI = ""
			// We are going to discover if the CTI box is checked.
				var CTICheck = document.forms["Validate"]["CTIBox"].checked;
					// If this box is checked, then we add change CTI from blank to the text string.
					if (CTICheck == true) {
						CTI = "Received a call which was externally qualified. ";
					}		
		
		// This is where we concatenate all relevant header information into the Global CADI variable.
		CADIGlobal.CADI = "Policy Number: " + PolNum + " || Caller Name: " + CallName + " || " + "(" + Relation + ") || " + CADIGlobal.Verified + " || Secondary Authorization: " + SecondAuth.Type + " " + SecondAuth.ID + " || " + DODOwner + DODInsured + CTI + " || " + PremiumAttempt.Attempt ;
		
		// Here, we add to the clipboard so that we can put it into the wrap up.
		window.clipboardData.setData('text', CADIGlobal.CADI + document.getElementById('CADIText').innerText );
		
		}
		
		/* 
		Now we have the largest couple of functions finished up. From this point on, we are dealing with additional functionality.
		Nothing from this point on is designed to interact with the Validation process in any way. Some of these functions will be specific to different
		versions of the CADI, and some will be used widely. This is a library, after all.
		*/
		
			/*
			For any versions of the CADI which use checkboxes to add text directly to the wrap up. 
			This is how we actually add strings to the CADI TextArea.
			*/
		function AddToWrapUp(name){
			CADI = document.forms["Validate"]["CADIText"].value;
			document.getElementById("CADIText").innerHTML = CADI + name + " // ";
		}
		
		
			/* 
			We are updating the SecondAuth.sla global variable with the value from the "SLAList".
			This is not currently functional. I may delete it.
			*/
		function ServiceLevelAgreement(){
			SecondAuth.sla = document.forms["Validate"]["SLAList"].value;
		}
			
			
			/*
			We are updating the SecondAuth.surrender global variable with the value from "SurrenderDate".
			This is not currently functional. I may delete it.
			*/
		function Surrender() {
			SecondAuth.surrender = document.forms["Validate"]["SurrenderDate"].value;
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
			
			catch(err) {
				
			}
			
			
			
		}
		
		/*
		This is for the versions of CADI in which we are using checkboxes to add directly to the CADI TextArea.
		Now we encounter the function in which we set the tabbed checkboxes. By setting the innertext of the tabs to labels, we are able
		to control the look & size of the tabs directly.
		*/
	function public_Labels(label1, label2, label3, label4, label5, label6, label7){
	
			t1.innerText = label1;
			t2.innerText = label2;
			t3.innerText = label3;
			t4.innerText = label4;
			t5.innerText = label5;
			t6.innerText = label6;
			t7.innerText = label7;
	}
	
		/*
		This is for the versions of CADI in which we are using checkboxes to add directly to the CADI TextArea.
		We will use this function to pass in values for the card containers. In other words, this is where we actually set the
		contents of the various tabbed pages.
		*/
	function public_Contents(contents1, contents2, contents3, contents4, contents5, contents6, contents7){

			t1Contents.innerHTML = contents1;
			t2Contents.innerHTML = contents2;
			t3Contents.innerHTML = contents3;
			t4Contents.innerHTML = contents4;
			t5Contents.innerHTML = contents5;
			t6Contents.innerHTML = contents6;
			t7Contents.innerHTML = contents7;

			init();
		}
		
		/* 
		This is for the versions of CADI in which we are using checkboxes to add directly to the CADI TextArea.
		We are using this function to set the default display tab to 1. Theoretically, it could be whichever one we wanted.
		The important thing here is that these are the starting parameters for when the CADI initially loads.
		*/
	function init(){
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
		function changeTabs(){

			/* 
			If this is the first click anywhere in the body, then we are going to be moving from where we set the function "init" to an active state. 
			Since we do not want it to revert back to default, we are changing firstFlag from true to false. We will also set our starting point, tab 1.
			*/
			if(firstFlag == true){
				currentTab = t1;
				tabBase = t1base;
				firstFlag = false;
			}

			/*
			This is going to determine how the tabs will react to our selections. This "if" statement will only be true if the user clicks on an element
			with the class name "tab". I am not going to spend much time explaining this because it is almost entirely cosmetic. 
			*/
			if(window.event.srcElement.className == "tab"){
				
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
	This is how we are going to clear the CADI between calls, with a pop up to make sure we don't clear it on accident. 
	(That would be quite unfortunate.)
	*/
	function ClearForm(cname,cvalue,exdays){
	
		var ClearCADI = confirm("Are you sure you want to clear the CADI?");
		
		if (ClearCADI == true) {
			document.getElementById("Validate").reset();
		} else {
		}		
	}
	
	/*
	This is going to cause us to take a second look if the Relationship field is set to "Other" during verification. Since it is not a normal caller, 
	we really want to know who they are to call us for policy information.
	*/
	function ClarifyOther() {
	
	// Get the Caller's Name. We are going to add the result of the prompt to the end of this.
		var CallName = document.forms["Validate"]["CallersNameText"].value;
		
	// Get the Relationship. We just want to make sure that it is "Other" before we force the user to describe who they are.
		var Relation = document.forms["Validate"]["RelationshipListbox"].value;
						
		if (Relation == "Other") {
			// The first part of the prompt is the message that will appear, and the second part is what I want the default value to be.
			var Other = prompt("Please describe the &apos;other&apos; relationship. Are they a sister, friend, father, nurse, etc?", "Unknown");
			// This is saying that as long as there was something put in the prompt, then we should add it to the name. Otherwise, we should not do anything.
			if (Other != null) {
				document.getElementById("CallersNameText").value = CallName + " - " + Other;
			} else {
			}
		} else {
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
				setTimeout('ShowTree('+code+');',100);
	}
		
	/* 
	This is the section where we deal with accidentally hitting "Escape" when making the wrap up. 
	Here we check to see if it is the "Escape" key being pressed, wait until the escape key is done being pressed, and add it back into the CADI TextArea.
	*/
	function ShowTree(character, esc){
		if (character == 27){
			document.getElementById("CADIText").innerHTML = noEscape.CADI;
		}
	}