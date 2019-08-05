<?php

$method = $_SERVER['REQUEST_METHOD'];

$pdo = new PDO("mysql:host=localhost;port=8080;dbname=calculator", "root");

if ($method == "GET") {
	$statement = $pdo->query("SELECT * from calculator_data;");
	$json = [];
	while ($result = $statement->fetch(PDO::FETCH_ASSOC)) {
		array_push($json, $result);
	}
	echo json_encode($json);
}
else if ($method == "POST") {
	if (!isset($_POST["calcul"])) {
		echo json_encode("{error: 'No calcul'}");	
	}
	else if (!isset($_POST["result"])) {
		echo json_encode("{error: 'No result'}");	
	}
	else {
		$statement = $pdo->prepare("INSERT INTO calculator_data(date, calcul, result) VALUES (NOW(), ?, ?);");
		if ($statement->execute(Array($_POST["calcul"], $_POST["result"])))
			echo json_encode("{message: 'POST succesfull'}");
		else
			echo json_encode("{error: 'POST unsuccesfull'}");	
	}
}
?>