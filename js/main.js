function Login(){
	var usuario = document.getElementById('usuario').value; // obtiene el nombre de usuario en la pantalla de login
	var pass = document.getElementById('pass').value; // obtiene la clave en la pantalla de login 

	if ((usuario!='')&&(pass!='')){ // confirma que se ingresen valores y no campos en blanco
		if ((usuario=='admin')&&(pass=='1234')){ // confirma el nombre de usuario y clave para entrar al sistema
			Crear_Inicio(); // Llama a la funcion 
		}else{ // caso contrario
			alert("El usuario o contrasena son incorrectos."); // muestra mensaje de error de usuario y contrasena
		}
	}else{ // caso contrario
		alert("Debe especificar los dos campos obligatoriamente."); // muesta mensaje de que deben ingresar los dos campos.
	}
}


function Crear_Inicio(){
	// funcion ajax
	$.ajax({
		url: 'php/login.php', // nombre del archivo a llamar
		dataType: 'json', // tipo de datos que va a devolver la llamada ajax
		async: false, // no asincrona, es decir, espera a que se ejecute y devuelva algo para seguir con la programacion
		success: function(datos) { // en caso de no tener errores
			if (!datos['estado']){ // confirma que el estado sea true o verdadero
				// si es false
				alert("Error al crear el inicio de sesion."); // enviar mensaje de error
				console.log(datos['error']); // escribe en consola el error
			}else{ // caso contrario, es verdadero
				window.location.href = 'index.html'; // dirige a la pagina index.html 
			}
		},
		error:function(e){ // en caso de error
			console.log(e.responseText); // escribe en consola el error
		}
	});
}

function Verifica_Inicio(){ 
	// esta funcion se ejecuta al principio para verificar si ya existe una sesion
	$.ajax({
		url: 'php/logueado.php',
		dataType: 'json',
		async: false,
		success: function(datos) {
			if (!datos['estado']){
				// en caso de no existir una sesion o que haya caducado, redirige a la pagina de inicio de sesion
				window.location.href = 'login.html';
			}else{ // caso contrario
				$('#loading').fadeOut(550); // desaparece el icono de cargando
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
}

function Dispositivos(){
	// funcion que obtiene desde la abse de datos todos los nodos que se hayan ingresado al sistema
	$.ajax({
		url: 'php/obtener_dispositivos.php',
		dataType: 'json',
		async: false,
		success: function(datos) {			
			if (datos['estado']){
				// obtiene cada uno de los nodos desde la base de datos
				var lista = '';
				$('#dispositivos_seleccion').html(''); // limpia la lista de seleccion
				$('#listado_dispositivos').html(''); // limpia la tabla de nodos
				datos['dispositivos'].forEach( function(element, index) { // lista cada uno de los nodos encontrados
					//console.log(element);
					var item = '<option value="'+element['id_dispositivo']+'">'+element['dispositivo']+'</option>';					
					lista += '<tr>';
					lista += '<td>'+element['dispositivo']+' (id='+element['id_dispositivo']+')</td>';
					lista += '<td width="5%"><a href="#" onclick="Eliminar_Dispositivo('+element['id_dispositivo']+'); return false;">Eliminar</a></td>';
					lista += '</tr>';
					$('#dispositivos_seleccion').append(item); // agrega a la lista de seleccion
				});
				$('#listado_dispositivos').html(lista); // agrega a la tabla de nodos
			}
		},
		error:function(e){
			console.log(e.responseText);
		}
	});	
	$('#loading').fadeOut(550);
}

function Eliminar_Dispositivo(id){
	// funcion para eliminar un nodo seleccionado en la tabla
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

	// funcion que obtiene los valores de sensores segun el nodo seleccionado en la lista
	$.ajax({
		url: 'php/obtener_datos.php',
		dataType: 'json',
		data: {
			id_dispositivo: document.getElementById('dispositivos_seleccion').value,
			fecha_inicio: document.getElementById('fecha_inicio').value,
			fecha_final: document.getElementById('fecha_final').value,
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
				        name: 'Metano',
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
	    xAxis: {
	        title: {
	            text: 'Datos'
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

function Fecha(){
	// funcion para obtener fecha para los campos inicio y final
	var f = new Date();
	var anio = f.getFullYear();
	var mes = ('0' + (f.getMonth()+1)).slice(-2);
	var dia = ('0' + f.getDate()).slice(-2);
	var fecha = anio+"-"+mes+"-"+dia;

	return fecha;
}