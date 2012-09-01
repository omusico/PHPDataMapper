<?php
	class OneToOne{
		//a class to hold the processing information
		public $ProcessColumn;

		//the name of the 'landing' table when mapping to a database
		public $tableName;

		//The name of the 'landing' table column when mapping to a database
		public $columnName;

		//the number of the 'landing' column, starting from 0
		public $landingColumnNumber;

		//For output to data structure
		public $memberDestination;

		public $outputToDataStructure = false;

		public $outputToDataBase = false;

		public $isDistinct = false;
	}

	class ManyToOne{
		public $ProcessColumns = array();
		public $tableName;
		public $columnName;
		public $landingColumnNumber;
		public $constructedString;
		
		//For output to data structure
		public $memberDestination;

		public $outputToDataStructure = false;

		public $outputToDataBase = false;
	}

	class Multi{
		public $tableName;
		public $columnName;
		public $processColumnMutli;

		function __construct($columnNumber, $splitCharacter, $hasChildren){
			$this->processColumnMutli = new ProcessColumnMulti($columnNumber, $splitCharacter, $hasChildren);
		}
	}

	class ProcessColumn{
		public $columnNumber;
		public $fnction;
		public $characterNumber;
		public $subStringStart;
		public $subStringLength;
		public $customEvaluation;

		function __construct($columnNumber, $fnction, $characterNumber, $subStringStart, $subStringLength, $customEvaluation)
		{
			$this->columnNumber = $columnNumber;
			$this->fnction = $fnction;
			$this->characterNumber = $characterNumber;
			$this->subStringStart = $subStringStart;
			$this->subStringLength = $subStringLength;
			$this->customEvaluation = $customEvaluation;
		}
	}

	class ProcessColumnMulti{
		public $columnNumber;
		public $splitCharacter;
		public $hasChildren;

		function __construct($columnNumber, $splitCharacter, $hasChildren)
		{
			$this->columnNumber = $columnNumber;
			$this->splitCharacter = $splitCharacter;
			$this->hasChildren = $hasChildren;
		}
	}
?>