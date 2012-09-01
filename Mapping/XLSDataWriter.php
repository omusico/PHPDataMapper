<?php
	include "PHPExcelClasses/PHPExcel/Writer/Excel5.php";


	class XLSDataWriter implements iWriter{
		//Write from a CSV data file
		public $handle;
		public $dataClass;
		public $fileName;

		//construct the data writer
		function __construct($fileName, $dataClass){

			$this->fileName = $fileName;
			$this->dataClass = $dataClass;
		}

		//Write to a text data file
		function writeToFile(){

			$rowValue = "";

			$objPHPExcel = new PHPExcel();
			
			$objWriter = new PHPExcel_Writer_Excel5($objPHPExcel);
			
			$alphabet = array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","Y","X","Z");

			//enumerate the dataClass and save data into text file with file name
			for($r=0; $r<count($this->dataClass->rows); $r++){
				
				for($s=0; $s<count($this->dataClass->rows[$r]->values); $s++)
				{
					$objPHPExcel->getActiveSheet()->SetCellValue($alphabet[$s].($r+1), $rowValue.$this->dataClass->rows[$r]->values[$s]);
				}
				
			}
			
			$objWriter->save($this->fileName);
		}
	}

?>