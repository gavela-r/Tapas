<?php

    // require_once('../vendor/autoload.php');
    require_once("Conexion.php");

    $con = new Conexion();

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $datos = json_decode(file_get_contents('php://input'), true);
        
        if($datos["nombre"] != null){

            try{
                try {
                    $nombre = $datos["nombre"];
                    $sql2 = "SELECT id_cliente FROM clientes WHERE nombre_usuario = '$nombre'";
                    $resultId = $con->query($sql2);
                    if($resultId->num_rows > 0){
                        $id_cliente = $resultId->fetch_assoc();
                        $id_cliente = $id_cliente['id_cliente'];
                    }
                } catch (mysqli_sql_exception $e) {
                    header("HTTP/1.1 400 Bad Request");
                }

                if(!isset($datos['enviar'])){
                    $sql = "SELECT t.id_tapa, b.nombre AS nombre_bar, t.nombre AS nombre_tapa , t.descripcion, t.ingredientes, t.id_tapa, b.direccion, b.telefono, b.latitud, .b.longitud, b.hora_apertura, b.hora_cierre, t.foto FROM tapas t JOIN bares b ON b.id_bar = t.bar"; 
                    $result = $con->query($sql);
                }else{
                    $sql = "SELECT t.id_tapa, b.nombre AS nombre_bar, t.nombre AS nombre_tapa , t.descripcion, t.ingredientes, t.id_tapa, b.direccion, b.telefono, b.latitud, .b.longitud, b.hora_apertura, b.hora_cierre, t.foto FROM tapas t JOIN bares b ON b.id_bar = t.bar JOIN favoritos f ON f.id_cliente = '$id_cliente' WHERE f.id_tapa = t.id_tapa "; 
                    $result = $con->query($sql);
                }
                
                if($result->num_rows > 0){
                    $tapas = array();
                    while($row = $result->fetch_assoc()){
                        $tapas[] = $row;
                    }
                    try{
                        $sql3 = "SELECT id_tapa AS favoritos FROM favoritos WHERE id_cliente = '$id_cliente'";
                        $resultado = $con->query($sql3);
                        if($resultado->num_rows > 0){
                            while($row = $resultado->fetch_assoc()){
                                $favoritos[] = $row;
                            }
                            $tapas[] = $favoritos;
                        }
                    }catch(mysqli_sql_exception $e){
                        header("HTTP/1.1 400 Bad Request");
                    }
                }else{
                    $tapas = '';
                }
                header("HTTP/1.1 200 OK");
                echo json_encode($tapas);
                
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 400 Bad Request");
                exit;
            }
        }else{
            try{
                $sql = "SELECT t.id_tapa, b.nombre AS nombre_bar, t.nombre AS nombre_tapa , t.descripcion, t.ingredientes, t.id_tapa, b.direccion, b.telefono, b.latitud, b.longitud, b.hora_apertura, b.hora_cierre, t.foto FROM tapas t JOIN bares b ON b.id_bar = t.bar"; 
                        
                $result = $con->query($sql);
                
                if($result->num_rows > 0){
                    $tapas = array();
                    while($row = $result->fetch_assoc()){
                        $tapas[] = $row;
                    }
                    header("HTTP/1.1 200 OK");
                    echo json_encode($tapas);
                }
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 400 Bad Request");
            }
        }
    }

?>