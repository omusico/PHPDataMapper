<?php

class MappingProcessorDataBase{
	public $dataFileClass;
	public $fileType;
	public $dataFile;
	public $serverAddress;
	public $userName;
	public $password;
	public $databaseName;
	public $table;
	public $distinctColumnNumber;
	public $allColumnNumbers;

	function __construct($inputFileType, $inputFileName, $serverAddress, $userName, $password, $databaseName, $tableName, $distinctColumnNumber, $tableType, $distinctFatherColumnNumber){
		$this->fileType = $inputFileType;
		$this->outputFileType = $outputFileType;
		$this->dataFile = $inputFileName;
		$this->outputFileName = $outputFileName;
		$this->serverAddress = $serverAddress;
		$this->userName = $userName;
		$this->password = $password;
		$this->databaseName = $databaseName;
		$this->dataFileClass = new DataClass();

		$this->loadDataIntoDataClass();

		$this->table = new Table();
		$this->table->name = $tableName;
		$this->determineColumnNumbersFromInput();
		$this->distinctColumnNumber = $distinctColumnNumber;

		//GF, F, or C
		//Grandfather, Father or Child TABLE
		$this->tableType = $tableType;
		$this->fatherDistinctColNum = $distinctFatherColumnNumber;
	}

	public function determineColumnNumbersFromInput(){
		$firstRow = $this->dataFileClass->rows[0]->values;
		foreach($firstRow as $key => $value){
			$this->allColumnNumbers[] = $key;
		}
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

	//use this function for tables that use a distinct column to
	//re-write the dataclass (that is generated from the input file)
	//Use this function after using 'loadDataIntoDataClass'
	public function rewriteDataClassUsingDistinctColumn(){
		$rowCount = count($this->dataFileClass->rows);

		$distinctColumnValuesTemp = array();
		$distinctColumnValues = array();

		//write into this datafileclass. when done, overwrite the existing datafileclass
		$newDataFileClass =  new DataClass();

		$counter = 0;
		for($j=0; $j<$rowCount; $j++){
			$currVal = $this->dataFileClass->rows[$j]->values[$this->distinctColumnNumber];
			if(!in_array($currVal, $distinctColumnValues)){
				foreach ($this->allColumnNumbers as $value) {
					$newDataFileClass->rows[$counter]->values[$value] = $this->dataFileClass->rows[$j]->values[$value];
				}
				$counter++;
				$distinctColumnValues[] = $currVal;
			}
		}

		$this->dataFileClass = $newDataFileClass;
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

			//Load distinct value into fatherDistinctColumnValue if this mapping is for the CHILD table
			if($this->tableType == "C"){
				$this->table->rows[$j]->fatherDistinctColumnValue = $this->dataFileClass->rows[$j]->values[$this->fatherDistinctColNum];
			}

			switch($mapping->ProcessColumn->fnction){
				case "substr":
					$newValue = substr( $existingColumnValue, 
										$mapping->ProcessColumn->subStringStart, 
										$mapping->ProcessColumn->subStringLength 
										);
										
					//$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newValue;
					$this->table->rows[$j]->columns[$mapping->columnName] = $newValue;

					break;
				case "char":
					$newValue = substr( $existingColumnValue, 
										$mapping->ProcessColumn->characterNumber, 
										1
										);
					
					//$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newValue;
					$this->table->rows[$j]->columns[$mapping->columnName] = $newValue;

					break;
				case "direct":
					$newValue = $existingColumnValue;
					
					//$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newValue;
					$this->table->rows[$j]->columns[$mapping->columnName] = $newValue;

					break;
				case "eval":
					$ColValue = $existingColumnValue;

					$eval =  str_replace("#ColValue","\"".$ColValue."\"",$mapping->ProcessColumn->customEvaluation);
					$newValue = "";
					eval("\$newValue = $eval");
					
					if($mapping->outputToDataStructure){
						
					}else{
						//$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newValue;
						$this->table->rows[$j]->columns[$mapping->columnName] = $newValue;
					}

					break;
			}
		}
	}

	public function printTableStructure(){
		print_r($this->table);
	}

	public function processManyToOne($mapping){
		// for each row in the input data file
		// 	read value from specified column using column number
		// 	do function on value with column number
		// 	store the result value in the global data class

		$rowCount = count($this->dataFileClass->rows);

		for($j=0; $j<$rowCount; $j++)
		{
			$landingColumnNumber = $mapping->landingColumnNumber;

			//for each of the ProcessColumns in the Mapping
			$numProcessColumns = count($mapping->ProcessColumns);

			$allValues = array();

			//Load distinct value into fatherDistinctColumnValue if this mapping is for the CHILD table
			if($this->tableType == "C"){
				$this->table->rows[$j]->fatherDistinctColumnValue = $this->dataFileClass->rows[$j]->values[$this->fatherDistinctColNum];
			}

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
			//$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newFinalValue;
			$this->table->rows[$j]->columns[$mapping->columnName] = $newFinalValue;

		}
	}

	public function processMulti($mapping){

	}

	/*once finished mapping the table, use this function to finally insert it into the database
	$table has a member 'rows' with the following structure:

	$table->rows =	Array 	(
							0 => Array 	(
											"disc_number" => 1,
											"ISBN" => "1234123",
											"Name" => "Greatest Hits"
										)
							1 => Array 	(
											"disc_number" => 2,
											"ISBN" => "1234126",
											"Name" => "Greatest Hits"
										) 
							)


	It uses the MySQL insert statement
	INSERT INTO table_name (column1, column2, column3,...)
	VALUES (value1, value2, value3,...))
	*/
	public function insertTableObjectIntoDatabaseGrandFather(){
		$table = $this->table;
		
		$conn = new Connection($this->serverAddress, $this->userName, $this->password);
		$conn->connect();
		$conn->selectDatabase($this->databaseName);

		$theConnection = $conn->connection;

		foreach($this->table->rows[0]->columns as $key => $value){
			$table->colNames[] = $key;
		}

		for($i=0; $i<count($table->rows); $i++){

			$statement = "INSERT INTO `".$table->name."` (";
			for($j=0; $j<count($table->colNames); $j++){
				$statement .= $table->colNames[$j].", ";
			}
			$statement = rtrim($statement, ", ");
			$statement .= " ) VALUES (";

			//Current row object
			$currRow = $table->rows[$i];
			
			for($j=0; $j<count($table->colNames); $j++){
				$statement .= "'".$currRow->columns[$table->colNames[$j]]."', ";
			}
			$statement = rtrim($statement, ", ");
			$statement .= ");";

			//execute the statement
			mysql_query($statement, $theConnection);
		}

		$conn->disconnect();
	}

	public function escapeStringTableDataStructure($ds){
		foreach($ds->rows as $row){
			foreach($row->columns as $key => $value){
				$value = mysql_escape_string($value);
				$row->columns[$key] = $value;
			}
		}

		return $ds;
	}

	public function insertTableObjectIntoDatabaseFather($grandFatherDistinctColNum, $grandfatherDistinctColName, $distinctColName, $grandFatherPKColNameTableName, $fatherFKColNameTableName, $grandFatherTableName){
		$table = $this->table;
		
		$conn = new Connection($this->serverAddress, $this->userName, $this->password);
		$conn->connect();
		$conn->selectDatabase($this->databaseName);

		$theConnection = $conn->connection;

		foreach($this->table->rows[0]->columns as $key => $value){
			$table->colNames[] = $key;
		}

		//add the foreign key column to the TABLE data structure
		$split = explode("->", $fatherFKColNameTableName);
		$gfFKName = $split[1];
		$table->colNames[] = $gfFKName;

		//Get the PK name from the GF
		$split = explode("->", $grandFatherPKColNameTableName);
		$gfPKName = $split[1];

		//get the ds ready for mysql
		$this->escapeStringTableDataStructure($table);

		for($i=0; $i<count($table->rows); $i++){

			//check value of distinct column in TABLE
			$distinctVal = $table->rows[$i]->columns[$distinctColName];
			//Get the value of the grandfather distinct column from the dataclass
			$gfDistinct = "";
			foreach($this->dataFileClass->rows as $currRow){
				if($currRow->values[$this->distinctColumnNumber] == $distinctVal){
					$gfDistinct = $currRow->values[$grandFatherDistinctColNum];
				}
			}
			
			//Query the database using the gfDistinct value to get the Primary Key of the GF table
			$query = "SELECT `".$gfPKName."` FROM  `".$grandFatherTableName."` WHERE  `".$grandfatherDistinctColName."` ='".$gfDistinct."'";
			$result = mysql_query($query, $theConnection);
			$row = mysql_fetch_row($result);
			$pkGF = $row[0];

			//insert the GF PK into the TABLE data structure
			$table->rows[$i]->columns[$gfFKName] = $pkGF;


			$statement = "INSERT INTO `".$table->name."` (";
			for($j=0; $j<count($table->colNames); $j++){
				$statement .= $table->colNames[$j].", ";
			}
			$statement = rtrim($statement, ", ");
			$statement .= " ) VALUES (";

			//Current row object
			$currRow = $table->rows[$i];
			
			for($j=0; $j<count($table->colNames); $j++){
				$statement .= "'".$currRow->columns[$table->colNames[$j]]."', ";
			}
			$statement = rtrim($statement, ", ");
			$statement .= ");";
			//execute the statement
			mysql_query($statement, $theConnection);
		}

		$conn->disconnect();
	}

	//in this case, each row is distinct
	public function insertTableObjectIntoDatabaseChild($fatherDistinctColNum, $fatherDistinctColName, $fatherPKColNameTableName, $childFKColNameTableName, $fatherTableName){
		$table = $this->table;
		
		$conn = new Connection($this->serverAddress, $this->userName, $this->password);
		$conn->connect();
		$conn->selectDatabase($this->databaseName);

		$theConnection = $conn->connection;

		foreach($this->table->rows[0]->columns as $key => $value){
			$table->colNames[] = $key;
		}

		//add the foreign key column to the TABLE data structure
		$split = explode("->", $childFKColNameTableName);
		$fFKName = $split[1];
		$table->colNames[] = $fFKName;

		//Get the father PK name
		$split = explode("->", $fatherPKColNameTableName);
		$fPKName = $split[1];

		//get the ds ready for mysql
		$this->escapeStringTableDataStructure($table);

		for($i=0; $i<count($table->rows); $i++){

			//check value of distinct column in TABLE
			$distinctFatherVal = $table->rows[$i]->fatherDistinctColumnValue;
			$fDistinct = "";
			foreach($this->dataFileClass->rows as $currRow){
				if($currRow->values[$fatherDistinctColNum] == $distinctFatherVal){
					$fDistinct = $currRow->values[$fatherDistinctColNum];
				}
			}
			
			//Query the database using the gfDistinct value to get the Primary Key of the F table
			$query = "SELECT `".$fPKName."` FROM  `".$fatherTableName."` WHERE  `".$fatherDistinctColName."` ='".$fDistinct."'";
			$result = mysql_query($query, $theConnection);
			$row = mysql_fetch_row($result);
			$pkF = $row[0];

			//insert the F PK into the TABLE data structure
			$table->rows[$i]->columns[$fFKName] = $pkF;


			$statement = "INSERT INTO `".$table->name."` (";
			for($j=0; $j<count($table->colNames); $j++){
				$statement .= $table->colNames[$j].", ";
			}
			$statement = rtrim($statement, ", ");
			$statement .= " ) VALUES (";

			//Current row object
			$currRow = $table->rows[$i];
			
			for($j=0; $j<count($table->colNames); $j++){
				$statement .= "'".$currRow->columns[$table->colNames[$j]]."', ";
			}
			$statement = rtrim($statement, ", ");
			$statement .= ");";
			//execute the statement
			mysql_query($statement, $theConnection);
		}

		$conn->disconnect();
	}
}
?>