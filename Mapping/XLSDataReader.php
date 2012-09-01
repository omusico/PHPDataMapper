<?php

	include "PHPExcelClasses/PHPExcel/Reader/Excel5.php";

	class XLSDataReader implements iReader{
		//Read from a CSV data file
		//A standard csv file
		//read using PHPExcel
		public $data;

		function __construct($fileName){
			$this->data = new DataClass();

			$objReader = new PHPExcel_Reader_Excel5();

			$objPHPExcel = $objReader->load($fileName);
		
			foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {

				$i = 0;
				foreach ($worksheet->getRowIterator() as $row)
				{
					$theRow = new Row();

					$cellIterator = $row->getCellIterator();
					$cellIterator->setIterateOnlyExistingCells(false); 
					$j=0;
					foreach ($cellIterator as $cell) {
						$theRow->values[$j] = $cell->getCalculatedValue();
						$j++;
					}	

					$this->data->rows[$i] = $theRow;
					$i++;
				}
			}

			print_r($this->data);
		}
	}

?>