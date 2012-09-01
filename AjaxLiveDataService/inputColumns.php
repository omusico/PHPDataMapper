<?php
	$function = $_POST["inputFunction"];
	$inputColNum = $_POST["inputColNum"];
	$inputColValue = $_POST["inputColVal"];
	$char = $_POST["chr"];
	$subStringStart = $_POST["subStringStart"];
	$subStringLength = $_POST["subStringLength"];
	$customEvalText = $_POST["customEvalText"];

	switch ($function) {
		case '--':
			echo "...";
			break;
		case 'char':
			$newValue = substr( $inputColValue, 
										$char, 
										1
										);
			echo $newValue;
			break;

		case 'substr':
			$newValue = substr( $inputColValue, 
										$subStringStart, 
										$subStringLength 
										);
			echo $newValue;
			break;

		case 'direct':
			echo $inputColValue;
			break;

		case 'eval':
			$ColValue = $inputColValue;

			$eval =  str_replace("#ColValue","\"".$ColValue."\"",$customEvalText);
			$newValue = "";
			try{
				@trigger_error("");
				$result = eval("\$newValue = $eval");
				$error = error_get_last();
				if (substr($error["message"], "PHP Parse error") === 0)
			    {
			        echo "Parse error: " . $code;
			    }else{
					echo $newValue;
				}
			}catch(Exception $e){
				echo "...";
			}
			break;
		default:
			echo $inputColValue;
			break;
	}

?>