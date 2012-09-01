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
	var inputSubEnd = document.getElementById('inputSubEnd_'+guid);

	var table = document.getElementById('OneToOneTable_'+guid);
	
	inputColNum.disabled = true;
	inputFn.disabled = true;
	outputColNum.disabled = true;
	inputCharNum.disabled = true;
	inputSubStart.disabled = true;
	inputSubEnd.disabled = true;

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
		var inputSubEnd = document.getElementById('inputSubEnd_'+i+'_'+guid);

		inputColNum.disabled = true;
		inputFn.disabled = true;
		inputCharNum.disabled = true;
		inputSubStart.disabled = true;
		inputSubEnd.disabled = true;
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

function getOneToOneMappingHTML(){
	var guid = guidGenerator();

	document.getElementById("guidList").value += guid+",1:1;";

	var html =  "<table id='OneToOneTable_"+guid+"' border='1'>"+
					"<tr>"+
						"<td valign='top'>"+
							"Input column number: <input id='inputColumnNumber_"+guid+"' name='inputColumnNumber_"+guid+"'  type='text'></input><br/>"+
							"<select id='inputFunction_"+guid+"' name='inputFunction_"+guid+"' onchange='javascript:showOptions(this);'>"+
								"<option value='--'>--Choose a function--</option>"+
								"<option value='char'>character</option>"+
								"<option value='substr'>sub string</option>"+
								"<option value='direct'>direct copy</option>"+
								"<option value='eval'>custom evaluation</option>"+
							"</select><br/>"+
							"<div id='ShowCharacterOption_"+guid+"' style='display:none;'>"+
							"character <input type='text' id='inputCharNum_"+guid+"' name='inputCharNum_"+guid+"'></input><br/>"+
							"</div>"+
							"<div id='ShowSubStringOption_"+guid+"' style='display:none;'>"+
							"substring<br/>"+
							"start <input type='text' id='inputSubStart_"+guid+"' name='inputSubStart_"+guid+"'></input><br/>"+
							"end <input type='text' id='inputSubEnd_"+guid+"' name='inputSubEnd_"+guid+"'></input>"+
							"</div>"+
							"<div id='ShowCustomEval_"+guid+"' style='display:none;'>"+
							"Use the variable '#ColValue' in place of column value.<br/>"+
							"<textarea cols='35' rows='10' id='inputCustomEval_"+guid+"' name='inputCustomEval_"+guid+"'> </textarea>"+
							"</div>"+
						"</td>"+
						"<td>-------></td>"+
						"<td valign='top'>"+
							"Output column number: <input id='outputColumnNumber_"+guid+"' name='outputColumnNumber_"+guid+"' type='text'></input>"+
						"</td>"+
						"<td valign='top'>"+
							"<a href='javascript:void(0);'  onclick=\"javascript:deleteOneToOne('"+guid+"')\"><img border='0' src='images/delete.png' /></a>"+
						"</td>"+
					"</tr>"+
				"</table>";

	document.getElementById("mappings").innerHTML += html;
}

function getManyToOneMappingHTML(){
	var guid = guidGenerator();

	document.getElementById("guidList").value += guid+",many:1;";

	var html =  "<table id='ManyToOneTable_"+guid+"' border='1'>"+
					"<tr>"+
						"<td valign='top'>"+
							"<div id='ListOfMappings_"+guid+"'>"+
							"<input type='hidden' id='numMappings_"+guid+"' name='numMappings_"+guid+"' value='1' ></input>"+
							"<b>1</b><br/>"+
							"Input column number: <input id='inputColumnNumber_1_"+guid+"' name='inputColumnNumber_1_"+guid+"' type='text'></input><br/>"+
							"<select id='inputFunction_1_"+guid+"' name='inputFunction_1_"+guid+"' onchange='javascript:showOptionsManyToOne(this,1);'>"+
								"<option value='--'>--Choose a function--</option>"+
								"<option value='char'>character</option>"+
								"<option value='substr'>sub string</option>"+
								"<option value='direct'>direct copy</option>"+
								"<option value='eval'>custom evaluation</option>"+
							"</select><br/>"+

							"<div id='ShowCharacterOption_1_"+guid+"' style='display:none;'>"+
								"character <input type='text' id='inputCharNum_1_"+guid+"' name='inputCharNum_1_"+guid+"'></input><br/>"+
							"</div>"+
							"<div id='ShowSubStringOption_1_"+guid+"' style='display:none;'>"+
								"substring<br/>"+
								"start <input type='text' id='inputSubStart_1_"+guid+"' name='inputSubStart_1_"+guid+"'></input><br/>"+
								"end <input type='text' id='inputSubEnd_1_"+guid+"' name='inputSubEnd_1_"+guid+"'></input>"+
							"</div>"+
							
							"<div id='ShowCustomEval_1_"+guid+"' style='display:none;'>"+
								"Use the variable '#ColValue' in place of column value.<br/>"+
								"<textarea cols='35' rows='10' id='inputCustomEval_1_"+guid+"' name='inputCustomEval_1_"+guid+"'> </textarea>"+
							"</div>"+

							"</div>"+
							"<div id='AddAnotherLink_"+guid+"'>"+
							"</div>"+
						"</td>"+
						"<td>-------></td>"+
						"<td valign='top'>"+
							"Output column number: <input id='outputColumnNumber_"+guid+"' name='outputColumnNumber_"+guid+"' type='text'></input><br/>"+
							"Concatenation: <input id='outputColumnOrder_"+guid+"' name='outputColumnOrder_"+guid+"' type='text'></input>"+
						"</td>"+

						"<td valign='top'>"+
							"<a href='javascript:void(0);' onclick=\"javascript:deleteManyToOne('"+guid+"')\"><img border='0' src='images/delete.png' /></a>"+
						"</td>"+
					"</tr>"+
				"</table>";

	document.getElementById("mappings").innerHTML += html;

	var currentNumberMappings = document.getElementById("numMappings_"+guid).value;

	document.getElementById("AddAnotherLink_"+guid).innerHTML = "<a href='javascript:void(0);' onclick='javascript:AddMapping(\""+guid+"\","+ currentNumberMappings +");'><img border='0' src='images/addanother.png' /></a>";
}

function AddMapping(guid, numMappings){
	var mappingsList = document.getElementById("ListOfMappings_"+guid);

	var currentNumberMappings = parseInt(document.getElementById("numMappings_"+guid).value);

	document.getElementById("numMappings_"+guid).value = currentNumberMappings+1;

	var html =  "<br/><b>"+(currentNumberMappings+1)+"</b><br/>"+
				"Input column number: <input id='inputColumnNumber_"+(currentNumberMappings+1)+"_"+guid+"' name='inputColumnNumber_"+(currentNumberMappings+1)+"_"+guid+"' type='text'></input><br/>"+
				"<select id='inputFunction_"+(currentNumberMappings+1)+"_"+guid+"' name='inputFunction_"+(currentNumberMappings+1)+"_"+guid+"' onchange='javascript:showOptionsManyToOne(this, "+(currentNumberMappings+1)+");'>"+
					"<option value='--'>--Choose a function--</option>"+
					"<option value='char'>character</option>"+
					"<option value='substr'>sub string</option>"+
					"<option value='direct'>direct copy</option>"+
					"<option value='eval'>custom evaluation</option>"+
				"</select><br/>"+

				"<div id='ShowCharacterOption_"+(currentNumberMappings+1)+"_"+guid+"' style='display:none;'>"+
					"character <input type='text' id='inputCharNum_"+(currentNumberMappings+1)+"_"+guid+"' name='inputCharNum_"+(currentNumberMappings+1)+"_"+guid+"'></input><br/>"+
				"</div>"+
				"<div id='ShowSubStringOption_"+(currentNumberMappings+1)+"_"+guid+"' style='display:none;'>"+
					"substring<br/>"+
					"start <input type='text' id='inputSubStart_"+(currentNumberMappings+1)+"_"+guid+"' name='inputSubStart_"+(currentNumberMappings+1)+"_"+guid+"'></input><br/>"+
					"end <input type='text' id='inputSubEnd_"+(currentNumberMappings+1)+"_"+guid+"' name='inputSubEnd_"+(currentNumberMappings+1)+"_"+guid+"'></input>"+
				"</div>"+
				"<div id='ShowCustomEval_"+(currentNumberMappings+1)+"_"+guid+"' style='display:none;'>"+
					"Use the variable '#ColValue' in place of column value.<br/>"+
					"<textarea cols='35' rows='10' id='inputCustomEval_"+(currentNumberMappings+1)+"_"+guid+"' name='inputCustomEval_"+(currentNumberMappings+1)+"_"+guid+"'> </textarea>"+
				"</div>";
				
	mappingsList.innerHTML += html;
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}