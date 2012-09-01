<?php

class Table{
	/*A normal array holding
	Row objects
	e.g:
	$rows[0] => Array 	(
							"disc_number" => 1,
							"ISBN" => "1234123",
							"Name" => "Greatest Hits"
						)
	$rows[1] => Array 	(
							"disc_number" => 2,
							"ISBN" => "1234126",
							"Name" => "Greatest Hits"
						)
	*/
	public $rows;

	public $colNames;

	//the table name
	public $name;

	public function __construct(){
		$this->rows = array();
		$this->colNames = array();
	}

}

?>