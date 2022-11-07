function Initialize() {
    if ( !(entryStatus == "resume") )
	{
   		initializeCommunication();
	}

   	var entryStatus = retrieveDataValue( "cmi.entry" );
}

function Terminate() {
    if (!IntraNavigation) {
      storeDataValue( "cmi.completion_status", "completed" );

      storeDataValue( "cmi.exit", "" );

      terminateCommunication();
   }
}

// Global variables
var IntraNavigation = false

