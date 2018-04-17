<?php 

try{
	
	require 'meta.php';

	$fecha = date('Y-m-d');
	$hora = date('H:i:s');

	$humo = 0;
	$alcohol = 0;
	$temp = 0;
	$humedad = 0;
	$latitud = 0;
	$longitud = 0;

	if (isset($_GET['id'])){
		$id = $_GET['id'];

		if (isset($_GET['co2'])){
			$co2 = $_GET['co2'];
		}

		if (isset($_GET['humo'])){
			$humo = $_GET['humo'];
		}

		if (isset($_GET['metano'])){
			$metano = $_GET['metano'];
		}

		if (isset($_GET['temp'])){
			$temp = $_GET['temp'];
		}

		if (isset($_GET['humedad'])){
			$humedad = $_GET['humedad'];
		}

		if (isset($_GET['latitud'])){
			$latitud = $_GET['latitud'];
		}

		if (isset($_GET['longitud'])){
			$longitud = $_GET['longitud'];
		}

		$insertar = Meta::Nuevo_Dato($fecha, $hora, $co2, $humo, $metano, $temp, $humedad, $latitud, $longitud, $id);

		echo 'ok';
	}else{
		echo 'Especifique el id';
	}

}catch(Exception $e){
	echo $e->getMessage();
}
