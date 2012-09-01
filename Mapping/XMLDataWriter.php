<?php

	class XMLDataWriter implements iWriter{
		//Write to different types of data sources
		public $handle;
		public $dataClass;

		//construct the data writer
		function __construct($fileName, $dataClass){

			$this->handle = fopen($fileName, "w");
			$this->dataClass = $dataClass;
		}

		//Write to a xml data file

		//<rows>
		//	<row>
		//		<col0></col0>
		//		<col1></col1>
		//		<col2></col2>
		//		...
		//		...
		//		...
		//	</row>
		//	<row>
		//		<col0></col0>
		//		<col1></col1>
		//		<col2></col2>
		//		...
		//		...
		//		...
		//	</row>
		//</row>
		function writeToFile(){
			$xmlDoc = "<?xml version='1.0' encoding='iso-8859-1'?>\r\n";

			//enumerate the dataClass and save data into text file with file name
			$xmlDoc = $xmlDoc."<rows>\r\n";
			for($r=0; $r<count($this->dataClass->rows); $r++){
				

				$xmlDoc = $xmlDoc."\t<row>\r\n";

				for($s=0; $s<count($this->dataClass->rows[$r]->values); $s++)
				{
					$rowValue = $this->dataClass->rows[$r]->values[$s];

					$xmlDoc = $xmlDoc."\t\t<col".$s.">".$rowValue."</col".$s.">\r\n";
				}

				$xmlDoc = $xmlDoc."\t</row>\r\n";
			}
			$xmlDoc = $xmlDoc."</rows>\r\n";



			fwrite($this->handle, $xmlDoc);
		}
	}

?>