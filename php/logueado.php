<?php 

$respuesta['estado'] = false;

try{
	session_start();
	if ((isset($_SESSION['user']))&&(!empty($_SESSION['user']))){
		$respuesta['estado'] = true;
	}

}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);