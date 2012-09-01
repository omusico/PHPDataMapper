<?php
	class TXTDataReader{
		//Read from a text document

		//A text file with column names at top
		//each column is seperated by '|'

		public $data;

		function __construct($fileName){
			$this->data = new DataClass();

			$lines = file($fileName);

			//obtain the number of columns
			$cols = split('\|', $lines[0]);

			$numberCols = count($cols);

			//put it into our generic DataClass
			for($i=0; $i<count($lines); $i++)
			{
				$thisRowsColumns = split("\|", $lines[$i]);

				$row = new Row();

				for($j=0; $j<$numberCols; $j++){
					$row->values[$j] = $thisRowsColumns[$j];
				}	

				$this->data->rows[$i] = $row;
			}
		}
	}

?>