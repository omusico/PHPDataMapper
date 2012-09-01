<?php

class TableRow{
	/*an associative array holding column information.
	The key is the name of the column
	e.g:
	Array => 	(
					"disc_number" => 1,
					"ISBN" => "1234123",
					"Name" => "Greatest Hits"
				)
	
	*/
	public $columns;
	//fatherDistinctColumn is only used on the CHILD table
	//for holding the father's distinct column row values
	public $fatherDistinctColumnValue;

	public function __construct(){
		$this->columns = array();
		$this->fatherDistinctColumnValue;
	}
}

?>