function showOptions(dropdown){
	var guid = dropdown.name.split('_')[1];

	if(dropdown[dropdown.selectedIndex].value == 'char'){
		document.getElementById('ShowCharacterOption_'+guid).style.display = '';
		document.getElementById('ShowSubStringOption_'+guid).style.display = 'none';
		document.getElementById('ShowCustomEval_'+guid).style.display = 'none';

	}else if(dropdown[dropdown.selectedIndex].value == 'substr'){
		document.getElementById('ShowCharacterOption_'+guid).style.display = 'none';
		document.getElementById('ShowSubStringOption_'+guid).style.display = '';
		document.getElementById('ShowCustomEval_'+guid).style.display = 'none';
		
	}else if(dropdown[dropdown.selectedIndex].value == 'direct'){
		document.getElementById('ShowCharacterOption_'+guid).style.display = 'none';
		document.getElementById('ShowSubStringOption_'+guid).style.display = 'none';
		document.getElementById('ShowCustomEval_'+guid).style.display = 'none';
		
	}else if(dropdown[dropdown.selectedIndex].value == 'eval'){
		document.getElementById('ShowCharacterOption_'+guid).style.display = 'none';
		document.getElementById('ShowSubStringOption_'+guid).style.display = 'none';
		document.getElementById('ShowCustomEval_'+guid).style.display = '';
	}
}
function showOptionsManyToOne(dropdown, number){
	var guid = dropdown.name.split('_')[2];

	if(dropdown[dropdown.selectedIndex].value == 'char'){
		document.getElementById('ShowCharacterOption_'+number+'_'+guid).style.display = '';
		document.getElementById('ShowSubStringOption_'+number+'_'+guid).style.display = 'none';
		document.getElementById('ShowCustomEval_'+number+'_'+guid).style.display = 'none';
	}else if(dropdown[dropdown.selectedIndex].value == 'substr'){
		document.getElementById('ShowCharacterOption_'+number+'_'+guid).style.display = 'none';
		document.getElementById('ShowSubStringOption_'+number+'_'+guid).style.display = '';
		document.getElementById('ShowCustomEval_'+number+'_'+guid).style.display = 'none';
	}else if(dropdown[dropdown.selectedIndex].value == 'direct'){
		document.getElementById('ShowCharacterOption_'+number+'_'+guid).style.display = 'none';
		document.getElementById('ShowSubStringOption_'+number+'_'+guid).style.display = 'none';
		document.getElementById('ShowCustomEval_'+number+'_'+guid).style.display = 'none';
	}else if(dropdown[dropdown.selectedIndex].value == 'eval'){
		document.getElementById('ShowCharacterOption_'+number+'_'+guid).style.display = 'none';
		document.getElementById('ShowSubStringOption_'+number+'_'+guid).style.display = 'none';
		document.getElementById('ShowCustomEval_'+number+'_'+guid).style.display = '';
		
	}
}
function deleteMultiValue(guid){
	var inputColNum = document.getElementById('inputColumnNumber_'+guid);
	var inputHasChildren = document.getElementById('inputHasChildren_'+guid);
	var inputSrcChar = document.getElementById('srcCharSplit_'+guid);

	var table = document.getElementById('MultiValueTable_'+guid);
	
	inputColNum.disabled = true;
	inputHasChildren.disabled = true;
	if(inputSrcChar != null){
		inputSrcChar.disabled = true;	
	}	
	
	table.style.display = 'none'

	DeleteFromGuidList(guid);
}
function deleteOneToOne(guid){
	var inputColNum = document.getElementById('inputColumnNumber_'+guid);
	var inputFn = document.getElementById('inputFunction_'+guid);
	var outputColNum = document.getElementById('outputColumnNumber_'+guid);
	var inputCharNum = document.getElementById('inputCharNum_'+guid);
	var inputSubStart = document.getElementById('inputSubStart_'+guid);
	var inputSubLength = document.getElementById('inputSubLength_'+guid);

	var table = document.getElementById('OneToOneTable_'+guid);
	
	inputColNum.disabled = true;
	inputFn.disabled = true;
	if(outputColNum != null){
		outputColNum.disabled = true;	
	}	
	inputCharNum.disabled = true;
	inputSubStart.disabled = true;
	inputSubLength.disabled = true;

	table.style.display = 'none'

	DeleteFromGuidList(guid);
}
function deleteManyToOne(guid){
	var numMappings = document.getElementById('numMappings_'+guid).value;

	for(var i=1; i<=numMappings; i++){
		var inputColNum = document.getElementById('inputColumnNumber_'+i+'_'+guid);
		var inputFn = document.getElementById('inputFunction_'+i+'_'+guid);
		var inputCharNum = document.getElementById('inputCharNum_'+i+'_'+guid);
		var inputSubStart = document.getElementById('inputSubStart_'+i+'_'+guid);
		var inputSubLength = document.getElementById('inputSubLength_'+i+'_'+guid);

		inputColNum.disabled = true;
		inputFn.disabled = true;
		inputCharNum.disabled = true;
		inputSubStart.disabled = true;
		inputSubLength.disabled = true;
	}

	var table = document.getElementById('ManyToOneTable_'+guid);
	var outputColNum = document.getElementById('outputColumnNumber_'+guid);
	var outputColOrder = document.getElementById('outputColumnOrder_'+guid);

	if(outputColNum != null){
		outputColNum.disabled = true;	
	}
	outputColOrder.disabled = true;	

	table.style.display = 'none';

	DeleteFromGuidList(guid);
}
function deletePrimaryForeign(guid){
	var table = document.getElementById('PrimaryForeignTable_'+guid);
	var outputDBTable = document.getElementById('outputDataBaseTable_'+guid);
	var inputDBTable = document.getElementById('inputDataBaseTable_'+guid);
	outputDBTable.disabled = true;
	inputDBTable.disabled = true;

	table.style.display = 'none'

	DeleteFromGuidList(guid);
}
function DeleteFromGuidList(guid){
	var guidList = document.getElementById('guidList').value;
	var vals = guidList.split(';');
	var allVals = new Array();

	var finalValue = "";

	var count = 0;
	for(var i=0; i<(vals.length-1); i++){

		var values = vals[i].split(',');
		if(values[0] != guid){
			allVals[count] = values;
			count++;
		}
	}

	for(var i=0; i<count; i++){
		finalValue += allVals[i][0]+","+allVals[i][1]+";"
	}
	 document.getElementById('guidList').value = finalValue;
}
function SelectOutput(dropdownlist){
	if(dropdownlist.value == "ToOutputDataFile"){
		document.getElementById('outputdatafileform').style.display = '';
		document.getElementById('outputdatabaseform').style.display = 'none';
	}else if(dropdownlist.value == "ToDataStructure"){
		document.getElementById('outputdatafileform').style.display = 'none';
		document.getElementById('outputdatabaseform').style.display = 'none';
	}else if(dropdownlist.value == "ToDataBase"){
		document.getElementById('outputdatafileform').style.display = 'none';
		document.getElementById('outputdatabaseform').style.display = '';
	}
}
function getPrimaryForeignRelationshipHTML(){
	var mappingDestination = document.getElementById("MappingType").value;
	var databaseTableInformation = document.getElementById("TableInformation").value;

	if(mappingDestination != "ToDataBase"){
		//don't do it
		alert("This mapping can only be used when mapping to a database!");
		return false;
	}
	if((mappingDestination == "ToDataBase") && (databaseTableInformation == "")){
		alert("You must retrieve database information before defining mappings!");
		return false;
	}

	var guid = guidGenerator();
	var topLevel = databaseTableInformation.split('|');
	document.getElementById("guidList").value += guid+",PKFK;";

	//Controls for Database Table output
	var dataBaseDestDropDown = document.createElement('select');
	dataBaseDestDropDown.setAttribute('id','outputDataBaseTable_'+guid);
	dataBaseDestDropDown.setAttribute('name','outputDataBaseTable_'+guid);

	var dataBaseSrcDropDown = document.createElement('select');
	dataBaseSrcDropDown.setAttribute('id','inputDataBaseTable_'+guid);
	dataBaseSrcDropDown.setAttribute('name','inputDataBaseTable_'+guid);

	//Interpret the table information and construct HTML controls
	for(var p=0; p<topLevel.length; p++){
		var tableName = topLevel[p].split(';')[0];
		var currColInfo = topLevel[p].split(';')[1].split(',');
		for(var q=0; q<currColInfo.length; q++){
			var colName = currColInfo[q].split(':')[0];
			var isPrimary = currColInfo[q].split(':')[1];

			if(isPrimary == "0"){
				var currCol = document.createElement('option');
    			currCol.setAttribute('value', tableName+"->"+colName);
    			currCol.innerHTML = tableName+"->"+colName;
    			dataBaseDestDropDown.appendChild(currCol);
    		}
		}
	}	

	for(var p=0; p<topLevel.length; p++){
		var tableName = topLevel[p].split(';')[0];
		var currColInfo = topLevel[p].split(';')[1].split(',');
		for(var q=0; q<currColInfo.length; q++){
			var colName = currColInfo[q].split(':')[0];
			var isPrimary = currColInfo[q].split(':')[1];

			if(isPrimary == "1"){
				var currCol = document.createElement('option');
    			currCol.setAttribute('value', tableName+"->"+colName);
    			currCol.innerHTML = tableName+"->"+colName;
    			dataBaseSrcDropDown.appendChild(currCol);
    		}
		}
	}

    var FKeyText = document.createElement('div');
    FKeyText.innerHTML = "Foreign Key:";

    var PKeyText = document.createElement('div');
    PKeyText.innerHTML = "Primary Key:";
 
	//Create the HTML Elements and append them as children
	var table = document.createElement('table');
	table.setAttribute('id','PrimaryForeignTable_'+guid);
	table.setAttribute('width','800');
	table.setAttribute('border','1');

	var row1 = document.createElement('tr');

	var cell1 = document.createElement('td');
	cell1.setAttribute('style','border:0px');
	cell1.setAttribute('valign','top');

	var cell2 = document.createElement('td');
	cell2.setAttribute('style','border:0px');
	cell2.setAttribute('valign','center');

	var cell2image = document.createElement('img');
	cell2image.setAttribute('src','images/arrow_pkfk.png');

	var cell3 = document.createElement('td');
	cell3.setAttribute('style','border:0px;');
	cell3.setAttribute('valign','top');

	var cell4 = document.createElement('td');
	cell4.setAttribute('style','border:0px;');
	cell4.setAttribute('valign','top');
	cell4.setAttribute('align','right');

	var cell4AHref = document.createElement('a');
	cell4AHref.setAttribute('href','javascript:void(0);');
	cell4AHref.setAttribute('onclick', 'javascript:deletePrimaryForeign("'+guid+'")');

	var cell4Image = document.createElement('img');
	cell4Image.setAttribute('src', 'images/delete.png');
	cell4Image.setAttribute('border','0');

	var linebreak = document.createElement('br');

	//compose the HTML document elements using appendChild.
	table.appendChild(row1);
		row1.appendChild(cell1);
			cell1.appendChild(PKeyText);
			cell1.appendChild(dataBaseSrcDropDown);
		row1.appendChild(cell2);
			cell2.appendChild(cell2image);
		row1.appendChild(cell3);
				cell3.appendChild(FKeyText);
				cell3.appendChild(dataBaseDestDropDown);
		row1.appendChild(cell4);
			cell4.appendChild(cell4AHref);
				cell4AHref.appendChild(cell4Image);

	document.getElementById("mappings").appendChild(table);
}
function MultiValueXMLHasChildren(guid){
	var container = document.getElementById('xmlSplitCharContainer_'+guid);
	var hasChildren = document.getElementById('inputHasChildren_'+guid).value;

	var srcCharSplitLabel = document.createElement('div');
	srcCharSplitLabel.innerHTML = "Split character:";

	var srcCharSplitInput = document.createElement('input');
	srcCharSplitInput.setAttribute('type','text');
	srcCharSplitInput.setAttribute('size','3');
	srcCharSplitInput.setAttribute('id','srcCharSplit_'+guid);
	srcCharSplitInput.setAttribute('name','srcCharSplit_'+guid);

	if(hasChildren == "yes"){
		//clear the container
		container.innerHTML = "";
	}else{
		container.appendChild(srcCharSplitLabel);
		container.appendChild(srcCharSplitInput);
	}
}
function getMultiValuedHTML(){
	var mappingDestination = document.getElementById("MappingType").value;
	var databaseTableInformation = document.getElementById("TableInformation").value;
	var fileType = document.getElementById('InputFileExt').value;

	if(mappingDestination != "ToDataBase"){
		//don't do it
		alert("This mapping can only be used when mapping to a database!");
		return false;
	}
	if((mappingDestination == "ToDataBase") && (databaseTableInformation == "")){
		alert("You must retrieve database information before defining mappings!");
		return false;
	}

	var guid = guidGenerator();
	var topLevel = databaseTableInformation.split('|');
	document.getElementById("guidList").value += guid+",multi;";

	//Controls for Database Table output
	var dataBaseDestDropDown = document.createElement('select');
	dataBaseDestDropDown.setAttribute('id','outputDataBaseTable_'+guid);
	dataBaseDestDropDown.setAttribute('name','outputDataBaseTable_'+guid);

	var dataStructureText = document.createElement('div');
    dataStructureText.innerHTML = "Output member:";

	//Interpret the table information and construct HTML controls
	for(var p=0; p<topLevel.length; p++){
		var tableName = topLevel[p].split(';')[0];
		var currColInfo = topLevel[p].split(';')[1].split(',');
		for(var q=0; q<currColInfo.length; q++){
			var colName = currColInfo[q].split(':')[0];
			var isPrimary = currColInfo[q].split(':')[1];

			if(isPrimary == "0"){
				var currCol = document.createElement('option');
    			currCol.setAttribute('value', tableName+"->"+colName);
    			currCol.innerHTML = tableName+"->"+colName;
    			dataBaseDestDropDown.appendChild(currCol);
    		}
		}
	}
 
	//Create the source HTML elements
	var srcColLabel = document.createElement('div');
	srcColLabel.innerHTML = "Input column number:"

	var srcColInput = document.createElement('input');
	srcColInput.setAttribute('type','text');
	srcColInput.setAttribute('size','3');
	srcColInput.setAttribute('id','inputColumnNumber_'+guid);
	srcColInput.setAttribute('name','inputColumnNumber_'+guid);
	srcColInput.setAttribute('onkeyup','javascript:queryAjaxLiveDataServiceForMulti("'+guid+'");')

	var srcHasChildrenLabel = document.createElement('div');
	srcHasChildrenLabel.innerHTML = "Has children?";

	var srcHasChildrenDropDown = document.createElement('select');
	srcHasChildrenDropDown.setAttribute('id','inputHasChildren_'+guid);
	srcHasChildrenDropDown.setAttribute('name','inputHasChildren_'+guid);
	srcHasChildrenDropDown.setAttribute("onchange","MultiValueXMLHasChildren('"+guid+"');");

	var srcHasChildrenDropDownYes = document.createElement('option');
	srcHasChildrenDropDownYes.setAttribute("value","yes");
	srcHasChildrenDropDownYes.innerHTML = "Yes";
	
	var srcHasChildrenDropDownNo = document.createElement('option');
	srcHasChildrenDropDownNo.setAttribute("value","no");
	srcHasChildrenDropDownNo.innerHTML = "No";

	srcHasChildrenDropDown.appendChild(srcHasChildrenDropDownYes);
	srcHasChildrenDropDown.appendChild(srcHasChildrenDropDownNo);

	var xmlSplitCharContainer = document.createElement('div');
	xmlSplitCharContainer.setAttribute('id','xmlSplitCharContainer_'+guid);
	xmlSplitCharContainer.setAttribute('name','xmlSplitCharContainer_'+guid);

	var srcCharSplitLabel = document.createElement('div');
	srcCharSplitLabel.innerHTML = "Split character:";

	var srcCharSplitInput = document.createElement('input');
	srcCharSplitInput.setAttribute('type','text');
	srcCharSplitInput.setAttribute('size','3');
	srcCharSplitInput.setAttribute('id','srcCharSplit_'+guid);
	srcCharSplitInput.setAttribute('name','srcCharSplit_'+guid);

	//Create the HTML Elements and append them as children
	var table = document.createElement('table');
	table.setAttribute('id','MultiValueTable_'+guid);
	table.setAttribute('width','800');
	table.setAttribute('border','1');

	var row1 = document.createElement('tr');

	var cell1 = document.createElement('td');
	cell1.setAttribute('style','border:0px');
	cell1.setAttribute('valign','top');

	var cell2 = document.createElement('td');
	cell2.setAttribute('style','border:0px');
	cell2.setAttribute('valign','center');

	var cell2image = document.createElement('img');
	cell2image.setAttribute('src','images/arrow_multi.png');

	var cell3 = document.createElement('td');
	cell3.setAttribute('style','border:0px;');
	cell3.setAttribute('valign','top');

	var cell4 = document.createElement('td');
	cell4.setAttribute('style','border:0px;');
	cell4.setAttribute('valign','top');
	cell4.setAttribute('align','right');

	var cell4AHref = document.createElement('a');
	cell4AHref.setAttribute('href','javascript:void(0);');
	cell4AHref.setAttribute('onclick', 'javascript:deleteMultiValue("'+guid+'")');

	var cell4Image = document.createElement('img');
	cell4Image.setAttribute('src', 'images/delete.png');
	cell4Image.setAttribute('border','0');

	var linebreak = document.createElement('br');

	//setup a table for dynamic data file column values
	var colNumAndValTable = document.createElement("table");
	colNumAndValTable.setAttribute("border","0");
	var ValTableRow = document.createElement("tr");
	var valTableCell1 = document.createElement("td");
	var valTableCell2 = document.createElement("td");
	var valTableCell3 = document.createElement("td");
	//setup a div 
	var valDiv = document.createElement("div");
	valDiv.setAttribute("id", "DisplayValue_"+guid);
	valDiv.setAttribute("name", "DisplayValue_"+guid);
	valDiv.setAttribute("style","color:red;");

	//ajax loading image
	var ajaxImage = document.createElement('img');
	ajaxImage.setAttribute('src','images/loader.gif');
	ajaxImage.setAttribute('id','liveDataLoader_'+guid);
	ajaxImage.setAttribute('name','liveDataLoader_'+guid);
	ajaxImage.setAttribute('style','display:none;');

	//compose the HTML document elements using appendChild.
	table.appendChild(row1);
		row1.appendChild(cell1);
			if((fileType == "csv")||(fileType == "xls")){
				cell1.appendChild(srcColLabel);

				cell1.appendChild(colNumAndValTable);
					colNumAndValTable.appendChild(ValTableRow);
						ValTableRow.appendChild(valTableCell1);
							valTableCell1.appendChild(srcColInput);
						ValTableRow.appendChild(valTableCell2);
							valTableCell2.appendChild(valDiv);
						ValTableRow.appendChild(valTableCell3);
							valTableCell3.appendChild(ajaxImage);

				cell1.appendChild(srcCharSplitLabel);
				cell1.appendChild(srcCharSplitInput);
			}else if (fileType == "xml"){
				cell1.appendChild(srcColLabel);

				cell1.appendChild(colNumAndValTable);
					colNumAndValTable.appendChild(ValTableRow);
						ValTableRow.appendChild(valTableCell1);
							valTableCell1.appendChild(srcColInput);
						ValTableRow.appendChild(valTableCell2);
							valTableCell2.appendChild(valDiv);
						ValTableRow.appendChild(valTableCell3);
							valTableCell3.appendChild(ajaxImage);

				cell1.appendChild(srcHasChildrenLabel);
				cell1.appendChild(srcHasChildrenDropDown);
				cell1.appendChild(xmlSplitCharContainer);
			}
		row1.appendChild(cell2);
			cell2.appendChild(cell2image);
		row1.appendChild(cell3);
				cell3.appendChild(dataStructureText);
				cell3.appendChild(dataBaseDestDropDown);
		row1.appendChild(cell4);
			cell4.appendChild(cell4AHref);
				cell4AHref.appendChild(cell4Image);

	document.getElementById("mappings").appendChild(table);
}
function getOneToOneMappingHTML(){
	var guid = guidGenerator();
	var databaseTableInformation = document.getElementById("TableInformation").value;
	var topLevel = databaseTableInformation.split('|');
	document.getElementById("guidList").value += guid+",1:1;";

	var mappingDestination = document.getElementById("MappingType").value;

	//Controls for Database Table output
	var distinctCB = document.createElement('input');
	distinctCB.setAttribute('type','checkbox');
	distinctCB.setAttribute('id','outDatabaseTableDistinct_'+guid);
	distinctCB.setAttribute('name','outDatabaseTableDistinct_'+guid);

	var distinctLabel = document.createElement('div');
	distinctLabel.innerHTML = "Distinct?";

	var dataBaseDestDropDown = document.createElement('select');
	dataBaseDestDropDown.setAttribute('id','outputDataBaseTable_'+guid);
	dataBaseDestDropDown.setAttribute('name','outputDataBaseTable_'+guid);

	if((mappingDestination == "ToDataBase") && (databaseTableInformation == "")){
		alert("You must retrieve database information before defining mappings!");
		return false;
	}

	//Interpret the table information and construct HTML controls
	if(mappingDestination == "ToDataBase"){
		for(var p=0; p<topLevel.length; p++){
			var tableName = topLevel[p].split(';')[0];
			var currColInfo = topLevel[p].split(';')[1].split(',');
			for(var q=0; q<currColInfo.length; q++){
				var colName = currColInfo[q].split(':')[0];
				var isPrimary = currColInfo[q].split(':')[1];

				if(isPrimary == "0"){
					var currCol = document.createElement('option');
	    			currCol.setAttribute('value', tableName+"->"+colName);
	    			currCol.innerHTML = tableName+"->"+colName;
	    			dataBaseDestDropDown.appendChild(currCol);
	    		}
			}
		}
	}

	//Controls for Datastructure output
	var dataStructureDestDropDown = document.createElement('select');
	dataStructureDestDropDown.setAttribute('id','outputDataMember_'+guid);
	dataStructureDestDropDown.setAttribute('name','outputDataMember_'+guid);

	var dataStructureDestOpt1 = document.createElement('option');
    dataStructureDestOpt1.setAttribute('value', 'Album->name');
    dataStructureDestOpt1.innerHTML = 'Album->name';
    
    var dataStructureDestOpt2 = document.createElement('option');
    dataStructureDestOpt2.setAttribute('value', 'Album->discNumber');
    dataStructureDestOpt2.innerHTML = 'Album->discNumber';
    
    var dataStructureDestOpt3 = document.createElement('option');
    dataStructureDestOpt3.setAttribute('value', 'Track->artists');
    dataStructureDestOpt3.innerHTML = 'Track->artists';
    
    var dataStructureDestOpt4 = document.createElement('option');
    dataStructureDestOpt4.setAttribute('value', 'Track->name');
    dataStructureDestOpt4.innerHTML = 'Track->name';
    
    var dataStructureDestOpt5 = document.createElement('option');
    dataStructureDestOpt5.setAttribute('value', 'Track->length');
    dataStructureDestOpt5.innerHTML = 'Track->length';
    
    var dataStructureDestOpt6 = document.createElement('option');
    dataStructureDestOpt6.setAttribute('value', 'Track->number');
    dataStructureDestOpt6.innerHTML = 'Track->number';
    
    var dataStructureDestOpt7 = document.createElement('option');
    dataStructureDestOpt7.setAttribute('value', 'Track->ISRC');
    dataStructureDestOpt7.innerHTML = 'Track->ISRC';
    
    var dataStructureDestOpt8 = document.createElement('option');
    dataStructureDestOpt8.setAttribute('value', 'Album->ISBN');
    dataStructureDestOpt8.innerHTML = 'Album->ISBN';

    var dataStructureText = document.createElement('div');
    dataStructureText.innerHTML = "Output member:";
    
 
	//Create the HTML Elements and append them as children
	var table = document.createElement('table');
	table.setAttribute('id','OneToOneTable_'+guid);
	table.setAttribute('width','800');
	table.setAttribute('border','1');

	var row1 = document.createElement('tr');

	var cell1 = document.createElement('td');
	cell1.setAttribute('style','border:0px');
	cell1.setAttribute('valign','top');

	var inputColNumDiv = document.createElement('div');
	inputColNumDiv.innerHTML = "Input column number: ";

	var inputColNumInput = document.createElement('input');
	inputColNumInput.setAttribute('id', 'inputColumnNumber_'+guid);
	inputColNumInput.setAttribute('name', 'inputColumnNumber_'+guid);
	inputColNumInput.setAttribute('size', '3');
	inputColNumInput.setAttribute('type', 'text');
	inputColNumInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValue("'+guid+'");');

	var inputInputFunction = document.createElement('select');
	inputInputFunction.setAttribute('id', 'inputFunction_'+guid);
	inputInputFunction.setAttribute('name','inputFunction_'+guid);
	inputInputFunction.setAttribute('onchange', 'javascript:showOptions(this);queryAjaxLiveDataServiceForNewColValue("'+guid+'");');

	var inputFunctionOpt1 = document.createElement('option');
	inputFunctionOpt1.setAttribute('value', '--');
	inputFunctionOpt1.innerHTML = '--Choose a function--';

	var inputFunctionOpt2 = document.createElement('option');
	inputFunctionOpt2.setAttribute('value', 'char');
	inputFunctionOpt2.innerHTML = 'character';

	var inputFunctionOpt3 = document.createElement('option');
	inputFunctionOpt3.setAttribute('value', 'substr');
	inputFunctionOpt3.innerHTML = 'sub string';

	var inputFunctionOpt4 = document.createElement('option');
	inputFunctionOpt4.setAttribute('value', 'direct');
	inputFunctionOpt4.innerHTML = 'direct copy';
	
	var inputFunctionOpt5 = document.createElement('option');
	inputFunctionOpt5.setAttribute('value', 'eval');
	inputFunctionOpt5.innerHTML = 'custom evaluation';

	var showCharOpt = document.createElement('div');
	showCharOpt.setAttribute('id','ShowCharacterOption_'+guid);
	showCharOpt.setAttribute('style','display:none;');

	var charText = document.createElement('div');
	charText.innerHTML = "character";

	var inputCharacter = document.createElement('input');
	inputCharacter.setAttribute('size','3');
	inputCharacter.setAttribute('type','text');
	inputCharacter.setAttribute('id','inputCharNum_'+guid);
	inputCharacter.setAttribute('name','inputCharNum_'+guid);
	inputCharacter.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValue("'+guid+'");');

	var showSubStringOption = document.createElement('div');
	showSubStringOption.setAttribute('id','ShowSubStringOption_'+guid);
	showSubStringOption.setAttribute('style','display:none;');

	var substringText = document.createElement('div');
	substringText.innerHTML = "substring";

	var substringStartText = document.createElement('div');
	substringStartText.innerHTML = "Start";

	var substringLengthText = document.createElement('div');
	substringLengthText.innerHTML = "Length";

	var subStringStartInput = document.createElement('input');
	subStringStartInput.setAttribute('size','3');
	subStringStartInput.setAttribute('type','text');
	subStringStartInput.setAttribute('id','inputSubStart_'+guid);
	subStringStartInput.setAttribute('name','inputSubStart_'+guid);
	subStringStartInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValue("'+guid+'");');

	var subStringLengthInput = document.createElement('input');
	subStringLengthInput.setAttribute('size','3');
	subStringLengthInput.setAttribute('type','text');
	subStringLengthInput.setAttribute('id','inputSubLength_'+guid);
	subStringLengthInput.setAttribute('name','inputSubLength_'+guid);
	subStringLengthInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValue("'+guid+'");');

	var showCustomEvalDiv = document.createElement('div');
	showCustomEvalDiv.setAttribute('id', 'ShowCustomEval_'+guid);
	showCustomEvalDiv.setAttribute('style', 'display:none;');

	var showCustomEvalInnerDiv = document.createElement('div');
	showCustomEvalInnerDiv.innerHTML = "Use the variable '#ColValue' in place of column value.";

	var customEvalTextInput = document.createElement('textarea');
	customEvalTextInput.setAttribute('cols','35');
	customEvalTextInput.setAttribute('rows','10');
	customEvalTextInput.setAttribute('id','inputCustomEval_'+guid);
	customEvalTextInput.setAttribute('name','inputCustomEval_'+guid);
	customEvalTextInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValue("'+guid+'");');

	var cell2 = document.createElement('td');
	cell2.setAttribute('style','border:0px');
	cell2.setAttribute('valign','center');

	var cell2image = document.createElement('img');
	cell2image.setAttribute('src','images/arrow_11.png');

	var cell3 = document.createElement('td');
	cell3.setAttribute('style','border:0px;');
	cell3.setAttribute('valign','top');

	var cell3DivElement = document.createElement('div');
	cell3DivElement.innerHTML = "Output column number: ";

	var cell3InputOutputCol = document.createElement('input');
	cell3InputOutputCol.setAttribute('size','3');
	cell3InputOutputCol.setAttribute('id','outputColumnNumber_'+guid);
	cell3InputOutputCol.setAttribute('name','outputColumnNumber_'+guid);
	cell3InputOutputCol.setAttribute('type','text');


	var cell4 = document.createElement('td');
	cell4.setAttribute('style','border:0px;');
	cell4.setAttribute('valign','top');
	cell4.setAttribute('align','right');

	var cell4AHref = document.createElement('a');
	cell4AHref.setAttribute('href','javascript:void(0);');
	cell4AHref.setAttribute('onclick', 'javascript:deleteOneToOne("'+guid+'")');

	var cell4Image = document.createElement('img');
	cell4Image.setAttribute('src', 'images/delete.png');
	cell4Image.setAttribute('border','0');

	var linebreak = document.createElement('br');

	//setup a table for dynamic data file column values
	var colNumAndValTable = document.createElement("table");
	colNumAndValTable.setAttribute("border","0");
	var ValTableRow = document.createElement("tr");
	var valTableCell1 = document.createElement("td");
	var valTableCell2 = document.createElement("td");
	var valTableCell3 = document.createElement("td");
	//setup a div 
	var valDiv = document.createElement("div");
	valDiv.setAttribute("id", "DisplayValue_"+guid);
	valDiv.setAttribute("name", "DisplayValue_"+guid);
	valDiv.setAttribute("style","color:red;");

	//ajax loading image
	var ajaxImage = document.createElement('img');
	ajaxImage.setAttribute('src','images/loader.gif');
	ajaxImage.setAttribute('id','liveDataLoader_'+guid);
	ajaxImage.setAttribute('name','liveDataLoader_'+guid);
	ajaxImage.setAttribute('style','display:none;');

	//compose the HTML document elements using appendChild.
	table.appendChild(row1);
		row1.appendChild(cell1);
			cell1.appendChild(inputColNumDiv);

			cell1.appendChild(colNumAndValTable);
				colNumAndValTable.appendChild(ValTableRow);
					ValTableRow.appendChild(valTableCell1);
						valTableCell1.appendChild(inputColNumInput);
					ValTableRow.appendChild(valTableCell2);
						valTableCell2.appendChild(valDiv);
					ValTableRow.appendChild(valTableCell3);
						valTableCell3.appendChild(ajaxImage);
			cell1.appendChild(inputInputFunction);
				inputInputFunction.appendChild(inputFunctionOpt1);
				inputInputFunction.appendChild(inputFunctionOpt2);
				inputInputFunction.appendChild(inputFunctionOpt3);
				inputInputFunction.appendChild(inputFunctionOpt4);
				inputInputFunction.appendChild(inputFunctionOpt5);
			cell1.appendChild(showCharOpt);
				showCharOpt.appendChild(charText);
				showCharOpt.appendChild(inputCharacter);
			cell1.appendChild(showSubStringOption);
				showSubStringOption.appendChild(substringText);
				showSubStringOption.appendChild(substringStartText);
				showSubStringOption.appendChild(subStringStartInput);
				showSubStringOption.appendChild(substringLengthText);
				showSubStringOption.appendChild(subStringLengthInput);
			cell1.appendChild(showCustomEvalDiv);
				showCustomEvalDiv.appendChild(showCustomEvalInnerDiv);
				showCustomEvalDiv.appendChild(customEvalTextInput);
		row1.appendChild(cell2);
			cell2.appendChild(cell2image);
		row1.appendChild(cell3);
			if(mappingDestination == "ToDataStructure"){
				cell3.appendChild(dataStructureText);
				cell3.appendChild(dataStructureDestDropDown);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt1);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt2);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt3);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt4);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt5);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt6);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt7);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt8);
			}else if(mappingDestination == "ToDataBase"){
				cell3.appendChild(dataStructureText);
				cell3.appendChild(dataBaseDestDropDown);
				cell3.appendChild(distinctLabel);
				cell3.appendChild(distinctCB);
			}else{
				cell3.appendChild(cell3DivElement);
				cell3.appendChild(cell3InputOutputCol);	
			}
		row1.appendChild(cell4);
			cell4.appendChild(cell4AHref);
				cell4AHref.appendChild(cell4Image);

	document.getElementById("mappings").appendChild(table);
}
function getManyToOneMappingHTML(){
	var guid = guidGenerator();
	var databaseTableInformation = document.getElementById("TableInformation").value;
	var topLevel = databaseTableInformation.split('|');
	document.getElementById("guidList").value += guid+",many:1;";

	var mappingDestination = document.getElementById("MappingType").value;


	if((mappingDestination == "ToDataBase") && (databaseTableInformation == "")){
		alert("You must retrieve database information before defining mappings!");
		return false;
	}

	//Controls for Database Table output
	var dataBaseDestDropDown = document.createElement('select');
	dataBaseDestDropDown.setAttribute('id','outputDataBaseTable_'+guid);
	dataBaseDestDropDown.setAttribute('name','outputDataBaseTable_'+guid);

	if((mappingDestination == "ToDataBase") && (databaseTableInformation == "")){
		alert("You must retrieve database information before defining mappings!");
		return false;
	}

	//Interpret the table information and construct HTML controls
	if(mappingDestination == "ToDataBase"){
		for(var p=0; p<topLevel.length; p++){
			var tableName = topLevel[p].split(';')[0];
			var currColInfo = topLevel[p].split(';')[1].split(',');
			for(var q=0; q<currColInfo.length; q++){
				var colName = currColInfo[q].split(':')[0];
				var isPrimary = currColInfo[q].split(':')[1];

				if(isPrimary == "0"){
					var currCol = document.createElement('option');
	    			currCol.setAttribute('value', tableName+"->"+colName);
	    			currCol.innerHTML = tableName+"->"+colName;
	    			dataBaseDestDropDown.appendChild(currCol);
	    		}
			}
		}
	}

	//Controls for datastructure output
	var dataStructureDestDropDown = document.createElement('select');
	dataStructureDestDropDown.setAttribute('id','outputDataMember_'+guid);
	dataStructureDestDropDown.setAttribute('name','outputDataMember_'+guid);

	var dataStructureDestOpt1 = document.createElement('option');
    dataStructureDestOpt1.setAttribute('value', 'Album->name');
    dataStructureDestOpt1.innerHTML = 'Album->name';
    
    var dataStructureDestOpt2 = document.createElement('option');
    dataStructureDestOpt2.setAttribute('value', 'Album->discNumber');
    dataStructureDestOpt2.innerHTML = 'Album->discNumber';
    
    var dataStructureDestOpt3 = document.createElement('option');
    dataStructureDestOpt3.setAttribute('value', 'Track->artists');
    dataStructureDestOpt3.innerHTML = 'Track->artists';
    
    var dataStructureDestOpt4 = document.createElement('option');
    dataStructureDestOpt4.setAttribute('value', 'Track->name');
    dataStructureDestOpt4.innerHTML = 'Track->name';
    
    var dataStructureDestOpt5 = document.createElement('option');
    dataStructureDestOpt5.setAttribute('value', 'Track->length');
    dataStructureDestOpt5.innerHTML = 'Track->length';
    
    var dataStructureDestOpt6 = document.createElement('option');
    dataStructureDestOpt6.setAttribute('value', 'Track->number');
    dataStructureDestOpt6.innerHTML = 'Track->number';
    
    var dataStructureDestOpt7 = document.createElement('option');
    dataStructureDestOpt7.setAttribute('value', 'Track->ISRC');
    dataStructureDestOpt7.innerHTML = 'Track->ISRC';
    
    var dataStructureDestOpt8 = document.createElement('option');
    dataStructureDestOpt8.setAttribute('value', 'Album->ISBN');
    dataStructureDestOpt8.innerHTML = 'Album->ISBN';

    var dataStructureText = document.createElement('div');
    dataStructureText.innerHTML = "Output member:";

	//Create the HTML Elements and append them as children
	var table = document.createElement('table');
	table.setAttribute('id','ManyToOneTable_'+guid);
	table.setAttribute('width','800');
	table.setAttribute('border','1');

	var row1 = document.createElement('tr');

	var cell1 = document.createElement('td');
	cell1.setAttribute('style','border:0px');
	cell1.setAttribute('valign','top');

	var listOfMappingsDiv = document.createElement('div');
	listOfMappingsDiv.setAttribute('id','ListOfMappings_'+guid);

	var numMappingsInput = document.createElement('input');
	numMappingsInput.setAttribute('type','hidden');
	numMappingsInput.setAttribute('id','numMappings_'+guid);
	numMappingsInput.setAttribute('name','numMappings_'+guid);
	numMappingsInput.setAttribute('value','1');

	var mappingNumber = document.createElement('b');
	mappingNumber.innerHTML = "1";

	var inputColNumDiv = document.createElement('div');
	inputColNumDiv.innerHTML = "Input column number: ";

	var inputColNumInput = document.createElement('input');
	inputColNumInput.setAttribute('id', 'inputColumnNumber_1_'+guid);
	inputColNumInput.setAttribute('name', 'inputColumnNumber_1_'+guid);
	inputColNumInput.setAttribute('size', '3');
	inputColNumInput.setAttribute('type', 'text');
	inputColNumInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("1", "'+guid+'");');

	var inputInputFunction = document.createElement('select');
	inputInputFunction.setAttribute('id', 'inputFunction_1_'+guid);
	inputInputFunction.setAttribute('name','inputFunction_1_'+guid);
	inputInputFunction.setAttribute('onchange', 'javascript:showOptionsManyToOne(this,1);queryAjaxLiveDataServiceForNewColValueManyToOne("1", "'+guid+'");');

	var inputFunctionOpt1 = document.createElement('option');
	inputFunctionOpt1.setAttribute('value', '--');
	inputFunctionOpt1.innerHTML = '--Choose a function--';

	var inputFunctionOpt2 = document.createElement('option');
	inputFunctionOpt2.setAttribute('value', 'char');
	inputFunctionOpt2.innerHTML = 'character';

	var inputFunctionOpt3 = document.createElement('option');
	inputFunctionOpt3.setAttribute('value', 'substr');
	inputFunctionOpt3.innerHTML = 'sub string';

	var inputFunctionOpt4 = document.createElement('option');
	inputFunctionOpt4.setAttribute('value', 'direct');
	inputFunctionOpt4.innerHTML = 'direct copy';
	
	var inputFunctionOpt5 = document.createElement('option');
	inputFunctionOpt5.setAttribute('value', 'eval');
	inputFunctionOpt5.innerHTML = 'custom evaluation';

	var showCharOpt = document.createElement('div');
	showCharOpt.setAttribute('id','ShowCharacterOption_1_'+guid);
	showCharOpt.setAttribute('style','display:none;');

	var charText = document.createElement('div');
	charText.innerHTML = "character";

	var inputCharacter = document.createElement('input');
	inputCharacter.setAttribute('size','3');
	inputCharacter.setAttribute('type','text');
	inputCharacter.setAttribute('id','inputCharNum_1_'+guid);
	inputCharacter.setAttribute('name','inputCharNum_1_'+guid);
	inputCharacter.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("1", "'+guid+'");');

	var showSubStringOption = document.createElement('div');
	showSubStringOption.setAttribute('id','ShowSubStringOption_1_'+guid);
	showSubStringOption.setAttribute('style','display:none;');

	var substringText = document.createElement('div');
	substringText.innerHTML = "substring";

	var substringStartText = document.createElement('div');
	substringStartText.innerHTML = "Start";

	var substringLengthText = document.createElement('div');
	substringLengthText.innerHTML = "Length";

	var subStringStartInput = document.createElement('input');
	subStringStartInput.setAttribute('size','3');
	subStringStartInput.setAttribute('type','text');
	subStringStartInput.setAttribute('id','inputSubStart_1_'+guid);
	subStringStartInput.setAttribute('name','inputSubStart_1_'+guid);
	subStringStartInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("1", "'+guid+'");');

	var subStringLengthInput = document.createElement('input');
	subStringLengthInput.setAttribute('size','3');
	subStringLengthInput.setAttribute('type','text');
	subStringLengthInput.setAttribute('id','inputSubLength_1_'+guid);
	subStringLengthInput.setAttribute('name','inputSubLength_1_'+guid);
	subStringLengthInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("1", "'+guid+'");');

	var showCustomEvalDiv = document.createElement('div');
	showCustomEvalDiv.setAttribute('id', 'ShowCustomEval_1_'+guid);
	showCustomEvalDiv.setAttribute('style', 'display:none;');

	var showCustomEvalInnerDiv = document.createElement('div');
	showCustomEvalInnerDiv.innerHTML = "Use the variable '#ColValue' in place of column value.";

	var customEvalTextInput = document.createElement('textarea');
	customEvalTextInput.setAttribute('cols','35');
	customEvalTextInput.setAttribute('rows','10');
	customEvalTextInput.setAttribute('id','inputCustomEval_1_'+guid);
	customEvalTextInput.setAttribute('name','inputCustomEval_1_'+guid);
	customEvalTextInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("1", "'+guid+'");');


	var addAnotherLink = document.createElement('div');
	addAnotherLink.setAttribute('id', 'AddAnotherLink_'+guid);

	var cell2 = document.createElement('td');
	cell2.setAttribute('style','border:0px');
	cell2.setAttribute('valign','center');

	var cell2image = document.createElement('img');
	cell2image.setAttribute('src','images/arrow_many1.png');

	var cell3 = document.createElement('td');
	cell3.setAttribute('style','border:0px;');
	cell3.setAttribute('valign','top');

	var cell3DivElement = document.createElement('div');
	cell3DivElement.innerHTML = "Output column number: ";

	var cell3InputOutputCol = document.createElement('input');
	cell3InputOutputCol.setAttribute('size','3');
	cell3InputOutputCol.setAttribute('id','outputColumnNumber_'+guid);
	cell3InputOutputCol.setAttribute('name','outputColumnNumber_'+guid);
	cell3InputOutputCol.setAttribute('type','text');

	var concatenationDiv = document.createElement('div');
	concatenationDiv.innerHTML = "Concatenation: ";

	var concatenationInput = document.createElement('input');
	concatenationInput.setAttribute('size','15');
	concatenationInput.setAttribute('id','outputColumnOrder_'+guid);
	concatenationInput.setAttribute('name','outputColumnOrder_'+guid);
	concatenationInput.setAttribute('type','text');
	concatenationInput.setAttribute('onkeyup', 'queryAjaxLiveDataServiceForConcat("'+guid+'");')


	var cell4 = document.createElement('td');
	cell4.setAttribute('style','border:0px;');
	cell4.setAttribute('valign','top');
	cell4.setAttribute('align','right');

	var cell4AHref = document.createElement('a');
	cell4AHref.setAttribute('href','javascript:void(0);');
	cell4AHref.setAttribute('onclick', 'javascript:deleteManyToOne("'+guid+'")');

	var cell4Image = document.createElement('img');
	cell4Image.setAttribute('src', 'images/delete.png');
	cell4Image.setAttribute('border','0');

	var linebreak = document.createElement('br');

	//setup a table for dynamic data file column values
	var colNumAndValTable = document.createElement("table");
	colNumAndValTable.setAttribute("border","0");
	var ValTableRow = document.createElement("tr");
	var valTableCell1 = document.createElement("td");
	var valTableCell2 = document.createElement("td");
	var valTableCell3 = document.createElement("td");
	//setup a div 
	var valDiv = document.createElement("div");
	valDiv.setAttribute("id", "DisplayValue_1_"+guid);
	valDiv.setAttribute("name", "DisplayValue_1_"+guid);
	valDiv.setAttribute("style","color:red;");
	//ajax loading image
	var ajaxImage = document.createElement('img');
	ajaxImage.setAttribute('src','images/loader.gif');
	ajaxImage.setAttribute('id','liveDataLoader_1_'+guid);
	ajaxImage.setAttribute('name','liveDataLoader_1_'+guid);
	ajaxImage.setAttribute('style','display:none;');

	//setup a div 
	var valDiv2 = document.createElement("div");
	valDiv2.setAttribute("id", "DisplayValueConcat_"+guid);
	valDiv2.setAttribute("name", "DisplayValueConcat_"+guid);
	valDiv2.setAttribute("style","color:red;");
	//ajax loading image
	var ajaxImage2 = document.createElement('img');
	ajaxImage2.setAttribute('src','images/loader.gif');
	ajaxImage2.setAttribute('id','liveDataLoaderConcat_'+guid);
	ajaxImage2.setAttribute('name','liveDataLoaderConcat_'+guid);
	ajaxImage2.setAttribute('style','display:none;');

	//compose the HTML document elements using appendChild.
	table.appendChild(row1);
		row1.appendChild(cell1);
			cell1.appendChild(listOfMappingsDiv)
				listOfMappingsDiv.appendChild(numMappingsInput)
				listOfMappingsDiv.appendChild(mappingNumber)

				listOfMappingsDiv.appendChild(colNumAndValTable);
					colNumAndValTable.appendChild(ValTableRow);
						ValTableRow.appendChild(valTableCell1);
							valTableCell1.appendChild(inputColNumInput);
						ValTableRow.appendChild(valTableCell2);
							valTableCell2.appendChild(valDiv);
						ValTableRow.appendChild(valTableCell3);
							valTableCell3.appendChild(ajaxImage);
				listOfMappingsDiv.appendChild(inputInputFunction);
					inputInputFunction.appendChild(inputFunctionOpt1);
					inputInputFunction.appendChild(inputFunctionOpt2);
					inputInputFunction.appendChild(inputFunctionOpt3);
					inputInputFunction.appendChild(inputFunctionOpt4);
					inputInputFunction.appendChild(inputFunctionOpt5);
				listOfMappingsDiv.appendChild(showCharOpt);
					showCharOpt.appendChild(charText);
					showCharOpt.appendChild(inputCharacter);
				listOfMappingsDiv.appendChild(showSubStringOption);
					showSubStringOption.appendChild(substringText);
					showSubStringOption.appendChild(substringStartText);
					showSubStringOption.appendChild(subStringStartInput);
					showSubStringOption.appendChild(substringLengthText);
					showSubStringOption.appendChild(subStringLengthInput);
				listOfMappingsDiv.appendChild(showCustomEvalDiv);
					showCustomEvalDiv.appendChild(showCustomEvalInnerDiv);
					showCustomEvalDiv.appendChild(customEvalTextInput);
			cell1.appendChild(addAnotherLink);
		row1.appendChild(cell2);
			cell2.appendChild(cell2image);
		row1.appendChild(cell3);

			if(mappingDestination == "ToDataStructure"){
				cell3.appendChild(dataStructureText);
				cell3.appendChild(dataStructureDestDropDown);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt1);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt2);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt3);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt4);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt5);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt6);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt7);
				dataStructureDestDropDown.appendChild(dataStructureDestOpt8);
			}else if(mappingDestination == "ToDataBase"){
				cell3.appendChild(dataStructureText);
				cell3.appendChild(dataBaseDestDropDown);
			}else{
				cell3.appendChild(cell3DivElement);
				cell3.appendChild(cell3InputOutputCol);
			}

			cell3.appendChild(concatenationDiv);
			cell3.appendChild(concatenationInput);
			cell3.appendChild(valDiv2);
			cell3.appendChild(ajaxImage2);

		row1.appendChild(cell4);
			cell4.appendChild(cell4AHref);
				cell4AHref.appendChild(cell4Image);

	document.getElementById("mappings").appendChild(table);

	var currentNumberMappings = document.getElementById("numMappings_"+guid).value;

	document.getElementById("AddAnotherLink_"+guid).innerHTML = "<a href='javascript:void(0);' onclick='javascript:AddMapping(\""+guid+"\","+ currentNumberMappings +");'><img border='0' src='images/addanother.png' /></a>";
}
function AddMapping(guid, numMappings){
	var mappingsList = document.getElementById("ListOfMappings_"+guid);

	var currentNumberMappings = parseInt(document.getElementById("numMappings_"+guid).value);

	document.getElementById("numMappings_"+guid).value = currentNumberMappings+1;

	var listOfMappingsDiv = document.createElement('div');

	var mappingNumber = document.createElement('b');
	mappingNumber.innerHTML = currentNumberMappings+1;

	var inputColNumDiv = document.createElement('div');
	inputColNumDiv.innerHTML = "Input column number: ";

	var inputColNumInput = document.createElement('input');
	inputColNumInput.setAttribute('id', 'inputColumnNumber_'+(currentNumberMappings+1)+'_'+guid);
	inputColNumInput.setAttribute('name', 'inputColumnNumber_'+(currentNumberMappings+1)+'_'+guid);
	inputColNumInput.setAttribute('size', '3');
	inputColNumInput.setAttribute('type', 'text');
	inputColNumInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("'+(currentNumberMappings+1)+'", "'+guid+'");');

	var inputInputFunction = document.createElement('select');
	inputInputFunction.setAttribute('id', 'inputFunction_'+(currentNumberMappings+1)+'_'+guid);
	inputInputFunction.setAttribute('name','inputFunction_'+(currentNumberMappings+1)+'_'+guid);
	inputInputFunction.setAttribute('onchange', 'javascript:showOptionsManyToOne(this,'+(currentNumberMappings+1)+');queryAjaxLiveDataServiceForNewColValueManyToOne("'+(currentNumberMappings+1)+'", "'+guid+'");');

	var inputFunctionOpt1 = document.createElement('option');
	inputFunctionOpt1.setAttribute('value', '--');
	inputFunctionOpt1.innerHTML = '--Choose a function--';

	var inputFunctionOpt2 = document.createElement('option');
	inputFunctionOpt2.setAttribute('value', 'char');
	inputFunctionOpt2.innerHTML = 'character';

	var inputFunctionOpt3 = document.createElement('option');
	inputFunctionOpt3.setAttribute('value', 'substr');
	inputFunctionOpt3.innerHTML = 'sub string';

	var inputFunctionOpt4 = document.createElement('option');
	inputFunctionOpt4.setAttribute('value', 'direct');
	inputFunctionOpt4.innerHTML = 'direct copy';
	
	var inputFunctionOpt5 = document.createElement('option');
	inputFunctionOpt5.setAttribute('value', 'eval');
	inputFunctionOpt5.innerHTML = 'custom evaluation';

	var showCharOpt = document.createElement('div');
	showCharOpt.setAttribute('id','ShowCharacterOption_'+(currentNumberMappings+1)+'_'+guid);
	showCharOpt.setAttribute('style','display:none;');

	var charText = document.createElement('div');
	charText.innerHTML = "character";

	var inputCharacter = document.createElement('input');
	inputCharacter.setAttribute('size','3');
	inputCharacter.setAttribute('type','text');
	inputCharacter.setAttribute('id','inputCharNum_'+(currentNumberMappings+1)+'_'+guid);
	inputCharacter.setAttribute('name','inputCharNum_'+(currentNumberMappings+1)+'_'+guid);
	inputCharacter.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("'+(currentNumberMappings+1)+'", "'+guid+'");');

	var showSubStringOption = document.createElement('div');
	showSubStringOption.setAttribute('id','ShowSubStringOption_'+(currentNumberMappings+1)+'_'+guid);
	showSubStringOption.setAttribute('style','display:none;');

	var substringText = document.createElement('div');
	substringText.innerHTML = "substring";

	var substringStartText = document.createElement('div');
	substringStartText.innerHTML = "Start";

	var substringLengthText = document.createElement('div');
	substringLengthText.innerHTML = "Length";

	var subStringStartInput = document.createElement('input');
	subStringStartInput.setAttribute('size','3');
	subStringStartInput.setAttribute('type','text');
	subStringStartInput.setAttribute('id','inputSubStart_'+(currentNumberMappings+1)+'_'+guid);
	subStringStartInput.setAttribute('name','inputSubStart_'+(currentNumberMappings+1)+'_'+guid);
	subStringStartInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("'+(currentNumberMappings+1)+'", "'+guid+'");');

	var subStringLengthInput = document.createElement('input');
	subStringLengthInput.setAttribute('size','3');
	subStringLengthInput.setAttribute('type','text');
	subStringLengthInput.setAttribute('id','inputSubLength_'+(currentNumberMappings+1)+'_'+guid);
	subStringLengthInput.setAttribute('name','inputSubLength_'+(currentNumberMappings+1)+'_'+guid);
	subStringLengthInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("'+(currentNumberMappings+1)+'", "'+guid+'");');

	var showCustomEvalDiv = document.createElement('div');
	showCustomEvalDiv.setAttribute('id', 'ShowCustomEval_'+(currentNumberMappings+1)+'_'+guid);
	showCustomEvalDiv.setAttribute('style', 'display:none;');

	var showCustomEvalInnerDiv = document.createElement('div');
	showCustomEvalInnerDiv.innerHTML = "Use the variable '#ColValue' in place of column value.";

	var customEvalTextInput = document.createElement('textarea');
	customEvalTextInput.setAttribute('cols','35');
	customEvalTextInput.setAttribute('rows','10');
	customEvalTextInput.setAttribute('id','inputCustomEval_'+(currentNumberMappings+1)+'_'+guid);
	customEvalTextInput.setAttribute('name','inputCustomEval_'+(currentNumberMappings+1)+'_'+guid);
	customEvalTextInput.setAttribute('onkeyup','queryAjaxLiveDataServiceForNewColValueManyToOne("'+(currentNumberMappings+1)+'", "'+guid+'");');

	var linebreak = document.createElement('br');

	//setup a table for dynamic data file column values
	var colNumAndValTable = document.createElement("table");
	colNumAndValTable.setAttribute("border","0");
	var ValTableRow = document.createElement("tr");
	var valTableCell1 = document.createElement("td");
	var valTableCell2 = document.createElement("td");
	var valTableCell3 = document.createElement("td");
	//setup a div 
	var valDiv = document.createElement("div");
	valDiv.setAttribute("id", 'DisplayValue_'+(currentNumberMappings+1)+'_'+guid);
	valDiv.setAttribute("name", 'DisplayValue_'+(currentNumberMappings+1)+'_'+guid);
	valDiv.setAttribute("style","color:red;");
	//ajax loading image
	var ajaxImage = document.createElement('img');
	ajaxImage.setAttribute('src','images/loader.gif');
	ajaxImage.setAttribute('id','liveDataLoader_'+(currentNumberMappings+1)+'_'+guid);
	ajaxImage.setAttribute('name','liveDataLoader_'+(currentNumberMappings+1)+'_'+guid);
	ajaxImage.setAttribute('style','display:none;');

	listOfMappingsDiv.appendChild(mappingNumber);
	listOfMappingsDiv.appendChild(inputColNumDiv);

	listOfMappingsDiv.appendChild(colNumAndValTable);
		colNumAndValTable.appendChild(ValTableRow);
			ValTableRow.appendChild(valTableCell1);
				valTableCell1.appendChild(inputColNumInput);
			ValTableRow.appendChild(valTableCell2);
				valTableCell2.appendChild(valDiv);
			ValTableRow.appendChild(valTableCell3);
				valTableCell3.appendChild(ajaxImage);
	listOfMappingsDiv.appendChild(inputInputFunction);
		inputInputFunction.appendChild(inputFunctionOpt1);
		inputInputFunction.appendChild(inputFunctionOpt2);
		inputInputFunction.appendChild(inputFunctionOpt3);
		inputInputFunction.appendChild(inputFunctionOpt4);
		inputInputFunction.appendChild(inputFunctionOpt5);
	listOfMappingsDiv.appendChild(showCharOpt);
		showCharOpt.appendChild(charText);
		showCharOpt.appendChild(inputCharacter);
	listOfMappingsDiv.appendChild(showSubStringOption);
		showSubStringOption.appendChild(substringText);
		showSubStringOption.appendChild(substringStartText);
		showSubStringOption.appendChild(subStringStartInput);
		showSubStringOption.appendChild(substringLengthText);
		showSubStringOption.appendChild(subStringLengthInput);
	listOfMappingsDiv.appendChild(showCustomEvalDiv);
		showCustomEvalDiv.appendChild(showCustomEvalInnerDiv);
		showCustomEvalDiv.appendChild(customEvalTextInput);
				
	mappingsList.appendChild(listOfMappingsDiv);
}
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
function getColumnValueFromFirstRowOfFile(columnNumber){
	columnNumber = parseInt(columnNumber);
	var firstRow = document.getElementById("FirstRowFromFile").value;
	var values = firstRow.split("<->");
	var colCount = values.length;


	if((isNaN(columnNumber)) || ((columnNumber+1) > colCount)){
		return "";
	}

	//a comma seperated string that represents the first row
	var firstRow = document.getElementById("FirstRowFromFile").value;
	var values = firstRow.split("<->");

	return values[columnNumber];
}
function trim(str,chars){
    return ltrim(rtrim(str,chars),chars);
}
function ltrim(str,chars){
    chars=chars||'\\s';
    return str.replace(new RegExp("^["+chars+"]+","g"),"");
}
function rtrim(str,chars){
    chars=chars||'\\s';
    return str.replace(new RegExp("["+chars+"]+$","g"),"");
}
