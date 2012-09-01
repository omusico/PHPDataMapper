<?php

$arrayOfValues = $_POST['values'];
$concat = $_POST['concat'];

$allValues = split(",", $arrayOfValues);

//an array of strings
$concatChars = split('\+', $concat);

$newFinalValue="";

for($m=0; $m<count($concatChars); $m++){
	//if the first and last characters are " then this is part of the string.
	if(
		(substr($concatChars[$m], 0, 0) == "\"")|| 
		(substr($concatChars[$m], (strlen($concatChars[$m]) - 1), (strlen($concatChars[$m]) - 1)) == "\""))
	{
		$newFinalValue .= ltrim(rtrim($concatChars[$m], '\"'), '\"');
	}else{
		//if not then it is one of the values obtained from the original column	
		$newFinalValue .= $allValues[$concatChars[$m] - 1];
	}				
}

echo $newFinalValue;

?>