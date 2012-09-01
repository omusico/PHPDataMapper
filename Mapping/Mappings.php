<?php
	class OneToOne{
		//a class to hold the processing information
		public $ProcessColumn;

		//the name of the 'landing' table
		public $tableName;

		//the number of the 'landing' column, starting from 0
		public $landingColumnNumber;

		function __construct($ProcessColumn, $tableName, $landingColumnNumber)
		{
			$this->ProcessColumn = $ProcessColumn;
			$this->tableName = $tableName;
			$this->landingColumnNumber = $landingColumnNumber;
		}
	}

	class ManyToOne{
		public $ProcessColumns = array();
		public $tableName;
		public $landingColumnNumber;
		public $constructedString;
	}

	class ProcessColumn{
		public $columnNumber;
		public $fnction;
		public $characterNumber;
		public $subStringStart;
		public $subStringEnd;
		public $customEvaluation;

		function __construct($columnNumber, $fnction, $characterNumber, $subStringStart, $subStringEnd, $customEvaluation)
		{
			$this->columnNumber = $columnNumber;
			$this->fnction = $fnction;
			$this->characterNumber = $characterNumber;
			$this->subStringStart = $subStringStart;
			$this->subStringEnd = $subStringEnd;
			$this->customEvaluation = $customEvaluation;
		}
	}
?>