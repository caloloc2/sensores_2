<?php 

$respuesta['estado'] = false;

try{
	require 'meta.php';

	$aux = Meta::Consulta("SELECT * FROM dispositivos ORDER BY id_dispositivo ASC");

	if (count($aux)){
		$respuesta['dispositivos'] = $aux;
	}

	$respuesta['estado'] = true;
	
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);