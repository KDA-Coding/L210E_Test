// JavaScript Document
function Trim(s)
{
  // Remove leading spaces and carriage returns

  while ((s.substring(0,1) == ' ') || (s.substring(0,1) == '\n') || (s.substring(0,1) == '\r'))
  {
    s = s.substring(1,s.length);
  }

  // Remove trailing spaces and carriage returns

  while ((s.substring(s.length-1,s.length) == ' ') || (s.substring(s.length-1,s.length) == '\n') || (s.substring(s.length-1,s.length) == '\r'))
  {
    s = s.substring(0,s.length-1);
  }
  return s;
}

// Global variables
var IntraNavigation = false

/*******************************************************************************
**
** This function is used to go to another page of a multi-page SCO
**
** Inputs:  page - the location that we're bookmarking
**
**
*******************************************************************************/
function GoToPage( page )
{
	IntraNavigation = true;

	// replace the current page with the page specified
	window.location.replace( page );
}

/*******************************************************************************
**
** This function asks the LMS if there exists a previous SCO or Asset to go to.
** If a SCO or Asset exists, then the previous button is displayed.
**
** Inputs:  None
**
** Return:  String - "true" if the previous button should be displayed
**                   "false" if failed.
**
*******************************************************************************/
function renderPreviousButton()
{
   var value = retrieveDataValue( "adl.nav.request_valid.previous" );
   return value;
}

/*******************************************************************************
**
** This function asks the LMS if there exists a next SCO or Asset to continue
** to.  If a SCO or Asset exists, then the continue button is displayed.
**
** Inputs:  None
**
** Return:  String - "true" if the continue button should be displayed
**                   "false" if failed.
**
*******************************************************************************/
function renderContinueButton()
{
   var value = retrieveDataValue( "adl.nav.request_valid.continue" );
   return value;
}


/*******************************************************************************
**
** This function is used to go to a previous SCO
**
*******************************************************************************/
function Previous()
{
	// we request the previous SCO from the LMS
	storeDataValue("adl.nav.request", "previous");

	// we terminate this SCO's communication with the LMS
	terminateCommunication();
}

/*******************************************************************************
**
** This function is used to go to a next SCO
**
*******************************************************************************/
function Continue()
{
	// we request the next SCO from the LMS
	storeDataValue ("adl.nav.request", "continue");

	// we terminate this SCO's communication with the LMS
	terminateCommunication();
}


/*******************************************************************************
**
** This function is used to tell the LMS to set a bookmark
**
** Inputs:  value - the location that we're bookmarking
**
** Return:  None
**
*******************************************************************************/
function onUnexpectedExit( value )
{
	// set a bookmark
	storeDataValue( "cmi.location", value );

	// we're going to check to see if this is a "good" exit or a "bad" exit
	if ( IntraNavigation == false )
	{
		// terminate our communication with the LMS
		terminateCommunication();
	}
	else
	{
		IntraNavigation = false;
	}
}


/*******************************************************************************
**
** This function is used to by multi-page SCOs in the process of determining
** whether or not to display a next button on the last page of a multi-page SCO
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function displayNext()
{
    // if there is somewhere to go next and previous enable the buttons
	if ( renderContinueButton() == "true" )
    {
		document.getElementById("nextBtn").style.visibility = "visible";
	}
}

/*******************************************************************************
**
** This function is used to tell the LMS to initiate the communication session
** using the APIWrapper.js file as a pass through.
**
** Inputs:  showNext - "false" (optional parameter)
**
** Return:  String - "true" if the initialization was successful, or
**          "false" if the initialization failed.
**
*******************************************************************************/
function Initialize(showNext)
{
	if ( !(entryStatus == "resume") )
	{
   		initializeCommunication();
	}
	// if there is somewhere to go next and previous enable the buttons
	if ( renderContinueButton() == "true")
    {
		if ( showNext != "false" ) document.getElementById("nextBtn").style.visibility = "visible";
	}


	if ( renderPreviousButton() == "true" )
	{
		document.getElementById("prevBtn").style.visibility = "visible";
	}


	// we need to determine if this is a new "learner attempt" or a
   	// suspended "learner attempt
   	var entryStatus = retrieveDataValue( "cmi.entry" );


	// check to see if this a resumption of a suspended learner attempt
	/***********************************************************
	** Currently NOT needed (keep for future use/reminder)
	************************************************************
	if ( entryStatus == "resume" )
	{
		var location = retrieveDataValue( "cmi.location" );

		// jump to the location we just retrieved

			//find the path name of the current SCO
			var path = getSCOLocation(currentSCO);  //Need to recreate getSCOLocation function with method you decided to use
			var newLocation = path+location+".html";
			window.location.replace( newLocation );
	}
	*************************************************/
}

/*******************************************************************************
**
** Makes the appropriate calls for a normal exit calling Terminate and
** setting some data model elements for a normal exit
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function Terminate()
{
   if (!IntraNavigation)
   {
      storeDataValue( "cmi.completion_status", "completed" );

      storeDataValue( "cmi.exit", "" );

      terminateCommunication();
   }
}


/********************************************************************************
** This function pops opens up a new window while the first one remains visible
**
** Inputs: String - The name/location of the page that will appear in the new window
**
** Return: A new window is open with the page specified
**
********************************************************************************/
function popup(pageName)
{
	window.open(pageName, "newWindow", "resizable=yes,scrollbars=yes,width=800,height=600");
}


function disableSubmit()
{
	document.getElementById('submit').disabled = true;
	document.getElementById('reset').disabled = true;
}

function enableSubmit()
{
	document.getElementById( "submit" ).disabled = false;
	document.getElementById( "reset" ).disabled = false;
}

//-- BEGIN ASSESSMENT VALIDATION and FEEDBACK FUNCTIONS

//initalize global variables
var correct = "Correct. ";
var incorrect = "Incorrect. ";
var alreadyAnswered = "You have already answered the question.  Please click Next.";
var answerResult = "";


/*******************************************************************************
**
** This function validates any forms with radio button (i.e. true/false, multiple choice).
** It checks to see if the user selected an answer and prompts otherwies.  Then it checks to see
** if the answer selected is the correct answer and sets the appropriate variables.
** Finally it calls displayFeedback and outputs the result to the user.
**
**
** Inputs: 	formObj - string - the name of the form
**			correctAnswer - string - the corret answer to the question
**			feedback - string - the text to be displayed on screen
**			index -
**			next - the url of the nextPage
**
** Return: IsOK - Boolean, states whether an answer was selected true=yes, false=no
**
*******************************************************************************/
function radio_validate(formObj, correctAnswer, index, dme)
{
	//initalize variables used in the function
	var isOK = false;
	var answer = "";
    var result = incorrect;

	//finds each radio button and if it checked sets the answer as that element
	for ( i = 0; i < ( formObj.elements.length - 2 ); i++ )
	{
		currElem = formObj.elements[i];
        if ( currElem.type == "radio" && currElem.checked )
		{
			isOK = true;
			answer = currElem.value;
			break;
       }
    }

   if ( !isOK )
	{
		alert( "Please select an answer." );
	}
	else
	{
		// store the answer
		storeDataValue("cmi.interactions."+index+".learner_response", answer);

		//check to see if user's answer is correct
		if( answer == correctAnswer )
		{
			result = correct;

			// store the result, since we only are storing that they got this question correct
			storeDataValue("cmi.interactions."+index+".result", "correct");
		}
		else
		{
			// store the result as incorrect
			storeDataValue("cmi.interactions."+index+".result", "incorrect");
		}

		//refer to function definition below
		//displayFeedback(result, feedback);
	}

	feedbackPage = dme+'_cca_question_fb.html';
	GoToPage( feedbackPage );
    //return isOK;
}

function checkbox_validate(formName, index, dme, InteractionObject)
{
	numRight = 0;
	numWrong = 0;

	var learnerResponse = "";
	var totalOptions = formName.elements.length - 2
	var i;
	var numChecked = 0;

	//loop to see how many are checked
	for ( i = 0; i < totalOptions; i++ )
	{
		currElem = formName.elements[i];
        	if ( currElem.type == "checkbox" && currElem.checked )
		{
			numChecked++;
       		}
    	}

	//loop to create the learner's response
	if(numChecked > 0)
	{
		var numAdded = 0;
		for ( i = 0; i < totalOptions; i++ )
		{
			currElem = formName.elements[i];

			if ( currElem.type == "checkbox" && currElem.checked )
			{
				learnerResponse += formName.elements[i].value;
				numAdded++;
				if (numAdded < numChecked)
				{
					learnerResponse += "[,]";

				}
		   }
		}

		// Set the Interaction ID
		storeDataValue("cmi.interactions."+index+".id", InteractionObject.id);

		// Set the Interaction type for this "interaction"
		storeDataValue("cmi.interactions."+index+".type", InteractionObject.type);

		// set the Interaction's correct response to "correctAnswer"
		storeDataValue("cmi.interactions."+index+".correct_responses.0.pattern", InteractionObject.correctAnswer);

		// to describe this Interaction, we'r using the actual test question
		storeDataValue("cmi.interactions."+index+".description", InteractionObject.description );

		// since we are demonstrating Score in this example, we are weighting questions differently
		// The weight will be used to calculate the scaled score on the results page.
		storeDataValue("cmi.interactions."+index+".weighting", InteractionObject.weighting );

		// store the answer
		storeDataValue("cmi.interactions."+index+".learner_response", learnerResponse );

		//check to see if the answers are correct.
		correctPattern = retrieveDataValue( "cmi.interactions."+index+".correct_responses.0.pattern" );

		//check to see if they selected all of the right answers
		if( learnerResponse ==  correctPattern )
		{
			// store the result, since we only are storing that they got this question correct
			storeDataValue("cmi.interactions."+index+".result", "correct");
		}
		else
		{
			// store the result, since we only are storing that they got this question correct
			storeDataValue("cmi.interactions."+index+".result", "incorrect");
		}

		//go to the feedback page
		feedbackPage = dme+'_cca_question_fb.html';
		GoToPage( feedbackPage );
	}
	else
	{
		alert ( "Please select an answer." );
	}
}//end function


/*******************************************************************************
**
** This function validates any forms that need to check a text input box.  It checks to
** see if the user entered any text and then checks if the user's answer is correct.
** It then calls displayFeedback() and outputs the result to the user.
**
**
** Inputs:  formName - string - the id of the form to check
**			answerOptions - array - holds all possible correct answers
**			feedback - string - the text to be displayed on screen
**			index - integer
**
** Return:  isOK - Boolean
**
*******************************************************************************/

function text_validate(formName, answerOptions, index, dme, InteractionObject)
{
	var result = incorrect;
	var answer = formName.answer.value;

	//check to see if the user entered an answer
	if( Trim(answer) == "" || answer == null)
	{
		alert( "Please input an answer." );
	}
	else
	{
		// Set the Interaction ID
		storeDataValue("cmi.interactions."+index+".id", InteractionObject.id);

		// Set the Interaction type for this "interaction"
		storeDataValue("cmi.interactions."+index+".type", InteractionObject.type);

		// set the Interaction's correct response to "correctAnswer"
		var t = InteractionObject.correctAnswer.length;

		for ( var i = 0; i < t; i++ )
		{
			storeDataValue("cmi.interactions."+index+".correct_responses." + i + ".pattern", InteractionObject.correctAnswer[i] );
		}
		// to describe this Interaction, we'r using the actual test question
		storeDataValue("cmi.interactions."+index+".description", InteractionObject.description );

		// since we are demonstrating Score in this example, we are weighting questions differently
		// The weight will be used to calculate the scaled score on the results page.
		storeDataValue("cmi.interactions."+index+".weighting", InteractionObject.weighting );

		// store the answer
		storeDataValue("cmi.interactions."+index+".learner_response", answer);

		answer = Trim( answer.toLowerCase() );

		//loop through the possible
		for( i=0; i < answerOptions.length; i++ )
		{
			if( answer == answerOptions[i] )
			{
				result = correct;
				// store the result, since we only are storing that they got this question correct
				storeDataValue( "cmi.interactions."+index+".result", "correct" );
				break;
			}
		}
		if( result == incorrect )
		{
			// store the result, since we only are storing that they got this question correct
			storeDataValue( "cmi.interactions."+index+".result", "incorrect" );
		}

		//go to the feedback page
		feedbackPage = dme+'_cca_question_fb.html';
		GoToPage( feedbackPage );
	}
}//end function


/*******************************************************************************
**
** This function checks matching question answers. It checks to
** see if the user matched a term to every definition and prompts otherwies.  Then checks to see
** if the answers are correct. it calls displayFeedback to output results to the user.
**
** Inputs:  formName - string
**			dme - string - the name of the data model element being tested. (all lower case)
**			index
**
** Return:  isDone - Boolean
**
*******************************************************************************/
function checkMatching( formName, index, dme )
{
	numRight = 0;
	numWrong = 0;
	numDefs = formName.elements.length-2;
	var badData = false;

	var learnerResponse = "";

	//check to see if user typed an answer for every definition
	var i;

	for( i = 0; i < numDefs; i++ )
	{
		var learnerAnswer = formName.elements[i].value;
		if(learnerAnswer == "")
		{
			badData = true;
			break;
		}
		else
		{
			learnerResponse += formName.elements[i].name + "[.]" + learnerAnswer;

			if( i < numDefs-1 )
			{
				learnerResponse += "[,]";
			}

			//check to see if answers are correct.  The name and value attributes must be equal to be right
			if( formName.elements[i].name == formName.elements[i].value.toLowerCase() )
			{
				numRight++;
			}
			else
			{
				numWrong++;
			}
		}
	}

	if( badData == false)
	{
		// store the answer
		storeDataValue("cmi.interactions."+index+".learner_response", learnerResponse );

	}

	//check to see if they got all right
	if( numRight == numDefs )
	{
		isCorrect = true;

		// store the result, since we only are storing that they got this question correct
		storeDataValue("cmi.interactions."+index+".result", "correct");
	}
	else
	{
		// store the result, since we only are storing that they got this question correct
		storeDataValue("cmi.interactions."+index+".result", "incorrect");

	}
	feedbackPage = dme+'_cca_question_fb.html';
	GoToPage( feedbackPage );
}//end function


/*******************************************************************************
**
** Finds the element with with id "feedback" and writes text between the appropriate tags
**
** Inputs:	result - string
**			feedback - string
**
** Return:  Displays the appropriate feedback at the specified location
**
*******************************************************************************/
function displayFeedback(result, feedback)
{
	//document.getElementById('feedback').innerText=result+feedback;

	if( result == correct ){
		document.getElementById('right').style.color = "teal";
	}
	if( result == incorrect ){
		document.getElementById('wrong').style.color = "orange";
	}
}

//--------------------------------------------------------------------------------


//END functions to check answers

function storeLearnersCode( feedbackPage, startingIndex )
{
		if (startingIndex == null)
		{
			var index = retrieveDataValue("cmi.interactions._count");
		}
		else
		{
			index = startingIndex;
		}

		var numExercises = applicationExercise.elements.length - 1;
		var appID = "";
		var currentIndex = index;
		var lastIndexNumber = index + (numExercises - 1);
		for ( i = 0; i < ( numExercises ); i++ )
		{
			if(i != 0)
			{
				currentIndex++;
			}

			appID = "app_ex_"+currentIndex;

			// Set the Interaction ID
			storeDataValue("cmi.interactions."+currentIndex+".id", appID);

			storeDataValue("cmi.interactions."+currentIndex+".type", "fill-in");

			currElem = applicationExercise.elements[i];
			answer = currElem.value;

			// store the answer
			storeDataValue("cmi.interactions." + currentIndex + ".learner_response", answer);
		}
		GoToPage( feedbackPage );
}



function loadHeader( dme )
{

		// Get the header and subheader from the params
		var g_params = new Array(10);

		// These will hold the value of the parameters you sent in using the item parameter attribute:
		//DME = g_params["DME"];
		//lesson = g_params["lesson"];
		//lesson = "testing";
		document.write("<!-- Course Title -->");
		document.write("<h1 id=\"smallTitle\">Sharable Content Object Reference Model (SCORM<span style=\"font-size:xx-small; vertical-align:text-top\">&reg;</span>) 2004 3rd Edition</h1>");
		document.write("<h1> Data Model Elements</h1>");

		document.write("<!-- Section Title that appears in top box -->");
		document.write("<h2>"+dme+"</h2>");

		//check to see if the dme being loaded in is 'Application'
		if( dme == "Application")
		{
			document.write("<!-- Top nav links: Glossary, Best Practices for Id, RTE, Best Practices for Developer -->");
			document.write("<div id=\"links\">");
			document.write("<ul>");
				document.write("<li id=\"glossary\"><a href=\"javascript:popup( '../html/glossary.html' )\">Glossary</a>&nbsp;&nbsp;|&nbsp;&nbsp;</li>");
				document.write("<li id=\"rte\"><a href=\"http://www.adlnet.gov\" target=\"_blank\">SCORM</a></li>");
			document.write("</ul>");
			document.write("</div>");
		}
		else
		{
			document.write("<!-- Top nav links: Glossary, Best Practices for Id, RTE, Best Practices for Developer -->");
			document.write("<div id=\"links\">");
			document.write("<ul>");
				document.write("<li id=\"glossary\"><a href=\"javascript:popup( '../Shared%20Files/html/glossary.html' )\">Glossary</a>&nbsp;&nbsp;|&nbsp;&nbsp;</li>");
				document.write("<li id=\"rte\"><a href=\"http://www.adlnet.gov\" target=\"_blank\">SCORM</a></li>");
			document.write("</ul>");
			document.write("</div>");
		}
}


/**********************************************************************
 **  Function: get_params()
 **  Description: This function is used to get the parameters from the
 **               query string
 **********************************************************************/
function get_params()
{
      var strSearch = window.location.search;
      var idx = strSearch.indexOf('?');
      if (idx != -1)
      {
         var pairs = strSearch.substring(idx+1, strSearch.length).split('&');
         alert("testing");
		 for (var i=0; i<pairs.length; i++)
         {
            nameVal = pairs[i].split('=');
            g_params[nameVal[0]] = nameVal[1];
			alert(nameVal[0]+"and"+nameVal[1]);
         }
	  }

}

