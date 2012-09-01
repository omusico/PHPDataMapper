<?php
include "iReaderWriter.php";
include "XMLDataWriter.php";
include "XMLDataReader.php";
include "TXTDataWriter.php";
include "TXTDataReader.php";
include "CSVDataReader.php";
include "CSVDataWriter.php";
include "XLSDataWriter.php";
include "XLSDataReader.php";
include "DataClass.php";
include "Mappings.php";
include "PHPExcelClasses/PHPExcel.php";


class MappingProcessor{

	public $dataFileClass;
	public $outputDataFileClass;
	public $fileType;
	public $outputFileType;
	public $dataFile;
	public $outputFileName;

	function __construct($inputFileType, $outputFileType, $inputFileName, $outputFileName, $outputData){
		$this->fileType = $inputFileType;
		$this->outputFileType = $outputFileType;
		$this->dataFile = $inputFileName;
		$this->outputFileName = $outputFileName;

		$this->dataFileClass = new DataClass();
		$this->outputDataFileClass = $outputData;

		$this->loadDataIntoDataClass();
	}

	public function loadDataIntoDataClass(){
		if($this->fileType == "xml"){
			$xmldr = new XMLDataReader($this->dataFile);   

			$this->dataFileClass = $xmldr->data;

		}else if($this->fileType == "csv"){
			$csvdr = new CSVDataReader($this->dataFile);

			$this->dataFileClass = $csvdr->data;

		}else if($this->fileType == "txt"){
			$txtdr = new TXTDataReader($this->dataFile);

			$this->dataFileClass = $txtdr->data;

		}else if($this->fileType == "xls"){
			$xlsdr = new XLSDataReader($this->dataFile);

			$this->dataFileClass = $xlsdr->data;

		}
	}

	public function processOneToOne($mapping){
		// $mapping is the OneToOne class
		// for each row in the input data file
		// 	read value from specified column using column number
		// 	do function on value with column number
		// 	store the result value in the global data class

		$rowCount = count($this->dataFileClass->rows);
		
		

		for($j=0; $j<$rowCount; $j++){

			$landingColumnNumber = $mapping->landingColumnNumber;
			$columnNumber = $mapping->ProcessColumn->columnNumber;
			
			$existingColumnValue = $this->dataFileClass->rows[$j]->values[$columnNumber];

			switch($mapping->ProcessColumn->fnction){
				case "substr":
					$newValue = substr( $existingColumnValue, 
										$mapping->ProcessColumn->subStringStart, 
										$mapping->ProcessColumn->subStringLength 
										);
										
					$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newValue;


					break;
				case "char":
					$newValue = substr( $existingColumnValue, 
										$mapping->ProcessColumn->characterNumber, 
										1
										);
					
					$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newValue;


					break;
				case "direct":
					$newValue = $existingColumnValue;
					
					$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newValue;


					break;
				case "eval":
					$ColValue = $existingColumnValue;

					$eval =  str_replace("#ColValue","\"".$ColValue."\"",$mapping->ProcessColumn->customEvaluation);
					$newValue = "";
					eval("\$newValue = $eval");
					
					if($mapping->outputToDataStructure){
						
					}else{
						$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newValue;
					}

					break;
			}
		}
	}

	public function processManyToOne($mapping){
		// for each row in the input data file
		// 	read value from specified column using column number
		// 	do function on value with column number
		// 	store the result value in the global data class

		$rowCount = count($this->dataFileClass->rows);

		for($j=0; $j<=$rowCount; $j++)
		{
			$landingColumnNumber = $mapping->landingColumnNumber;

			//for each of the ProcessColumns in the Mapping
			$numProcessColumns = count($mapping->ProcessColumns);

			$allValues = array();

			//Put each of the values into the ordered array
			for($k=0; $k<$numProcessColumns; $k++){
				$newValue = "";
				$columnNumber = $mapping->ProcessColumns[$k]->columnNumber;
				$existingColumnValue = $this->dataFileClass->rows[$j]->values[$columnNumber];

				switch($mapping->ProcessColumns[$k]->fnction){
					case "substr":
						$newValue = substr( $existingColumnValue, 
											$mapping->ProcessColumns[$k]->subStringStart, 
											$mapping->ProcessColumns[$k]->subStringLength 
											);
						break;
					case "char":
						$newValue = substr( $existingColumnValue, 
											$mapping->ProcessColumns[$k]->characterNumber, 
											1
											);
					case "direct":
						$newValue = $existingColumnValue;
						break;

					case "eval":
						$ColValue = $existingColumnValue;
					
						$eval =  str_replace("#ColValue","\"".$ColValue."\"",$mapping->ProcessColumns[$k]->customEvaluation);
						$newValue = "";
						eval("\$newValue = $eval");

						break;
				}
				
				$allValues[$k] = $newValue;
			}



			//an array of strings
			$concatChars = split('\+', $mapping->constructedString);

			$newFinalValue="";


			for($m=0; $m<count($concatChars); $m++){
				//if the first and last characters are " then this is part of the string.
				if(
					(substr($concatChars[$m], 0, 0) == "\"")|| 
					(substr($concatChars[$m], (strlen($concatChars[$m]) - 1), (strlen($concatChars[$m]) - 1)) == "\""))
				{
					$newFinalValue .= ltrim(rtrim($concatChars[$m], '\"'), '\"');
				}else{
					//if not then it is one of the values obtained from the original column	
					$newFinalValue .= $allValues[$concatChars[$m] - 1];
				}				
			}

			//place the new final value into the specified area
			$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newFinalValue;

		}
	}

	public function processOneToMany($mapping){
		// for each row in the input data file
		// 	read value from specified column using column number
		// 	do function on value with column number
		// 	store the result value in the global data class
	}

	public function writeDataToFile(){
		if($this->outputFileType == "xml"){
			$xmldw = new XMLDataWriter($this->outputFileName, $this->outputDataFileClass);   
			$xmldw->writeToFile();
			
		}else if($this->outputFileType == "csv"){
			$csvdw = new CSVDataWriter($this->outputFileName, $this->outputDataFileClass);
			$csvdw->writeToFile();

		}else if($this->outputFileType == "txt"){
			$txtdw = new TXTDataWriter($this->outputFileName, $this->outputDataFileClass);
			$txtdw->writeToFile();
		}else if($this->outputFileType == "xls"){
			$xlsdw = new XLSDataWriter($this->outputFileName, $this->outputDataFileClass);
			$xlsdw->writeToFile();
		}
	}
}
?>