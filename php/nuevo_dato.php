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

		if (isset($_GET['t'])){
			$temperatura = $_GET['t'];
		}

		if (isset($_GET['h'])){
			$nivel_agua = $_GET['h'];
		}

		if (isset($_GET['c'])){
			$nivel_gasolina = $_GET['c'];
		}		

		if (isset($_GET['l'])){
			$latitud = $_GET['l'];
		}

		if (isset($_GET['o'])){
			$longitud = $_GET['o'];
		}

		$insertar = Meta::Nuevo_Dato($fecha, $hora, $temperatura, $nivel_agua, $nivel_gasolina, $velocidad, $latitud, $longitud, $id);

		echo 'ok';
	}else{
		echo 'Especifique el id';
	}

}catch(Exception $e){
	echo $e->getMessage();
}
