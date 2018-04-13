<?php 

$respuesta['estado'] = false;

try{
	
	require 'meta.php';
	$dispositivo = $_POST['dispositivo'];

	$insertar = Meta::Nuevo_Dispositivo($dispositivo);

	$respuesta['estado'] = true;
	
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);
