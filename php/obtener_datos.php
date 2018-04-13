<?php 

$respuesta['estado'] = false;

try{
	require 'meta.php';
	$id_dispositivo = $_POST['id_dispositivo'];

	$aux = Meta::Consulta("SELECT * FROM datos WHERE (id_dispositivo=".$id_dispositivo.") ORDER BY id_dato DESC");

	if (count($aux)){
		$respuesta['datos'] = $aux;
	}

	$respuesta['estado'] = true;
	
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);