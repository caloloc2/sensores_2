<?php 

$respuesta['estado'] = false; // setea el estado de la respuesta como falso

try{
	require 'meta.php'; // llama al archivo de conexion a base de datos
	$id_dispositivo = $_POST['id_dispositivo']; // lee el id del dispoitivo
	$fecha_inicio = $_POST['fecha_inicio']; // lee la fecha de inicio
	$fecha_final = $_POST['fecha_final']; // lee la fecha final

	// realiza la consulta a base de datos con los campos leidos
	$aux = Meta::Consulta("SELECT * FROM datos WHERE ((id_dispositivo=".$id_dispositivo.") AND (fecha BETWEEN '".$fecha_inicio."' AND '".$fecha_final."')) ORDER BY id_dato ASC");

	if (count($aux)){ // si existe algun dato
		$respuesta['datos'] = $aux; // guarda el o los datos en la variable respuesta['datos']
	}

	$respuesta['estado'] = true; // si todo se ejecuto bien,cambia a verdadero
	
}catch(Exception $e){ // controla errores
	$respuesta['error'] = $e->getMessage(); // si hay errores en respuesta['error'] especifica q error es
}

echo json_encode($respuesta); // escribe en formato json los valores de estado, datos y error(en caso de haber)