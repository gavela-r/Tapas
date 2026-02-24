<?php

    require_once('Conexion.php');

    $con = new Conexion();

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $datos = $_REQUEST;
        $imagen = $_FILES['foto'];

        
        if($datos != null){
            $nombreBar = $datos['nombreBar'];
            $nombreTapa = $datos['nombreTapa'];
            $descripcion = $datos['descripcion'];
            $direccion = $datos['direccion'];
            $telefono = $datos['telefono'];
            $latitud = $datos['latitud'];
            $longitud = $datos['longitud'];
            $hora_apertura = $datos['hora_apertura'];
            $hora_cierre = $datos['hora_cierre'];
            $ingredientes = $datos['ingredientes'];
            $tiempo = time();
            $uploadDir = '../fotosUsuario/'; 
            $uploadPath = $uploadDir . basename($tiempo.$imagen['name']);
            $loadDir = './fotosUsuario/' . basename($tiempo.$imagen['name']);

            try{
                $sql = "SELECT id_bar FROM bares WHERE nombre = '$nombreBar'";
                $resultado = $con->query($sql);
        
                if($resultado->num_rows > 0){
                    $row = $resultado->fetch_assoc();
                    $idBar = $row['id_bar'];
                }else{
                    $sqlInsertar = "INSERT INTO bares (nombre, direccion, telefono, latitud, longitud, hora_apertura, hora_cierre) VALUES ('$nombreBar', '$direccion', '$telefono', '$latitud', '$longitud', '$hora_apertura', '$hora_cierre')";
                    $result = $con->query($sqlInsertar);
                    $idBar = $con->insert_id;
                    header("HTTP/1.1 201 Created");
                    header("Content-type:Application/json");
                    echo json_encode($id);
                }
                
                
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 400 Bad Request");
                exit;
            }
        }
        try{

            $sqlTapa = "INSERT INTO tapas (nombre, descripcion, ingredientes, bar, foto) VALUES ('$nombreTapa', '$descripcion', '$ingredientes', '$idBar', '$loadDir')";
            $result2 = $con->query($sqlTapa);
            $id_tapa = $con->insert_id;
            if(move_uploaded_file($imagen['tmp_name'], $uploadPath)){
                header("HTTP/1.1 201 Created");
                header("Content-type:Application/json");
            }
           
        }catch(mysqli_sql_exception $e){
            header("HTTP/1.1 400 Bad Request");
            exit;
        }

    }

?>