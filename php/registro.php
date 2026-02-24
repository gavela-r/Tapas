<?php
    require_once('Conexion.php');
    $con = new Conexion();


    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $datos = json_decode(file_get_contents('php://input'), true);

        if($datos != null){
            $nombre = $datos['nombre'];
            $correo = $datos['correo'];
            $pass = $datos['pass'];

            try{
                $sql = "SELECT nombre_usuario FROM clientes WHERE nombre_usuario = '$nombre'";
                $result = $con->query($sql);
                $usuario_existe = $result->fetch_all(MYSQLI_ASSOC);
                if(!empty($usuario_existe)){
                    header("HTTP/1.1 402 User already exist");
                    exit;
                }
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 500 interval Server Error ");
                
            }

            try{
                $pass_has = password_hash($pass, PASSWORD_BCRYPT);
                $sql2 = "INSERT INTO clientes (nombre_usuario, contrasena, tipo, email) VALUES ('$nombre', '$pass_has', 'user', '$correo')";
                $con->query($sql2);
                if($con->affected_rows > 0){
                    header("Content-type:Application/json");
                    header("HTTP/1.1 201 Created");
                    echo json_encode(["id" => $con->insert_id]);
                }
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 500 Interval Server Error ");
                exit;
            }
        }else{
            header("HTTP/1.1 400 Bad Request");
            exit;
        }
    }

?>