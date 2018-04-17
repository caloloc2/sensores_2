function tipografia(doc, fuente, size, estilo){
	// courier, times o helvetica
	// normal, italic o bold
	doc.setFont(fuente);
	doc.setFontSize(size);
	doc.setFontType(estilo);
}

function Impresion(){
	$.ajax({
      url: 'php/obtener_datos.php',
      data: {
      	id_dispositivo : document.getElementById('dispositivos_seleccion').value,
      	fecha_inicio: document.getElementById('fecha_inicio').value,
		fecha_final: document.getElementById('fecha_final').value,
      },
      type: "POST",
      dataType: 'json',
      success: function(datos) {
        if (datos['estado']){
        	
        	var doc = new jsPDF();
			var y = 25;

			tipografia(doc, 'helvetica', 20, 'bold');
			doc.setTextColor(0, 0, 0);
			doc.text(25, y, 'REPORTE SENSORES');
			y+=10;

			tipografia(doc, 'helvetica', 8, 'bold');	
			doc.text(25, y, 'FECHA');
			doc.text(45, y, 'HORA');
			doc.text(63, y, 'CO2');
			doc.text(75, y, 'HUMO');
			doc.text(90, y, 'ALCOHOL');
			doc.text(107, y, 'TEMP');
			doc.text(120, y, 'HUMEDAD');
			doc.text(138, y, 'LATITUD');
			doc.text(155, y, 'LONGITUD');
			y+=5;
			
			tipografia(doc, 'helvetica', 8, 'normal');
			if (datos['datos'].length>0){
				for (x=0; x<datos['datos'].length>0; x++){
					doc.text(25, y, String(datos['datos'][x]['fecha']));
					doc.text(45, y, String(datos['datos'][x]['hora']));
					doc.text(63, y, String(datos['datos'][x]['co2']));
					doc.text(75, y, String(datos['datos'][x]['humo']));
					doc.text(90, y, String(datos['datos'][x]['alcohol']));
					doc.text(107, y, String(datos['datos'][x]['temperatura']));
					doc.text(120, y, String(datos['datos'][x]['humedad']));
					doc.text(138, y, String(datos['datos'][x]['latitud']));
					doc.text(155, y, String(datos['datos'][x]['longitud']));
					
					if (y>275){
						doc.addPage();
						y= 25;
					}else{
						y+= 4;
					}
				}
			}
			
			doc.save('REPORTE.pdf');						     
        }else{
        	console.log(datos['error']);
        }
      },
      error:function(e){
        console.log(e.responseText);
      }
    });			
}