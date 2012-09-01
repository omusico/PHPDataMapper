function ShowLoadingListOfDataBases(){
	document.getElementById('ListOfDataBasesLoader').style.display = '';
	document.getElementById('ListOfDatabaseNamesContainer').style.display = 'none';
}
function HideLoadingListOfDataBases(){
	document.getElementById('ListOfDataBasesLoader').style.display = 'none';
	document.getElementById('ListOfDatabaseNamesContainer').style.display = '';
}

function RetrieveListOfDataBases(){
	var serverAddress = document.getElementById('DataBaseServerAddress').value;
	var username = document.getElementById('DataBaseUserName').value;
	var password = document.getElementById('DataBasePassword').value;
	
	$.ajax({
		  type: "POST",
		  asynch: false,
		  url: "Database/GetDataBaseInfo.php",
		  data: { 	queryType: "RetrieveListOfDatabaseNames",
					serverAddress: serverAddress,
					username: username,
					password: password,
					selectedDatabase: "" }
		}).done(function( msg ) {
		  var listOfDbs = msg.split(',');
		  document.getElementById('ListOfDatabaseNames').options.length = 0;
		  for(var i=0; i<listOfDbs.length; i++){
			var currOpt = document.createElement('option');
			currOpt.text = listOfDbs[i];
			currOpt.value = listOfDbs[i];
			document.getElementById('ListOfDatabaseNames').appendChild(currOpt);
		  }
		  
		  document.getElementById('ListOfDatabaseNamesContainer').style.display = '';
		  HideLoadingListOfDataBases();
	});
	
	
}

function RetrieveDataBaseInformation(){
	var serverAddress = document.getElementById('DataBaseServerAddress').value;
	var username = document.getElementById('DataBaseUserName').value;
	var password = document.getElementById('DataBasePassword').value;
	var selectedDatabase = document.getElementById('ListOfDatabaseNames').value;
	
	$.ajax({
		  type: "POST",
		  asynch: false,
		  url: "Database/GetDataBaseInfo.php",
		  data: { 	queryType: "RetrieveDatabaseInformationForMappings",
					serverAddress: serverAddress,
					username: username,
					password: password,
					selectedDatabase: selectedDatabase }
		}).done(function( msg ) {
			document.getElementById('DBTableInfoContainer').innerHTML = "";
			document.getElementById('TableInformation').value = msg;
			var tableLevel = msg.split('|');
			for(var i=0; i< tableLevel.length; i++){
				var currTableName = tableLevel[i].split(';')[0];
				var currTableCols = tableLevel[i].split(';')[1].split(',');
				
				var OuterTable = document.createElement('table');
				OuterTable.setAttribute('style','float:left; font-size:10px;');
				OuterTable.setAttribute('border','1');
				var row1 = document.createElement('tr');
				var row1cell1 = document.createElement('td');
				row1cell1.setAttribute('colspan','2');
				row1cell1.setAttribute('style','background-color:LightGrey;');
				row1cell1.innerHTML = "<b>"+currTableName+"</b>";
				
				OuterTable.appendChild(row1);
				row1.appendChild(row1cell1);
				
				for(var p=0; p<currTableCols.length; p++){
					var currColName = currTableCols[p].split(':')[0];
					var currColIsPrimary = currTableCols[p].split(':')[1];
					
					var rown = document.createElement('tr');
					var rowncell1 = document.createElement('td');
					var rowncell2 = document.createElement('td');
					
					if(currColIsPrimary == "1"){
						rowncell1.innerHTML = "<img src='images/b_primary.png' />";
					}
					
					rowncell2.innerHTML = currColName;
					
					rown.appendChild(rowncell1);
					rown.appendChild(rowncell2);
					
					OuterTable.appendChild(rown);
				}
				
				document.getElementById('DBTableInfoContainer').appendChild(OuterTable);
			}
			
			
	});
}






















