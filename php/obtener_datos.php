<?php 

$respuesta['estado'] = false;

try{
	require 'meta.php';
	$id_dispositivo = $_POST['id_dispositivo'];
	$fecha_inicio = $_POST['fecha_inicio'];
	$fecha_final = $_POST['fecha_final'];

	$aux = Meta::Consulta("SELECT * FROM datos WHERE ((id_dispositivo=".$id_dispositivo.") AND (fecha BETWEEN '".$fecha_inicio."' AND '".$fecha_final."')) ORDER BY id_dato ASC");

	if (count($aux)){
		$respuesta['datos'] = $aux;
	}

	$respuesta['estado'] = true;
	
}catch(Exception $e){
	$respuesta['error'] = $e->getMessage();
}

echo json_encode($respuesta);