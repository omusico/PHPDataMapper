<?php
	try{
		include "../Mapping/MappingProcessor.php";

		$filename = $_POST["filename"];
		$filetype = $_POST["filetype"];

		//construct a temporary processor just to read the file.
		$processor = new MappingProcessor($filetype, null, $filename, null, null);

		//get the first row data
		$data = $processor->dataFileClass;

		$ajaxResult = "";
		foreach ($data->rows[0]->values as $key=>$value) {
			$ajaxResult.=$value."<->";
		}
		$ajaxResult = rtrim($ajaxResult, "<->");

		//print the result for the ajax message
		echo "SUCCESS<-->".$ajaxResult;
	}catch(Exception $e){
		echo "FAIL<-->There was an error loading that file.  Make sure the extension matches the filename and that the file specified exists.";
	}

?>