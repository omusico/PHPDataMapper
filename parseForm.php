<html>
<head>
<style type='text/css'>
    body{
        font-family:arial;
    }
</style>
</head>
<body>
<?php
try{
    include "Mapping/MappingProcessor.php";
    include "Mapping/MappingProcessorDataStructure.php";
    include "Mapping/MappingProcessorDataBase.php";
    include "Database/Table.php";
    include "Database/TableRow.php";
    include "Database/TableCell.php";
    include "Database/Connection.php";

    $guids = $_POST['guidList'];
    
    //remove the trailing empty guid
    $guids = rtrim($guids, ';');

    $guidsArray = split(';', $guids);

    $outputData = new DataClass();
	$outputType = $_POST["MappingType"];
    $outputDataStructure = array();

    //when mapping to a database
    $serverAddress = $_POST["DataBaseServerAddress"];
    $username = $_POST["DataBaseUserName"];
    $password = $_POST["DataBasePassword"];
    $databaseName = $_POST["ListOfDatabaseNames"];


	if($outputType == "ToOutputDataFile"){
		$processor = new MappingProcessor($_POST['InputFileExt'], $_POST['OutputFileExt'], $_POST['InputFileNameDir'], $_POST['OutputFileNameDir'], $outputData);
	}else if($outputType == "ToDataStructure"){
		$dataStructureProcessor = new MappingProcessorDataStructure($_POST['InputFileExt'], $_POST['InputFileNameDir'], $outputDataStructure);
	}
    


	if($outputType == "ToOutputDataFile"){
		for($k=0; $k<count($guidsArray); $k++){
			$values = split(",",$guidsArray[$k]); 
			switch($values[1]){
			case "1:1":
				$ProcessColumn = new ProcessColumn($_POST["inputColumnNumber_".$values[0]], 
																$_POST["inputFunction_".$values[0]],
																$_POST["inputCharNum_".$values[0]],
																$_POST["inputSubStart_".$values[0]],
																$_POST["inputSubLength_".$values[0]],
																$_POST["inputCustomEval_".$values[0]]);

							
								 
				$landingcolumnNumber = $_POST["outputColumnNumber_".$values[0]];


				$mapping = new OneToOne();

				$mapping->ProcessColumn = $ProcessColumn;
				$mapping->tableName = "table";
				$mapping->landingColumnNumber = $landingcolumnNumber;

				$processor->processOneToOne($mapping);

				break;
			case "many:1":
				$mapping = new ManyToOne();

				$mappingCount = $_POST["numMappings_".$values[0]];

				for($r=0; $r<$mappingCount; $r++){
					$pc = new ProcessColumn(
																$_POST["inputColumnNumber_".($r+1)."_".$values[0]], 
																$_POST["inputFunction_".($r+1)."_".$values[0]],
																$_POST["inputCharNum_".($r+1)."_".$values[0]],
																$_POST["inputSubStart_".($r+1)."_".$values[0]],
																$_POST["inputSubLength_".($r+1)."_".$values[0]],
																$_POST["inputCustomEval_".($r+1)."_".$values[0]]
															); 
					$mapping->ProcessColumns[$r] = $pc;
				}

				$mapping->landingColumnNumber = $_POST["outputColumnNumber_".$values[0]];
				$mapping->constructedString = $_POST["outputColumnOrder_".$values[0]];

				$processor->ProcessManyToOne($mapping);

				break;
		}   
		}
	}
	
	else if($outputType == "ToDataStructure"){
		for($k=0; $k<count($guidsArray); $k++){
			$values = split(",",$guidsArray[$k]);
			switch($values[1]){
			case "1:1":
				$mapping = new OneToOne();
				$mapping->outputToDataStructure = true;
				
				$ProcessColumn = new ProcessColumn($_POST["inputColumnNumber_".$values[0]], 
																$_POST["inputFunction_".$values[0]],
																$_POST["inputCharNum_".$values[0]],
																$_POST["inputSubStart_".$values[0]],
																$_POST["inputSubLength_".$values[0]],
																$_POST["inputCustomEval_".$values[0]]);

				$memberDestination = $_POST["outputDataMember_".$values[0]];
				$mapping->ProcessColumn = $ProcessColumn;
				$mapping->memberDestination = $memberDestination;

				$dataStructureProcessor->processOneToOne($mapping);

				break;
			case "many:1":
				$mapping = new ManyToOne();
				$mapping->outputToDataStructure = true;
				
				$mappingCount = $_POST["numMappings_".$values[0]];

				for($r=0; $r<$mappingCount; $r++){
					$pc = new ProcessColumn(
																$_POST["inputColumnNumber_".($r+1)."_".$values[0]], 
																$_POST["inputFunction_".($r+1)."_".$values[0]],
																$_POST["inputCharNum_".($r+1)."_".$values[0]],
																$_POST["inputSubStart_".($r+1)."_".$values[0]],
																$_POST["inputSubLength_".($r+1)."_".$values[0]],
																$_POST["inputCustomEval_".($r+1)."_".$values[0]]
															); 
					$mapping->ProcessColumns[$r] = $pc;
				}

				$memberDestination = $_POST["outputDataMember_".$values[0]];
				
				$mapping->memberDestination = $memberDestination;

				$mapping->constructedString = $_POST["outputColumnOrder_".$values[0]];

				$dataStructureProcessor->ProcessManyToOne($mapping);

				break;
		}  
		}
	}
	
	else if($outputType == "ToDataBase"){
		$grandfatherMappings = array();
		$distinctGrandfatherMapping;
		$fatherMappings = array();
		$distinctFatherMapping;
		$childMappings = array();

		//Gather Primary/Foreign key relationships

		$relationships = array();
		$counter = 0;
		for($k=0; $k<count($guidsArray); $k++){
			$values = explode(",",$guidsArray[$k]);
			$guid = $values[0];
			switch($values[1]){
				case "PKFK":
					$input = $_POST["inputDataBaseTable_".$guid];
					$output = $_POST["outputDataBaseTable_".$guid];
					$primaryKey = explode("->",$input); 
					$foreignKey = explode("->",$output); 	
					
					$newRelationship = $foreignKey[0]."->".$primaryKey[0];  
					$relationships[$counter] = $newRelationship;
					$counter++;
					break;
			}
		}
		
		$orderStr = "";
		$first = explode("->",$relationships[0]);
		$second = explode("->",$relationships[1]);

		if($first[0] == $second[1]){
			$orderStr = $relationships[1]."->".$first[1];
		}else{
			$orderStr = $relationships[0]."->".$second[1];
		}
		
		$orderSplit = explode("->",$orderStr);

		//This is the order of tables. The first being the Grandfather, then father, then child.
		$tableHierarchy = array_reverse($orderSplit);

		//determine grandfather PK table and column name (Album->id)
		//determine father FK table and column name (Track->album_id)
		$grandfatherPKColNameTableName;
		$fatherFKColNameTableName;
		for($k=0; $k<count($guidsArray); $k++){
			$values = explode(",",$guidsArray[$k]);
			$guid = $values[0];
			switch($values[1]){
				case "PKFK":
					$input = $_POST["inputDataBaseTable_".$guid];
					$output = $_POST["outputDataBaseTable_".$guid];
					$primaryKey = explode("->",$input); 
					$foreignKey = explode("->",$output); 	
					
					if($primaryKey[0] == $tableHierarchy[0]){
						$grandfatherPKColNameTableName = $input;
						$fatherFKColNameTableName = $output;
					}
					
					break;
			}
		}

		//determine father PK table and column name (Track->id)
		//determine child FK table and column name (Artist->track_id)
		$fatherPKColNameTableName;
		$childFKColNameTableName;
		for($k=0; $k<count($guidsArray); $k++){
			$values = explode(",",$guidsArray[$k]);
			$guid = $values[0];
			switch($values[1]){
				case "PKFK":
					$input = $_POST["inputDataBaseTable_".$guid];
					$output = $_POST["outputDataBaseTable_".$guid];
					$primaryKey = explode("->",$input); 
					$foreignKey = explode("->",$output); 	
					
					if($primaryKey[0] == $tableHierarchy[1]){
						$fatherPKColNameTableName = $input;
						$childFKColNameTableName = $output;
					}
					
					break;
			}
		}


		//Get all mappings for the Grandfather table
		$counter = 0;
		for($k=0; $k<count($guidsArray); $k++){
			$values = explode(",",$guidsArray[$k]);
			$guid = $values[0];
			$type = $values[1];

			$ouputMember = $_POST["outputDataBaseTable_".$guid];
			$outputMemberSplit = explode("->",$_POST["outputDataBaseTable_".$guid]);
			$outputTableName = $outputMemberSplit[0];

			//check to see if this mapping is for the grandfather table
			if(($outputTableName == $tableHierarchy[0]) && ($type != "PKFK")){

				$grandfatherMappings[$counter] = $values;
				$counter++;
			}
		}

		//Get distinct mapping from the grandfather table
		for($k=0; $k<count($grandfatherMappings); $k++){
			$guid = $grandfatherMappings[$k][0];

			$outputMemberIsDistinct = $_POST["outDatabaseTableDistinct_".$guid];
			//check to see if this mapping is distinct
			if($outputMemberIsDistinct == "on"){
				$distinctGrandfatherMapping = $guid;
			}
		}

		//Get all mappings for the Father table
		$counter = 0;
		for($k=0; $k<count($guidsArray); $k++){
			$values = explode(",",$guidsArray[$k]);
			$guid = $values[0];
			$type = $values[1];

			$ouputMember = $_POST["outputDataBaseTable_".$guid];
			$outputMemberSplit = explode("->",$_POST["outputDataBaseTable_".$guid]);
			$outputTableName = $outputMemberSplit[0];

			//check to see if this mapping is for the grandfather table
			if(($outputTableName == $tableHierarchy[1]) && ($type != "PKFK")){

				$fatherMappings[$counter] = $values;
				$counter++;
			}
		}

		//Get distinct mapping from the father table
		for($k=0; $k<count($fatherMappings); $k++){
			$guid = $fatherMappings[$k][0];

			$outputMemberIsDistinct = $_POST["outDatabaseTableDistinct_".$guid];
			//check to see if this mapping is distinct
			if($outputMemberIsDistinct == "on"){
				$distinctFatherMapping = $guid;
			}
		}

		//Get all mappings for the Child table
		$counter = 0;
		for($k=0; $k<count($guidsArray); $k++){
			$values = explode(",",$guidsArray[$k]);
			$guid = $values[0];
			$type = $values[1];

			$ouputMember = $_POST["outputDataBaseTable_".$guid];
			$outputMemberSplit = explode("->",$_POST["outputDataBaseTable_".$guid]);
			$outputTableName = $outputMemberSplit[0];

			//check to see if this mapping is for the grandfather table
			if(($outputTableName == $tableHierarchy[2]) && ($type != "PKFK")){

				$childMappings[$counter] = $values;
				$counter++;
			}
		}

		$grandFatherDistinctColNum = $_POST["inputColumnNumber_".$distinctGrandfatherMapping];
		
		$dataBaseProcessor = new MappingProcessorDataBase($_POST['InputFileExt'], $_POST['InputFileNameDir'], $serverAddress, $username, $password, $databaseName, $tableHierarchy[0],  $grandFatherDistinctColNum, "GF", null);
		$dataBaseProcessor->rewriteDataClassUsingDistinctColumn();
		//Map Grandfather table
		for($k=0; $k<count($grandfatherMappings); $k++){
			$guid = $grandfatherMappings[$k][0];
			$type = $grandfatherMappings[$k][1];

			switch($type){
				case "1:1":
					$ProcessColumn = new ProcessColumn(				$_POST["inputColumnNumber_".$guid], 
																	$_POST["inputFunction_".$guid],
																	$_POST["inputCharNum_".$guid],
																	$_POST["inputSubStart_".$guid],
																	$_POST["inputSubLength_".$guid],
																	$_POST["inputCustomEval_".$guid]);

								
					$tableAndColumn = explode("->", $_POST["outputDataBaseTable_".$guid]);
					$landingColumnName = $tableAndColumn[1];
					$landingTableName = $tableAndColumn[0];


					$mapping = new OneToOne();

					$mapping->ProcessColumn = $ProcessColumn;
					$mapping->tableName = $landingTableName;
					$mapping->columnName = $landingColumnName;
					$mapping->outputToDataBase = true;
					if($guid == $distinctGrandfatherMapping){
						$mapping->isDistinct = true;
					}
							
					$dataBaseProcessor->processOneToOne($mapping);
					break;

				case "many:1":	
					$mapping = new ManyToOne();

					$mappingCount = $_POST["numMappings_".$guid];

					for($r=0; $r<$mappingCount; $r++){
						$pc = new ProcessColumn(
																	$_POST["inputColumnNumber_".($r+1)."_".$guid], 
																	$_POST["inputFunction_".($r+1)."_".$guid],
																	$_POST["inputCharNum_".($r+1)."_".$guid],
																	$_POST["inputSubStart_".($r+1)."_".$guid],
																	$_POST["inputSubLength_".($r+1)."_".$guid],
																	$_POST["inputCustomEval_".($r+1)."_".$guid]
																); 
						$mapping->ProcessColumns[$r] = $pc;
					}

					$tableAndColumn = explode("->", $_POST["outputDataBaseTable_".$guid]);
					$landingColumnName = $tableAndColumn[1];
					$landingTableName = $tableAndColumn[0];
					$mapping->tableName = $landingTableName;
					$mapping->columnName = $landingColumnName;
					$mapping->outputToDataBase = true;
					$mapping->constructedString = $_POST["outputColumnOrder_".$guid];

					$dataBaseProcessor->ProcessManyToOne($mapping);
					break;
			}
		}
		$dataBaseProcessor->insertTableObjectIntoDatabaseGrandFather();


		$fatherDistinctColNum = $_POST["inputColumnNumber_".$distinctFatherMapping];
		//Map Father table
		$dataBaseProcessor = new MappingProcessorDataBase($_POST['InputFileExt'], $_POST['InputFileNameDir'], $serverAddress, $username, $password, $databaseName, $tableHierarchy[1],  $fatherDistinctColNum, "F", $grandFatherDistinctColNum);
		for($k=0; $k<count($fatherMappings); $k++){
			$guid = $fatherMappings[$k][0];
			$type = $fatherMappings[$k][1];

			switch($type){
				case "1:1":
					$ProcessColumn = new ProcessColumn(				$_POST["inputColumnNumber_".$guid], 
																	$_POST["inputFunction_".$guid],
																	$_POST["inputCharNum_".$guid],
																	$_POST["inputSubStart_".$guid],
																	$_POST["inputSubLength_".$guid],
																	$_POST["inputCustomEval_".$guid]);

								
					$tableAndColumn = explode("->", $_POST["outputDataBaseTable_".$guid]);
					$landingColumnName = $tableAndColumn[1];
					$landingTableName = $tableAndColumn[0];


					$mapping = new OneToOne();

					$mapping->ProcessColumn = $ProcessColumn;
					$mapping->tableName = $landingTableName;
					$mapping->columnName = $landingColumnName;
					$mapping->outputToDataBase = true;
					if($guid == $distinctFatherMapping){
						$mapping->isDistinct = true;
					}
							
					$dataBaseProcessor->processOneToOne($mapping);
					break;
				case "many:1":	
					$mapping = new ManyToOne();

					$mappingCount = $_POST["numMappings_".$guid];

					for($r=0; $r<$mappingCount; $r++){
						$pc = new ProcessColumn(
																	$_POST["inputColumnNumber_".($r+1)."_".$guid], 
																	$_POST["inputFunction_".($r+1)."_".$guid],
																	$_POST["inputCharNum_".($r+1)."_".$guid],
																	$_POST["inputSubStart_".($r+1)."_".$guid],
																	$_POST["inputSubLength_".($r+1)."_".$guid],
																	$_POST["inputCustomEval_".($r+1)."_".$guid]
																); 
						$mapping->ProcessColumns[$r] = $pc;
					}

					$tableAndColumn = explode("->", $_POST["outputDataBaseTable_".$guid]);
					$landingColumnName = $tableAndColumn[1];
					$landingTableName = $tableAndColumn[0];
					$mapping->tableName = $landingTableName;
					$mapping->columnName = $landingColumnName;
					$mapping->outputToDataBase = true;
					$mapping->constructedString = $_POST["outputColumnOrder_".$guid];

					$dataBaseProcessor->ProcessManyToOne($mapping);			
					break;
			}
		}
		$fatherDistinctColTableSplit = explode("->",$_POST["outputDataBaseTable_".$distinctFatherMapping]);
		$grandFatherDistinctColTableSplit = explode("->",$_POST["outputDataBaseTable_".$distinctGrandfatherMapping]);
		$grandFatherDistinctColNum = $_POST["inputColumnNumber_".$distinctGrandfatherMapping];
		$fatherDistinctColName = $fatherDistinctColTableSplit[1];
		$grandFatherDistinctColName = $grandFatherDistinctColTableSplit[1];
		$grandFatherTableName = $grandFatherDistinctColTableSplit[0];
		$dataBaseProcessor->insertTableObjectIntoDatabaseFather($grandFatherDistinctColNum, $grandFatherDistinctColName, $fatherDistinctColName, $grandfatherPKColNameTableName, $fatherFKColNameTableName, $grandFatherTableName);

		//Map child table
		$fatherDistinctColNum = $_POST["inputColumnNumber_".$distinctFatherMapping];
		$dataBaseProcessor = new MappingProcessorDataBase($_POST['InputFileExt'], $_POST['InputFileNameDir'], $serverAddress, $username, $password, $databaseName, $tableHierarchy[2],  null, "C", $fatherDistinctColNum);
		for($k=0; $k<count($childMappings); $k++){
			$guid = $childMappings[$k][0];
			$type = $childMappings[$k][1];

			switch($type){
				case "1:1":
					$ProcessColumn = new ProcessColumn(				$_POST["inputColumnNumber_".$guid], 
																	$_POST["inputFunction_".$guid],
																	$_POST["inputCharNum_".$guid],
																	$_POST["inputSubStart_".$guid],
																	$_POST["inputSubLength_".$guid],
																	$_POST["inputCustomEval_".$guid]);

								
					$tableAndColumn = explode("->", $_POST["outputDataBaseTable_".$guid]);

					$landingColumnName = $tableAndColumn[1];
					$landingTableName = $tableAndColumn[0];


					$mapping = new OneToOne();

					$mapping->ProcessColumn = $ProcessColumn;
					$mapping->tableName = $landingTableName;
					$mapping->columnName = $landingColumnName;
					$mapping->outputToDataBase = true;
					if($guid == $distinctGrandfatherMapping){
						$mapping->isDistinct = true;
					}
							
					$dataBaseProcessor->processOneToOne($mapping);
					break;
				case "many:1":	
					$mapping = new ManyToOne();

					$mappingCount = $_POST["numMappings_".$guid];

					for($r=0; $r<$mappingCount; $r++){
						$pc = new ProcessColumn(
																	$_POST["inputColumnNumber_".($r+1)."_".$guid], 
																	$_POST["inputFunction_".($r+1)."_".$guid],
																	$_POST["inputCharNum_".($r+1)."_".$guid],
																	$_POST["inputSubStart_".($r+1)."_".$guid],
																	$_POST["inputSubLength_".($r+1)."_".$guid],
																	$_POST["inputCustomEval_".($r+1)."_".$guid]
																); 
						$mapping->ProcessColumns[$r] = $pc;
					}

					$tableAndColumn = explode("->", $_POST["outputDataBaseTable_".$guid]);
					$landingColumnName = $tableAndColumn[1];
					$landingTableName = $tableAndColumn[0];
					$mapping->tableName = $landingTableName;
					$mapping->columnName = $landingColumnName;
					$mapping->outputToDataBase = true;
					$mapping->constructedString = $_POST["outputColumnOrder_".$guid];

					$dataBaseProcessor->ProcessManyToOne($mapping);			
					break;
				case "multi":	
						$columnNumber = $_POST["inputColumnNumber_".$guid];
						$charSplit = $_POST["srcCharSplit_".$guid];
						$hasChildren = $_POST["inputHasChildren_".$guid];

						$mapping = new Multi($columnNumber, $charSplit, $hasChildren);
						$tableAndColumn = explode("->", $_POST["outputDataBaseTable_".$guid]);
						$landingColumnName = $tableAndColumn[1];
						$landingTableName = $tableAndColumn[0];
						$mapping->tableName = $landingTableName;
						$mapping->columnName = $landingColumnName;

						$dataBaseProcessor->ProcessMulti($mapping);

					break;
			}
		}

		$fatherDistinctColTableSplit = explode("->",$_POST["outputDataBaseTable_".$distinctFatherMapping]);
		$fatherDistinctColNum = $_POST["inputColumnNumber_".$distinctFatherMapping];
		$fatherDistinctColName = $fatherDistinctColTableSplit[1];
		$fatherTableName = $fatherDistinctColTableSplit[0];
		$dataBaseProcessor->insertTableObjectIntoDatabaseChild($fatherDistinctColNum, $fatherDistinctColName, $fatherPKColNameTableName, $childFKColNameTableName, $fatherTableName);
	}
    
    if($outputType == "ToOutputDataFile"){
        $processor->writeDataToFile();
    }else if($outputType == "ToDataStructure"){
        $dataStructureProcessor->Normalise($dataStructureProcessor->outputDataStructure);
    }

    echo "Processing complete. <a href='index.php'>Click here to process another file</a>";

}catch(Exception $e){
	throw new Exception("Error processing.<br>");
	echo $e;
}
?>
</body>
</html>