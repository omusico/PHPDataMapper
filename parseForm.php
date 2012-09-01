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

    $guids = $_POST['guidList'];
    
    //remove the trailing empty guid
    $guids = rtrim($guids, ';');

    $guidsArray = split(';', $guids);

    $outputData = new DataClass();

    $processor = new MappingProcessor($_POST['InputFileExt'], $_POST['OutputFileExt'], $_POST['InputFileNameDir'], $_POST['OutputFileNameDir'], $outputData);

    
    for($k=0; $k<count($guidsArray); $k++){
        $values = split(",",$guidsArray[$k]);   


        switch($values[1]){
            case "1:1":
                $ProcessColumn = new ProcessColumn($_POST["inputColumnNumber_".$values[0]], 
                                                                $_POST["inputFunction_".$values[0]],
                                                                $_POST["inputCharNum_".$values[0]],
                                                                $_POST["inputSubStart_".$values[0]],
                                                                $_POST["inputSubEnd_".$values[0]]);

                            
                                 
                $landingcolumnNumber = $_POST["outputColumnNumber_".$values[0]];


                $mapping = new OneToOne($ProcessColumn, "table", $landingcolumnNumber);

                $processor->processOneToOne($mapping);

                break;
            case "many:1":
                $mapping = new ManyToOne();

                $mappingCount = $_POST["numMappings_".$values[0]];

                for($r=0; $r<$mappingCount; $r++){
                    $pc = new ProcessColumn(
                                                                $_POST["inputColumnNumber_".$values[0]], 
                                                                $_POST["inputFunction_".$values[0]],
                                                                $_POST["inputSplitBy_".$values[0]],
                                                                $_POST["inputCharNum_".$values[0]],
                                                                $_POST["inputSubStart_".$values[0]],
                                                                $_POST["inputSubEnd_".$values[0]]
                                                            ); 
                    $mapping->ProcessColumns[$r] = $pc;
                }

                $mapping->landingColumnNumber = $_POST["outputColumnNumber_".$values[0]];
                $mapping->constructedString = $_POST["outputColumnOrder_".$values[0]];

                print_r($mapping);

                $processor->ProcessManyToOne($mapping);

                break;
        }


        $processor->writeDataToFile();
    }
    
?>
</body>
</html>