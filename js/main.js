function Login(){
	var usuario = document.getElementById('usuario').value;
	var pass = document.getElementById('pass').value;

	if ((usuario!='')&&(pass!='')){
		if ((usuario=='admin')&&(pass=='1234')){
			Crear_Inicio();
		}else{
			alert("El usuario o contrasena son incorrectos.");
		}
	}else{
		alert("Debe especificar los dos campos obligatoriamente.");
	}
}


function Crear_Inicio(){
	$.ajax({
		url: 'php/login.php',
		dataType: 'json',
		async: false,
		success: function(datos) {
			if (!datos['estado']){
				alert("Error al crear el inicio de sesion.");
				console.log(datos['error']);
			}else{
				window.location.href = 'index.html';
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});
}

function Verifica_Inicio(){
	$.ajax({
		url: 'php/logueado.php',
		dataType: 'json',
		async: false,
		success: function(datos) {
			if (!datos['estado']){
				window.location.href = 'login.html';
			}else{
				$('#loading').fadeOut(550);
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
}

function Dispositivos(){
	$.ajax({
		url: 'php/obtener_dispositivos.php',
		dataType: 'json',
		async: false,
		success: function(datos) {			
			if (datos['estado']){
				var lista = '';
				$('#dispositivos_seleccion').html('');
				$('#listado_dispositivos').html('');
				datos['dispositivos'].forEach( function(element, index) {
					//console.log(element);
					var item = '<option value="'+element['id_dispositivo']+'">'+element['dispositivo']+'</option>';					
					lista += '<tr>';
					lista += '<td>'+element['dispositivo']+' (id='+element['id_dispositivo']+')</td>';
					lista += '<td width="5%"><a href="#" onclick="Eliminar_Dispositivo('+element['id_dispositivo']+'); return false;">Eliminar</a></td>';
					lista += '</tr>';
					$('#dispositivos_seleccion').append(item);
				});
				$('#listado_dispositivos').html(lista);
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
	$('#loading').fadeOut(550);
}

function Eliminar_Dispositivo(id){
	$('#loading').fadeIn(150);
	$.ajax({
		url: 'php/eliminar_dispositivo.php',
		dataType: 'json',
		data: {
			id_dispositivo: id 
		},
		type: "POST",
		async: false,
		success: function(datos) {
			Dispositivos();
			Obtener_Datos();
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
	$('#loading').fadeOut(350);
}

function Obtener_Datos(){
	$.ajax({
		url: 'php/obtener_datos.php',
		dataType: 'json',
		data: {
			id_dispositivo: document.getElementById('dispositivos_seleccion').value
		},
		type: "POST",
		async: false,
		success: function(datos) {
			//console.log(datos);
			if (datos['estado']){
				var items = '';
				var series = [];
				var co2_val = [];
				var humo_val = [];
				var alcohol_val = [];
				var temperatura_val = [];
				var humedad_val = [];

				try {					
					datos['datos'].forEach( function(element, index) {
						//console.log(element);
						items += '<tr>';
						items += '<td>'+element['fecha']+'</td>';
						items += '<td>'+element['hora']+'</td>';
						items += '<td>'+element['co2']+'</td>';
						items += '<td>'+element['humo']+'</td>';
						items += '<td>'+element['alcohol']+'</td>';
						items += '<td>'+element['temperatura']+'</td>';
						items += '<td>'+element['humedad']+'</td>';
						items += '<td>'+element['latitud']+'</td>';
						items += '<td>'+element['longitud']+'</td>';
						if ((element['latitud']!=0)&&(element['latitud']!=0)){
							items += '<td class="mapa"><a href="http://maps.google.com/?q='+element['latitud']+','+element['longitud']+'&z=18" target="_blank">Ver Mapa</a></td>';
						}else{
							items += '<td>&nbsp;</td>';
						}
						items += '</tr>';

						co2_val.push(parseFloat(element['co2']));
						humo_val.push(parseFloat(element['humo']));
						alcohol_val.push(parseFloat(element['alcohol']));
						temperatura_val.push(parseFloat(element['temperatura']));
						humedad_val.push(parseFloat(element['humedad']));
					});

					var co2 = {
				        name: 'CO2',
				        data: co2_val
				    }
				    series.push(co2);

				    var humo = {
				        name: 'Humo',
				        data: humo_val
				    }
				    series.push(humo);

				    var alcohol = {
				        name: 'Alcohol',
				        data: alcohol_val
				    }
				    series.push(alcohol);

				    var temperatura = {
				        name: 'Temperatura',
				        data: temperatura_val
				    }
				    series.push(temperatura);

				    var humedad = {
				        name: 'Humedad',
				        data: humedad_val
				    }
				    series.push(humedad);

				} catch(e) {
					//console.log(e);
				}
				
				Grafica(series);

				$('#listado').html(items);
			}else{
				$('#listado').html('');
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
	$('#loading').fadeOut(350);
}

function Eliminar(){
	$('#loading').fadeIn(150);
	$.ajax({
		url: 'php/eliminar.php',
		dataType: 'json',
		data: {
			id_dispositivo: document.getElementById('dispositivos_seleccion').value 
		},
		type: "POST",
		async: false,
		success: function(datos) {
			Obtener_Datos();
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
	$('#loading').fadeOut(350);
}

function Grafica(valores){
	Highcharts.chart('grafica', {
	    chart: {
	        type: 'line'
	    },
	    title: {
	        text: 'GRAFICA DE VALORES'
	    },
	    yAxis: {
	        title: {
	            text: 'Valor del Sensor'
	        }
	    },
	    plotOptions: {
	        line: {
	            dataLabels: {
	                enabled: true
	            },
	            enableMouseTracking: false
	        }
	    },
	    series: valores
	});
}

$('#nuevo_dispositivo').submit(function(){
	$('#loading').fadeIn(150);
	$.ajax({
		url: 'php/nuevo_dispositivo.php',
		dataType: 'json',
		data:{
			dispositivo : document.getElementById('dispositivo').value
		},
		type: "POST",
		async: false,
		success: function(datos) {
			console.log(datos);
			Dispositivos();
			Obtener_Datos();
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
	$('#loading').fadeOut(350);
	return false;
})