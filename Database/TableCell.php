<?php

class TableCell{
	//boolean value to flag whether or not to process this cell
	public $process;
	public $colName;
	public $colValue;

	public function __construct($process, $value, $colName){
		$this->process = $process;
		$this->colValue = $value;
		$this->colName = $colName;
	}
}

?>