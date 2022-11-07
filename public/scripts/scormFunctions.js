function Initialize() {
    if ( !(entryStatus == "resume") )
	{
   		initializeCommunication();
	}

   	var entryStatus = retrieveDataValue( "cmi.entry" );
}

function Commit() {

}

function Terminate() {
    storeDataValue( "cmi.completion_status", "completed" );
    storeDataValue( "cmi.exit", "" );
    
    terminateCommunication();
}