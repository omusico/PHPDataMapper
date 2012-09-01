<html>
<head>
<style type='text/css'>
    body{
        font-family:arial;
    }
</style>
<script type='text/javascript' src='dynamicForm.js'>
</script>
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
    <tr>
    </tr>
</table>
<div id='mappings'>
</div>
<br/>
<a href='javascript:void(0);' onclick='javascript:getOneToOneMappingHTML();'><img border='0' src='images/add11.png' /></a>&nbsp;
<a href='javascript:void(0);' onclick='javascript:getManyToOneMappingHTML();'><img border='0' src='images/addmany1.png' /></a><br/>

<input type='hidden' id='guidList' name='guidList'></input>
<input type='submit' value='Process'></input>
</form>
</body>
</html>