<html>
<head>
<style type='text/css'>
    body{
        font-family:arial;
    }
</style>
<script type='text/javascript' src='dynamicForm.js'></script>
<script type='text/javascript' src='ajaxLibrary.js'></script>
<script type='text/javascript' src='jquery1_7_2.js'></script>
</head>
<body>

<form action='parseForm.php' method='POST'>
<table>
    <tr>
        <td>Input directory / file name:</td><td><input id='InputFileNameDir' name='InputFileNameDir' type='text' value=''></input></td>
        <td>
            extension type
            <select id='InputFileExt' name='InputFileExt'>
                <option value='txt'>*.txt</option>
                <option value='csv'>*.csv</option>
                <option value='xml'>*.xml</option>
                <option value='xls'>*.xls</option>
            </select>
        </td>
    </tr>
    <tr>
        <td colspan='2'>
            <select onchange='javascript:SelectOutput(this);' id='MappingType' name='MappingType'>
                <option value='ToOutputDataFile'>Map to destination file</option>
                <option value='ToDataStructure'>Map to data structure</option>
				<option value='ToDataBase'>Map to data base</option>
            </select>
        </td>
    </tr>
    <tr id='outputdatafileform' name='outputdatafileform'>
        <td>Output directory / file name:</td><td><input id='OutputFileNameDir' name='OutputFileNameDir' type='text' value=''></input></td>
        <td>
            extension type
            <select id='OutputFileExt' name='OutputFileExt'>
                <option value='txt'>*.txt</option>
                <option value='csv'>*.csv</option>
                <option value='xml'>*.xml</option>
                <option value='xls'>*.xls</option>
            </select>
        </td>
    </tr>
	<tr id='outputdatabaseform' name='outputdatabaseform' style='display:none;'>
        <td colspan='2'>
			Server address: <input type='text' name='DataBaseServerAddress' id='DataBaseServerAddress' value=''></input><br/>
			Username: <input type='text' name='DataBaseUserName' id='DataBaseUserName' value=''></input><br/>
			Password: <input type='password' name='DataBasePassword' id='DataBasePassword' value=''></input><br/>
			<a href='javascript:void(0);' onclick='ShowLoadingListOfDataBases();RetrieveListOfDataBases();' >Retrieve list of databases</a>
			<div id='ListOfDataBasesLoader' name='ListOfDataBasesLoader' style='display:none;'>
				<img src='images/loader.gif' >
			</div>
			<br/>
			<div id='ListOfDatabaseNamesContainer' name='ListOfDatabaseNamesContainer' style='display:none;'>	
				Select Database: 	<select id='ListOfDatabaseNames' name='ListOfDatabaseNames' >
									</select><br/>
				<a href='javascript:void(0);' onclick='ShowLoadingDataBaseInfo();RetrieveDataBaseInformation();'>Retrieve database information for mappings</a>
				<div id='DataBaseInfoLoader' name='DataBaseInfoLoader' style='display:none;'>
					<img src='images/loader.gif' >
				</div>
				<input type='hidden' value='' id='TableInformation' name='TableInformation' />
				<div id='DBTableInfoContainer' name='DBTableInfoContainer' style='display:none;'></div>
 			</div>
		</td>
    </tr>
    <tr>
    </tr>
</table>
<div id='mappings'>
</div>
<br/>
<a href='javascript:void(0);' onclick='javascript:getOneToOneMappingHTML();'><img border='0' src='images/add11.png' /></a>&nbsp;
<a href='javascript:void(0);' onclick='javascript:getManyToOneMappingHTML();'><img border='0' src='images/addmany1.png' /></a>&nbsp;
<a href='javascript:void(0);' onclick='javascript:getPrimaryForeignRelationshipHTML();'><img border='0' src='images/primaryforeignkey.png' /></a>&nbsp;
<a href='javascript:void(0);' onclick='javascript:getMultiValuedHTML();'><img border='0' src='images/multi.png' /></a><br/>

<input type='hidden' id='guidList' name='guidList'></input>
<input type='submit' value='Process'></input>
</form>
</body>
</html>