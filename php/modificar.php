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
            $id = $datos['id_tapa'];
            $tiempo = time();
            $uploadDir = '../fotosUsuario/'; 
            $uploadPath = $uploadDir . basename($tiempo.$imagen['name']);
            $loadDir = './fotosUsuario/' . basename($tiempo.$imagen['name']);

            

            try{
                $sql = "SELECT bar FROM tapas WHERE id_tapa = '$id'";
                $result = $con->query($sql);
                if($result->num_rows > 0){
                    $row = $result->fetch_assoc();
                    $id_bar = $row['bar'];
                }
                
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 400 BAd Request");
                exit;
            }
            
            try{
                $sql2 = "UPDATE bares SET nombre = '$nombreBar', direccion = '$direccion', telefono = '$telefono', latitud = '$latitud', longitud = '$longitud', hora_apertura = '$hora_apertura', hora_cierre = '$hora_cierre' WHERE id_bar = '$id_bar'";
                $result = $con->query($sql2);
                header("HTTP/1.1 200 Ok");
                header("Content-Type: application/json");
                
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 400 Bad request");
                exit;
            }

            try{
                
                $sql3 = "UPDATE tapas SET nombre = '$nombreTapa', descripcion = '$descripcion', ingredientes = '$ingredientes', bar = '$id_bar', foto = '$loadDir' WHERE id_tapa = '$id'";
                $result = $con->query($sql3);
                if(move_uploaded_file($imagen['tmp_name'], $uploadPath)){
                    header("HTTP/1.1 200 Ok");
                    header("ContenT-Type: application/json");
                    exit;
                }
                
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 400 bad Request");
                exit;
            }
        }
    }

?>