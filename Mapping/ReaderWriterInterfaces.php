<?php

interface FileReader
{
	public function __construct($fileName);
}

interface FileWriter
{
	public function __construct($fileName, $dataClass);
	public function writeToFile();
}

?>