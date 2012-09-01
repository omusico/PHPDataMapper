<?php
	//include "PHPExcelClasses/PHPExcel.php";
	include "PHPExcelClasses/PHPExcel/Writer/CSV.php";


	class CSVDataWriter{
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
			
			$objWriter = new PHPExcel_Writer_CSV($objPHPExcel);
			$objWriter->setDelimiter(';');
			$objWriter->setEnclosure("");
			$objWriter->setLineEnding("\r\n");
			$objWriter->setSheetIndex(0);
			
			$alphabet = array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","Y","X","Z");

			//enumerate the dataClass and save data into text file with file name
			for($r=0; $r<count($this->dataClass->rows); $r++){
				
				for($s=0; $s<count($this->dataClass->rows[$r]->values); $s++)
				{
					echo $alphabet[$s].($r+1)."<br/>";
					$objPHPExcel->getActiveSheet()->SetCellValue($alphabet[$s].($r+1), $rowValue.$this->dataClass->rows[$r]->values[$s]);
				}
				
			}
			
			$objWriter->save($this->fileName);
		}
	}

?>