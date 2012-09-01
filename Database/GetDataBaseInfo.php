<?php
/*
	PHP file will be used with AJAX calls.
	Get variables are:
	
	queryType
	serverAddress
	username
	password
	selectedDatabase
*/

include "Connection.php";

$queryType = $_POST['queryType'];

$serverAddress = $_POST['serverAddress'];
$username = $_POST['username'];
$password = $_POST['password'];

$conn = new Connection($serverAddress, $username, $password);

//init connection
$conn->connect();

if($queryType == 'RetrieveListOfDatabaseNames'){
	$res = $conn->getListOfDatabases();
	
	//$res is a formatted string that will be interpretted by the web browser client in JavaScript.
	echo $res;
	
}else if($queryType == 'RetrieveDatabaseInformationForMappings'){
	$selectedDataBase = $_POST['selectedDatabase'];
	$conn->selectDatabase($selectedDataBase);
	
	//$res is a formatted string that will be interpretted by the web browser client in JavaScript.
	$res = $conn->getDatabaseInfoForMappings();
	
	echo $res;

}

//close connection

$conn->disconnect();
?>