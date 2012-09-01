function getOneToOneMappingHTML(){
	var guid = guidGenerator();

	document.getElementById("guidList").value += guid+",1:1;";

	var html =  "<table border='1'>"+
					"<tr>"+
						"<td valign='top'>"+
							"Input column number: <input id='inputColumnNumber_"+guid+"' name='inputColumnNumber_"+guid+"'  type='text'></input><br/>"+
							"<select id='inputFunction_"+guid+"' name='inputFunction_"+guid+"' onchange='javascript:showOptions(this);'>"+
								"<option value='--'>--Choose a function--</option>"+
								"<option value='char'>character</option>"+
								"<option value='substr'>sub string</option>"+
							"</select><br/>"+
							"character <input type='text' id='inputCharNum_"+guid+"' name='inputCharNum_"+guid+"'></input><br/>"+
							"substring<br/>"+
							"start <input type='text' id='inputSubStart_"+guid+"' name='inputSubStart_"+guid+"'></input><br/>"+
							"end <input type='text' id='inputSubEnd_"+guid+"' name='inputSubEnd_"+guid+"'></input>"+
						"</td>"+
						"<td>-------></td>"+
						"<td valign='top'>"+
							"Output column number: <input id='outputColumnNumber_"+guid+"' name='outputColumnNumber_"+guid+"' type='text'></input>"+
						"</td>"+
					"</tr>"+
				"</table>";

	document.getElementById("mappings").innerHTML += html;
}

function getManyToOneMappingHTML(){
	var guid = guidGenerator();

	document.getElementById("guidList").value += guid+",many:1;";

	var html =  "<table border='1'>"+
					"<tr>"+
						"<td valign='top'>"+
							"<div id='ListOfMappings_"+guid+"'>"+
							"<input type='hidden' id='numMappings_"+guid+"' value='1' ></input>"+
							"<b>1</b><br/>"+
							"Input column number: <input id='inputColumnNumber_1_"+guid+"' name='inputColumnNumber_1_"+guid+"' type='text'></input><br/>"+
							"<select id='inputFunction_1_"+guid+"' name='inputFunction_1_"+guid+"' onchange='javascript:showOptions(this);'>"+
								"<option value='--'>--Choose a function--</option>"+
								"<option value='char'>character</option>"+
								"<option value='substr'>sub string</option>"+
							"</select><br/>"+
							"character <input type='text' id='inputCharNum_"+guid+"' name='inputCharNum_"+guid+"'></input><br/>"+
							"substring<br/>"+
							"start <input type='text' id='inputSubStart_"+guid+"' name='inputSubStart_"+guid+"'></input><br/>"+
							"end <input type='text' id='inputSubEnd_"+guid+"' name='inputSubEnd_"+guid+"'></input>"+
							"</div>"+
							"<div id='AddAnotherLink_"+guid+"'>"+
							"</div>"+
						"</td>"+
						"<td>-------></td>"+
						"<td valign='top'>"+
							"Output column number: <input id='outputColumnNumber_"+guid+"' name='outputColumnNumber_"+guid+"' type='text'></input><br/>"+
							"Concatenation: <input id='outputColumnOrder_"+guid+"' name='outputColumnOrder_"+guid+"' type='text'></input>"+
						"</td>"+
					"</tr>"+
				"</table>";

	document.getElementById("mappings").innerHTML += html;

	var currentNumberMappings = document.getElementById("numMappings_"+guid).value;

	document.getElementById("AddAnotherLink_"+guid).innerHTML = "<a href='javascript:void(0);' onclick='javascript:AddMapping(\""+guid+"\","+ currentNumberMappings +");'>Add another</a>";
}

function AddMapping(guid, numMappings){
	var mappingsList = document.getElementById("ListOfMappings_"+guid);

	var currentNumberMappings = parseInt(document.getElementById("numMappings_"+guid).value);

	document.getElementById("numMappings_"+guid).value = currentNumberMappings+1;

	var html =  "<br/><b>"+(currentNumberMappings+1)+"</b><br/>"+
				"Input column number: <input id='inputColumnNumber_"+(currentNumberMappings+1)+"_"+guid+"' name='inputColumnNumber_"+(currentNumberMappings+1)+"_"+guid+"' type='text'></input><br/>"+
				"<select id='inputFunction_"+(currentNumberMappings+1)+"_"+guid+"' name='inputFunction_"+(currentNumberMappings+1)+"_"+guid+"' onchange='javascript:showOptions(this);'>"+
					"<option value='--'>--Choose a function--</option>"+
					"<option value='char'>character</option>"+
					"<option value='substr'>sub string</option>"+
				"</select><br/>"+
				"character <input type='text' id='inputCharNum_"+guid+"' name='inputCharNum_"+guid+"'></input><br/>"+
				"substring<br/>"+
				"start <input type='text' id='inputSubStart_"+guid+"' name='inputSubStart_"+guid+"'></input><br/>"+
				"end <input type='text' id='inputSubEnd_"+guid+"' name='inputSubEnd_"+guid+"'></input>";

	mappingsList.innerHTML += html;
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}