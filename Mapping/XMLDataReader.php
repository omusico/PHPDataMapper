<?php

class XMLDataReader{
	//Read from different types of data sources

	//In an xml file e.g.
	//<customer>           <-- The row
	//   	<name>         <-- A column
	//   	<age>          <-- Another column
	//		<cardnumber>   <-- Another column
	//</customer>       

	//As an associative array
	// Array
	// (
	// 	[0] => Array
	// 	(
	// 		[tag] => customer
	// 		[value] = > Array
	// 			(
	// 				[0] => Array
	// 					(
	// 						[tag] => name
	// 						[value] => John
	// 					)
	// 				[1] => Array
	// 					(
	// 						[tag] => age
	// 						[value] => 16
	// 					)
	// 				[2] => Array
	// 					(
	// 						[tag] => cardnumber
	// 						[value] => 16253498
	// 					)
	// 			)
	// 	)
	// )

	public $data;

	function __construct($fileName){

		$this->data = new DataClass();

		$xml = new XMLReader();
		$xml->open($fileName);

		//put it into an associative array
		$assoc = xml2assoc($xml);
		
		//put it into our generic DataClass
		for($i=0; $i<size($assoc); $i++)
		{
			//make a new row
			$r = new Row();

			for($j=0; $j<size($assoc[$i]); $j++)
			{
				$r->values[$j] = $assoc[$i][$j];
			}

			$data->rows[$i] = $r;
		}
	}
}

?>