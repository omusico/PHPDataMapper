function ShowLoadingListOfDataBases(){
	document.getElementById('ListOfDataBasesLoader').style.display = '';
	document.getElementById('ListOfDatabaseNamesContainer').style.display = 'none';
}

function HideLoadingListOfDataBases(){
	document.getElementById('ListOfDataBasesLoader').style.display = 'none';
	document.getElementById('ListOfDatabaseNamesContainer').style.display = '';
}

function ShowLoadingDataBaseInfo(){
	document.getElementById('DataBaseInfoLoader').style.display = '';
	document.getElementById('DBTableInfoContainer').style.display = 'none';
}

function HideLoadingDataBaseInfo(){
	document.getElementById('DataBaseInfoLoader').style.display = 'none';
	document.getElementById('DBTableInfoContainer').style.display = '';
}

function ShowLoadingPrepareFile(){
	document.getElementById('PrepareFileLoader').style.display = '';
}

function HideLoadingPrepareFile(){
	document.getElementById('PrepareFileLoader').style.display = 'none';
}

function ShowPrepareFileGreenTick(){
	document.getElementById('GreenTickFileLoader').style.display = '';
}

function HidePrepareFileGreenTick(){
	document.getElementById('GreenTickFileLoader').style.display = 'none';
}

function ShowDynFilePrevLoader(guid, isManyToOne, mappingNo){
	if(isManyToOne){
		document.getElementById('liveDataLoader_'+mappingNo+'_'+guid).style.display = '';
	}else{
		document.getElementById('liveDataLoader_'+guid).style.display = '';
	}
}

function HideDynFilePrevLoader(guid, isManyToOne, mappingNo){
	if(isManyToOne){
		document.getElementById('liveDataLoader_'+mappingNo+'_'+guid).style.display = 'none';
	}else{
		document.getElementById('liveDataLoader_'+guid).style.display = 'none';
	}
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
				HideLoadingDataBaseInfo();
			}
			
			
	});
}

function PrepareInputFileForForm(){
	$.ajax({
		  type: "POST",
		  asynch: false,
		  url: "AjaxFileService/ajaxFileService.php",
		  data: { 	
		  			filename: document.getElementById("InputFileNameDir").value,
		  			filetype: document.getElementById("InputFileExt").value
		   		}
		}).done(function( msg ) {
		  	var result = msg.split(";");

		  	var successOrFail = result[0];

		  	if(successOrFail == "SUCCESS"){
			  	document.getElementById("FirstRowFromFile").value = result[1];
			}else{
				alert(result[1]);
			}
			HideLoadingPrepareFile();
			ShowPrepareFileGreenTick();
	});
}

function queryAjaxLiveDataServiceForNewColValue(guid){
	document.getElementById("DisplayValue_"+guid).value = "";

	ShowDynFilePrevLoader(guid, false, 0);

	//function, inputColNum, inputColValue, char, subStrStart, subStrLength, customEvalTxt\
	var inputColNum = document.getElementById("inputColumnNumber_"+guid).value;
	var fnc = document.getElementById("inputFunction_"+guid).value;
	var inputColValue = getColumnValueFromFirstRowOfFile(inputColNum);
	var chr = document.getElementById("inputCharNum_"+guid).value;
	var subStrStart = document.getElementById("inputSubStart_"+guid).value;
	var subStrLength = document.getElementById("inputSubLength_"+guid).value;
	var customEvalTxt = document.getElementById("inputCustomEval_"+guid).value;

	doTheAjaxQueryLiveDate(guid, fnc, inputColNum, inputColValue, chr, subStrStart, subStrLength, customEvalTxt, false, 0);
}
function queryAjaxLiveDataServiceForNewColValueManyToOne(mappingNum, guid){
	document.getElementById("DisplayValue_"+mappingNum+"_"+guid).value = "";
			
	ShowDynFilePrevLoader(guid, true, mappingNum);

	//function, inputColNum, inputColValue, char, subStrStart, subStrLength, customEvalTxt\
	var inputColNum = document.getElementById("inputColumnNumber_"+mappingNum+"_"+guid).value;
	var fnc = document.getElementById("inputFunction_"+mappingNum+"_"+guid).value;
	var inputColValue = getColumnValueFromFirstRowOfFile(inputColNum);
	var chr = document.getElementById("inputCharNum_"+mappingNum+"_"+guid).value;
	var subStrStart = document.getElementById("inputSubStart_"+mappingNum+"_"+guid).value;
	var subStrLength = document.getElementById("inputSubLength_"+mappingNum+"_"+guid).value;
	var customEvalTxt = document.getElementById("inputCustomEval_"+mappingNum+"_"+guid).value;

	doTheAjaxQueryLiveDate(guid, fnc, inputColNum, inputColValue, chr, subStrStart, subStrLength, customEvalTxt, true, mappingNum);
}

function doTheAjaxQueryLiveDate(guid, func, inputColNum, inputColValue, chr, subStrStart, subStrLength, customEvalTxt, isManyToOne, mappingNum){
	$.ajax({
		  type: "POST",
		  asynch: false,
		  url: "AjaxLiveDataService/inputColumns.php",
		  data: { 	 
		  			inputFunction: func, 
		  			inputColNum: inputColNum, 
		  			inputColVal: inputColValue,
		  			chr: chr, 
		  			subStringStart: subStrStart, 
		  			subStringLength: subStrLength, 
		  			customEvalText: customEvalTxt
		  		}
		}).done(function( msg ) {
			if(msg.indexOf("<b>Parse error") != -1){
				msg = "...";
			}
			
			if(isManyToOne){
				document.getElementById("DisplayValue_"+mappingNum+"_"+guid).innerHTML = msg;
			}else{
				document.getElementById("DisplayValue_"+guid).innerHTML = msg;
			}

			HideDynFilePrevLoader(guid, isManyToOne, mappingNum);
	
	});
}






















