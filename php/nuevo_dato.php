<?php 

try{
	
	require 'meta.php';

	$fecha = date('Y-m-d');
	$hora = date('H:i:s');

	$temperatura = 0;
	$nivel_agua = 0;
	$nivel_gasolina = 0;
	$velocidad = 0;	
	$latitud = 0;
	$longitud = 0;

	if (isset($_GET['id'])){
		$id = $_GET['id'];

		if (isset($_GET['temperatura'])){
			$temperatura = $_GET['temperatura'];
		}

		if (isset($_GET['nivel_agua'])){
			$nivel_agua = $_GET['nivel_agua'];
		}

		if (isset($_GET['nivel_gasolina'])){
			$nivel_gasolina = $_GET['nivel_gasolina'];
		}

		if (isset($_GET['velocidad'])){
			$velocidad = $_GET['velocidad'];
		}

		if (isset($_GET['latitud'])){
			$latitud = $_GET['latitud'];
		}

		if (isset($_GET['longitud'])){
			$longitud = $_GET['longitud'];
		}

		$insertar = Meta::Nuevo_Dato($fecha, $hora, $temperatura, $nivel_agua, $nivel_gasolina, $velocidad, $latitud, $longitud, $id);

		echo 'ok';
	}else{
		echo 'Especifique el id';
	}

}catch(Exception $e){
	echo $e->getMessage();
}
