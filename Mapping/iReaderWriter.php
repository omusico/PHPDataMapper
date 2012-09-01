<?php

interface iReader{
	public function __construct($fileName);
}

interface iWriter{
	public function __construct($fileName, $dataClass);
	public function writeToFile();
}

?>