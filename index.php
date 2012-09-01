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
            </select>
        </td>
    </tr>
    <tr>
        <td>Output directory / file name:</td><td><input id='OutputFileNameDir' name='OutputFileNameDir' type='text' value=''></input></td>
        <td>
            extension type
            <select id='OutputFileExt' name='OutputFileExt'>
                <option value='txt'>*.txt</option>
                <option value='csv'>*.csv</option>
                <option value='xml'>*.xml</option>
            </select>
        </td>
    </tr>
</table>
<div id='mappings'>
</div>
<br/>
<a href='javascript:void(0);' onclick='javascript:getOneToOneMappingHTML();'>Add a 1:1 mapping</a><br/>
<a href='javascript:void(0);' onclick='javascript:getManyToOneMappingHTML();'>Add a many:1 mapping</a><br/>

<input type='text' id='guidList' name='guidList'></input>
<input type='submit' value='Process'></input>
</form>
</body>
</html>