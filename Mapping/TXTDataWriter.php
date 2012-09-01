<?php

	class TXTDataWriter implements iWriter{
		
		public $handle;
		public $dataClass;

		//construct the data writer
		function __construct($fileName, $dataClass){

			$this->handle = fopen($fileName, "w");
			$this->dataClass = $dataClass;


		}

		//Write to a text data file
		function writeToFile(){

			$rowValue = "";

			//enumerate the dataClass and save data into text file with file name
			for($r=0; $r<count($this->dataClass->rows); $r++){
				$rowValue = "";
				for($s=0; $s<count($this->dataClass->rows[$r]->values); $s++)
				{
					$rowValue = $rowValue.$this->dataClass->rows[$r]->values[$s]."|";
				}
				//remove last pipe
				$rowValue = rtrim($rowValue, "|");

				//add new line
				$rowValue = $rowValue."\r\n";

				fwrite($this->handle, $rowValue);
			}

		}
	}

?>