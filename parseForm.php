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
    include "Mapping\MappingProcessor.php";
    include "Mapping\MappingProcessorDataStructure.php";

    $guids = $_POST['guidList'];
    
    //remove the trailing empty guid
    $guids = rtrim($guids, ';');

    $guidsArray = split(';', $guids);

    $outputData = new DataClass();

    $outputDataStructure = array();

    $processor = new MappingProcessor($_POST['InputFileExt'], $_POST['OutputFileExt'], $_POST['InputFileNameDir'], $_POST['OutputFileNameDir'], $outputData);

    $dataStructureProcessor = new MappingProcessorDataStructure($_POST['InputFileExt'], $_POST['InputFileNameDir'], $outputDataStructure);

    $outputType = $_POST["MappingType"];

    for($k=0; $k<count($guidsArray); $k++){
        $values = split(",",$guidsArray[$k]);   

        if($outputType == "ToOutputDataFile"){
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
        }else if($outputType == "ToDataStructure"){
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
    
    if($outputType == "ToOutputDataFile"){
        $processor->writeDataToFile();
    }else if($outputType == "ToDataStructure"){
        $dataStructureProcessor->Normalise($dataStructureProcessor->outputDataStructure);
    }
?>
</body>
</html>