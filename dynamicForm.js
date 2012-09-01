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
	outputColNum.disabled = true;
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

	outputColNum.disabled = true;
	outputColOrder.disabled = true;

	table.style.display = 'none';

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
	}else if(dropdownlist.value == "ToDataStructure"){
		document.getElementById('outputdatafileform').style.display = 'none';
	}
}

function getOneToOneMappingHTML(){
	var guid = guidGenerator();

	document.getElementById("guidList").value += guid+",1:1;";

	var mappingDestination = document.getElementById("MappingType").value;

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

	var inputInputFunction = document.createElement('select');
	inputInputFunction.setAttribute('id', 'inputFunction_'+guid);
	inputInputFunction.setAttribute('name','inputFunction_'+guid);
	inputInputFunction.setAttribute('onchange', 'javascript:showOptions(this);');

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

	var subStringLengthInput = document.createElement('input');
	subStringLengthInput.setAttribute('size','3');
	subStringLengthInput.setAttribute('type','text');
	subStringLengthInput.setAttribute('id','inputSubLength_'+guid);
	subStringLengthInput.setAttribute('name','inputSubLength_'+guid);

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

	var cell2 = document.createElement('td');
	cell2.setAttribute('style','border:0px');
	cell2.setAttribute('valign','center');

	var cell2image = document.createElement('img');
	cell2image.setAttribute('src','images/arrow.png');

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

	//compose the HTML document elements using appendChild.
	table.appendChild(row1);
		row1.appendChild(cell1);
			cell1.appendChild(inputColNumDiv);
			cell1.appendChild(inputColNumInput);
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
			cell3.appendChild(cell3DivElement);
			cell3.appendChild(cell3InputOutputCol);
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

			}
		row1.appendChild(cell4);
			cell4.appendChild(cell4AHref);
				cell4AHref.appendChild(cell4Image);

	document.getElementById("mappings").appendChild(table);
}

function getManyToOneMappingHTML(){
	var guid = guidGenerator();

	document.getElementById("guidList").value += guid+",many:1;";


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

	var inputInputFunction = document.createElement('select');
	inputInputFunction.setAttribute('id', 'inputFunction_1_'+guid);
	inputInputFunction.setAttribute('name','inputFunction_1_'+guid);
	inputInputFunction.setAttribute('onchange', 'javascript:showOptionsManyToOne(this,1);');

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

	var subStringLengthInput = document.createElement('input');
	subStringLengthInput.setAttribute('size','3');
	subStringLengthInput.setAttribute('type','text');
	subStringLengthInput.setAttribute('id','inputSubLength_1_'+guid);
	subStringLengthInput.setAttribute('name','inputSubLength_1_'+guid);

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


	var addAnotherLink = document.createElement('div');
	addAnotherLink.setAttribute('id', 'AddAnotherLink_'+guid);

	var cell2 = document.createElement('td');
	cell2.setAttribute('style','border:0px');
	cell2.setAttribute('valign','center');

	var cell2image = document.createElement('img');
	cell2image.setAttribute('src','images/arrow.png');

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

	//compose the HTML document elements using appendChild.
	table.appendChild(row1);
		row1.appendChild(cell1);
			cell1.appendChild(listOfMappingsDiv)
				listOfMappingsDiv.appendChild(numMappingsInput)
				listOfMappingsDiv.appendChild(mappingNumber)
				listOfMappingsDiv.appendChild(inputColNumDiv);
				listOfMappingsDiv.appendChild(inputColNumInput);
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
			cell3.appendChild(cell3DivElement);
			cell3.appendChild(cell3InputOutputCol);
			cell3.appendChild(concatenationDiv);
			cell3.appendChild(concatenationInput);
		row1.appendChild(cell4);
			cell4.appendChild(cell4AHref);
				cell4AHref.appendChild(cell4Image);




	/*var html =  "<table width='800' id='ManyToOneTable_"+guid+"' border='1'>"+
					"<tr>"+
						"<td style='border:0px;' valign='top'>"+
							"<div id='ListOfMappings_"+guid+"'>"+
							"<input type='hidden' id='numMappings_"+guid+"' name='numMappings_"+guid+"' 
							value='1' ></input>"+
							"<b>1</b><br/>"+
							"Input column number: <input id='inputColumnNumber_1_"+guid+"' size='3' name='inputColumnNumber_1_"+guid+"' type='text'></input><br/>"+
							"<select id='inputFunction_1_"+guid+"' name='inputFunction_1_"+guid+"' onchange='javascript:showOptionsManyToOne(this,1);'>"+
								"<option value='--'>--Choose a function--</option>"+
								"<option value='char'>character</option>"+
								"<option value='substr'>sub string</option>"+
								"<option value='direct'>direct copy</option>"+
								"<option value='eval'>custom evaluation</option>"+
							"</select><br/>"+

							"<div id='ShowCharacterOption_1_"+guid+"' style='display:none;'>"+
								"character <input size='3' type='text' id='inputCharNum_1_"+guid+"' name='inputCharNum_1_"+guid+"'></input><br/>"+
							"</div>"+
							"<div id='ShowSubStringOption_1_"+guid+"' style='display:none;'>"+
								"substring<br/>"+
								"start <input size='3' type='text' id='inputSubStart_1_"+guid+"' name='inputSubStart_1_"+guid+"'></input><br/>"+
								"length <input size='3' type='text' id='inputSubLength_1_"+guid+"' name='inputSubLength_1_"+guid+"'></input>"+
							"</div>"+
							
							"<div id='ShowCustomEval_1_"+guid+"' style='display:none;'>"+
								"Use the variable '#ColValue' in place of column value.<br/>"+
								"<textarea cols='35' rows='10' id='inputCustomEval_1_"+guid+"' name='inputCustomEval_1_"+guid+"'> </textarea>"+
							"</div>"+

							"</div>"+
							"<div id='AddAnotherLink_"+guid+"'>"+
							"</div>"+
						"</td>"+
						"<td style='border:0px;'><img src='images/arrow.png' /></td>"+
						"<td style='border:0px;' >"+
							"Output column number: <input size='3' id='outputColumnNumber_"+guid+"' name='outputColumnNumber_"+guid+"' type='text'></input><br/>"+
							"Concatenation: <input size='15' 
							id='outputColumnOrder_"+guid+"' name='outputColumnOrder_"+guid+"' 
							type='text'></input>"+
						"</td>"+

						"<td style='border:0px;' valign='top' align='right'>"+
							"<a href='javascript:void(0);' onclick=\"javascript:deleteManyToOne('"+guid+"')\"><img border='0' src='images/delete.png' /></a>"+
						"</td>"+
					"</tr>"+
				"</table>";*/



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

	var inputInputFunction = document.createElement('select');
	inputInputFunction.setAttribute('id', 'inputFunction_'+(currentNumberMappings+1)+'_'+guid);
	inputInputFunction.setAttribute('name','inputFunction_'+(currentNumberMappings+1)+'_'+guid);
	inputInputFunction.setAttribute('onchange', 'javascript:showOptionsManyToOne(this,'+(currentNumberMappings+1)+');');

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

	var subStringLengthInput = document.createElement('input');
	subStringLengthInput.setAttribute('size','3');
	subStringLengthInput.setAttribute('type','text');
	subStringLengthInput.setAttribute('id','inputSubLength_'+(currentNumberMappings+1)+'_'+guid);
	subStringLengthInput.setAttribute('name','inputSubLength_'+(currentNumberMappings+1)+'_'+guid);

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

	listOfMappingsDiv.appendChild(mappingNumber);
	listOfMappingsDiv.appendChild(inputColNumDiv);
	listOfMappingsDiv.appendChild(inputColNumInput);
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


	/*var html =  "<br/><b>"+(currentNumberMappings+1)+"</b><br/>"+
				"Input column number: <input size='3' id='inputColumnNumber_"+(currentNumberMappings+1)+"_"+guid+"' name='inputColumnNumber_"+(currentNumberMappings+1)+"_"+guid+"' type='text'></input><br/>"+
				"<select id='inputFunction_"+(currentNumberMappings+1)+"_"+guid+"' name='inputFunction_"+(currentNumberMappings+1)+"_"+guid+"' onchange='javascript:showOptionsManyToOne(this, "+(currentNumberMappings+1)+");'>"+
					"<option value='--'>--Choose a function--</option>"+
					"<option value='char'>character</option>"+
					"<option value='substr'>sub string</option>"+
					"<option value='direct'>direct copy</option>"+
					"<option value='eval'>custom evaluation</option>"+
				"</select><br/>"+

				"<div id='ShowCharacterOption_"+(currentNumberMappings+1)+"_"+guid+"' style='display:none;'>"+
					"character <input size='3' type='text' id='inputCharNum_"+(currentNumberMappings+1)+"_"+guid+"' name='inputCharNum_"+(currentNumberMappings+1)+"_"+guid+"'></input><br/>"+
				"</div>"+
				"<div id='ShowSubStringOption_"+(currentNumberMappings+1)+"_"+guid+"' style='display:none;'>"+
					"substring<br/>"+
					"start <input size='3' type='text' id='inputSubStart_"+(currentNumberMappings+1)+"_"+guid+"' name='inputSubStart_"+(currentNumberMappings+1)+"_"+guid+"'></input><br/>"+
					"length <input size='3' type='text' id='inputSubLength_"+(currentNumberMappings+1)+"_"+guid+"' name='inputSubLength_"+(currentNumberMappings+1)+"_"+guid+"'></input>"+
				"</div>"+
				"<div id='ShowCustomEval_"+(currentNumberMappings+1)+"_"+guid+"' style='display:none;'>"+
					"Use the variable '#ColValue' in place of column value.<br/>"+
					"<textarea cols='35' rows='10' id='inputCustomEval_"+(currentNumberMappings+1)+"_"+guid+"' name='inputCustomEval_"+(currentNumberMappings+1)+"_"+guid+"'> </textarea>"+
				"</div>";*/
				
	mappingsList.appendChild(listOfMappingsDiv);
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}