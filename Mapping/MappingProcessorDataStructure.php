<?php

include "DataStructure/NonNormalisedData.php";
include "DataStructure/Track.php";
include "DataStructure/Artist.php";
include "DataStructure/Album.php";


class MappingProcessorDataStructure{

	public $dataFileClass;
	public $fileType;
	public $dataFile;
	public $outputDataStructure;

	function __construct($inputFileType, $inputFileName, $outputDataStructure){
		$this->fileType = $inputFileType;
		$this->dataFile = $inputFileName;
		$this->outputDataStructure = $outputDataStructure;
		$this->dataFileClass = new DataClass();

		$this->loadDataIntoDataClass();

		$this->FillArray();
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

	public function FillArray(){
		$rowCount = count($this->dataFileClass->rows);
        echo $rowCount."<br/>";
		for($j=0; $j<$rowCount; $j++){
			$this->outputDataStructure[$j] = new NonNormalisedData();
		}
	}

	public function Normalise($data){
        
		$albums = array();

		$ISBNstemp = array();
        
        $ISBNs = array();

		for($i=0; $i<count($data); $i++){
			$ISBNstemp[] = $data[$i]->albumIsbn;     
		}

		$ISBNstemp = array_unique($ISBNstemp);
                                                     
        foreach($ISBNstemp as $value){
            $ISBNs[] = $value;
        }                                              
        
        //for each of the ISBNs 
        //    make an album
        //    loop through each track for the NonNormalisedData
        //    if the current track has a match to the current ISBN
        //      add a new track to the current album
		for($i=0; $i<count($ISBNs); $i++){
		    $currentISBN = $ISBNs[$i];
            $albums[$i] = new Album();                  
            
            for($j=0; $j<count($data); $j++){
                
                if($data[$j]->albumIsbn == $currentISBN){
                    //this track belongs to the current album
                    $currentTrack = new Track();

                    $currentTrack->ISRC = $data[$j]->trackIsrc;
                    $currentTrack->length = $data[$j]->trackLength;
                    $currentTrack->name = $data[$j]->trackName;
                    $currentTrack->number = $data[$j]->trackNumber;
                    $currentTrack->artists = $data[$j]->trackArtists;
                    
                    $albums[$i]->tracks[] = $currentTrack;
                    $albums[$i]->name = $data[$i]->albumName;
                    $albums[$i]->discNumber = $data[$i]->albumDiscNumber;
                    $albums[$i]->ISBN = $data[$i]->albumIsbn;                    
                }     
            }
		}
        
        echo "<br/><br/>";
        print_r($albums);         
	}

	public function processOneToOne($mapping){
		// $mapping is the OneToOne class
		// for each row in the input data file
		// 	read value from specified column using column number
		// 	do function on value with column number
		// 	store the result value in the global data class

		$rowCount = count($this->dataFileClass->rows);
		
		$memberDestination = $mapping->memberDestination;	
		

		for($j=0; $j<$rowCount; $j++){

			$columnNumber = $mapping->ProcessColumn->columnNumber;
			
			$existingColumnValue = $this->dataFileClass->rows[$j]->values[$columnNumber];

            
			switch($mapping->ProcessColumn->fnction){
                
				case "substr":
					$newValue = substr( $existingColumnValue, 
										$mapping->ProcessColumn->subStringStart, 
										$mapping->ProcessColumn->subStringLength 
										);
										
					switch($memberDestination){
						case "Album->name";
							$this->outputDataStructure[$j]->albumName = $newValue;
							break;	
						case "Album->discNumber";
							$this->outputDataStructure[$j]->albumDiscNumber = $newValue;
							break;	
						case "Track->artists";
							$this->outputDataStructure[$j]->trackArtists = $newValue;
							break;	
						case "Track->name";
							$this->outputDataStructure[$j]->trackName = $newValue;
							break;	
						case "Track->length";
							$this->outputDataStructure[$j]->trackLength = $newValue;
							break;	
						case "Track->number";
							$this->outputDataStructure[$j]->trackNumber = $newValue;
							break;				
						case "Track->ISRC";
							$this->outputDataStructure[$j]->trackIsrc = $newValue;
							break;		
						case "Album->ISBN";
							$this->outputDataStructure[$j]->albumIsbn = $newValue;
							break;		
					}

					break;
				case "char":
					$newValue = substr( $existingColumnValue, 
										$mapping->ProcessColumn->characterNumber, 
										1
										);
					
					switch($memberDestination){
						case "Album->name";
							$this->outputDataStructure[$j]->albumName = $newValue;
							break;	
						case "Album->discNumber";
							$this->outputDataStructure[$j]->albumDiscNumber = $newValue;
							break;	
                        case "Track->artists";
                            $this->outputDataStructure[$j]->trackArtists = $newValue;
                            break;
						case "Track->name";
							$this->outputDataStructure[$j]->trackName = $newValue;
							break;	
						case "Track->length";
							$this->outputDataStructure[$j]->trackLength = $newValue;
							break;	
						case "Track->number";
							$this->outputDataStructure[$j]->trackNumber = $newValue;
							break;			
						case "Track->ISRC";
							$this->outputDataStructure[$j]->trackIsrc = $newValue;
							break;		
						case "Album->ISBN";
							$this->outputDataStructure[$j]->albumIsbn = $newValue;
							break;		
					}


					break;
				case "direct":
					$newValue = $existingColumnValue;

					switch($memberDestination){
						case "Album->name";
							$this->outputDataStructure[$j]->albumName = $newValue;
							break;	
						case "Album->discNumber";
							$this->outputDataStructure[$j]->albumDiscNumber = $newValue;
							break;	
                        case "Track->artists";
                            $this->outputDataStructure[$j]->trackArtists = $newValue;
                            break;
						case "Track->name";
							$this->outputDataStructure[$j]->trackName = $newValue;
							break;	
						case "Track->length";
							$this->outputDataStructure[$j]->trackLength = $newValue;
							break;	
						case "Track->number";
							$this->outputDataStructure[$j]->trackNumber = $newValue;
							break;			
						case "Track->ISRC";
							$this->outputDataStructure[$j]->trackIsrc = $newValue;
							break;		
						case "Album->ISBN";
							$this->outputDataStructure[$j]->albumIsbn = $newValue;
							break;		
					}


					break;
				case "eval":
					$ColValue = $existingColumnValue;

					$eval =  str_replace("#ColValue","\"".$ColValue."\"",$mapping->ProcessColumn->customEvaluation);
					$newValue = "";
					eval("\$newValue = $eval");
					
					switch($memberDestination){
						case "Album->name";
							$this->outputDataStructure[$j]->albumName = $newValue;
							break;	
						case "Album->discNumber";
							$this->outputDataStructure[$j]->albumDiscNumber = $newValue;
							break;	
                        case "Track->artists";
                            $this->outputDataStructure[$j]->trackArtists = $newValue;
                            break;
						case "Track->name";
							$this->outputDataStructure[$j]->trackName = $newValue;
							break;	
						case "Track->length";
							$this->outputDataStructure[$j]->trackLength = $newValue;
							break;	
						case "Track->number";
							$this->outputDataStructure[$j]->trackNumber = $newValue;
							break;			
						case "Track->ISRC";
							$this->outputDataStructure[$j]->trackIsrc = $newValue;
							break;		
						case "Album->ISBN";
							$this->outputDataStructure[$j]->albumIsbn = $newValue;
							break;	
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

		$memberDestination = $mapping->memberDestination;

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
			//$this->outputDataFileClass->rows[$j]->values[$landingColumnNumber] = $newFinalValue;

			switch($memberDestination){
				case "Album->name";
					$this->outputDataStructure[$j]->albumName = $newFinalValue;
					break;	
				case "Album->discNumber";
					$this->outputDataStructure[$j]->albumDiscNumber = $newFinalValue;
					break;	
				case "Artist->name";
					$this->outputDataStructure[$j]->artistName = $newFinalValue;
					break;	
				case "Track->name";
					$this->outputDataStructure[$j]->trackName = $newFinalValue;
					break;	
				case "Track->length";
					$this->outputDataStructure[$j]->trackLength = $newFinalValue;
					break;	
				case "Track->number";
					$this->outputDataStructure[$j]->trackNumber = $newFinalValue;
					break;			
				case "Track->ISRC";
					$this->outputDataStructure[$j]->trackIsrc = $newFinalValue;
					break;		
				case "Album->ISBN";
					$this->outputDataStructure[$j]->albumIsbn = $newFinalValue;
					break;	
			}

		}
	}

	public function processOneToMany($mapping){
		// for each row in the input data file
		// 	read value from specified column using column number
		// 	do function on value with column number
		// 	store the result value in the global data class
	}
}
?>