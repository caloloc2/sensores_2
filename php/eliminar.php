<?php 

$respuesta['estado'] = false;

try{
	require 'meta.php';
	$id_dispositivo = $_POST['id_dispositivo'];

	$aux = Meta::Consulta("DELETE FROM datos WHERE id_dispositivo=".$id_dispositivo);

	$respuesta['estado'] = true;
	
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);