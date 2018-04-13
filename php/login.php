<?php 

$respuesta['estado'] = false;

try{
	session_start();
	$_SESSION['user'] = '1';

	$respuesta['estado'] = true;
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);