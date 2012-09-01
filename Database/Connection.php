<?php

class Connection{
	public $serverName;
	public $userName;
	public $password;
	public $connection;
	public $selectedDatabaseName;
	
	function __construct($sName, $uName, $pWord){
		$this->serverName = $sName;
		$this->userName = $uName;
		$this->password = $pWord;
	}
	
	function connect(){
		$this->connection = mysql_connect($this->serverName, $this->userName, $this->password);
	}
	
	function disconnect(){
		mysql_close($this->connection);
	}
	
	//return comma seperated list of databases on this server
	function getListOfDatabases(){
		$db_list = mysql_list_dbs($this->connection);
		$list = "";
		while($db = mysql_fetch_object($db_list)){
			$list .= $db->Database.",";
		}
		$list = rtrim($list, ",");
		
		return $list;
	}
	
	function selectDatabase($name){
		$this->selectedDatabaseName = $name;
		mysql_select_db($name, $this->connection);
	}
	
	//returns a string in the following format:
	//tableName1;col1:isPrimary,col2:isPrimary,col3:isPrimary,...|tableName2;col1:isPrimary,col2:isPrimary,...
	function getDatabaseInfoForMappings(){
		$tableNames = mysql_list_tables($this->selectedDatabaseName, $this->connection);
		$count=mysql_num_rows($tableNames); 
		$returnString = "";
		for($x=0;$x<$count;$x++) 
		{
			$currentTableName = mysql_tablename($tableNames,$x);
			
			$currColsInfo = "";
			
			$result = mysql_query("SHOW COLUMNS FROM ".$currentTableName);
			if (!$result) {
				echo 'Could not run query: ' . mysql_error();
				exit;
			}
			if (mysql_num_rows($result) > 0) {
				while($currRow =  mysql_fetch_assoc($result)){
					$currColName = $currRow["Field"];
					if($currRow["Key"] == "PRI"){
						$currColPrimaryKey = "1";
					}else{
						$currColPrimaryKey = "0";
					}
					
					$currColsInfo .= $currColName.":".$currColPrimaryKey.",";
				}
			}
			
			$currColsInfo = rtrim($currColsInfo, ",");
			
			$returnString .= $currentTableName.";".$currColsInfo."|";
		}
		$returnString = rtrim($returnString, "|");
		
		return $returnString;
	}
}
?>