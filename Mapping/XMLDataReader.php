<?php

class XMLDataReader implements iReader{
	//Read from different types of data sources

	//In an xml file e.g.
	//<customers>
	//		<customer>           <-- The row
	//   		<name>         <-- A column
	//   		<age>          <-- Another column
	//			<cardnumber>   <-- Another column
	//		</customer>       
	//</customers>

	//As an associative array

	public $data;

	function __construct($fileName){

		$this->data = new DataClass();

		$xml = new XMLReader();
		$xml->open($fileName);

		//put it into an associative array
		$assoc = $this->xml2assoc($xml);
		
		//put it into our generic DataClass
		for($i=0; $i<count($assoc[0]["value"]); $i++)
		{
			//make a new row
			$r = new Row();

			for($j=0; $j<count($assoc[0]["value"][0]["value"]); $j++)
			{
				$r->values[$j] = $assoc[0]["value"][$i]["value"][$j]["value"];
			}

			$this->data->rows[$i] = $r;
		}
	}


	function xml2assoc($xml) { 
	    $tree = null; 
	    while($xml->read()) 
	        switch ($xml->nodeType) { 
	            case XMLReader::END_ELEMENT: return $tree; 
	            case XMLReader::ELEMENT: 
	                $node = array('tag' => $xml->name, 'value' => $xml->isEmptyElement ? '' : $this->xml2assoc($xml)); 
	                if($xml->hasAttributes) 
	                    while($xml->moveToNextAttribute()) 
	                        $node['attributes'][$xml->name] = $xml->value; 
	                $tree[] = $node; 
	            break; 
	            case XMLReader::TEXT: 
	            case XMLReader::CDATA: 
	                $tree .= $xml->value; 
	        } 
	    return $tree; 
	} 
}

?>