<?php


    require_once('Conexion.php');
    require_once('../vendor/autoload.php');
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    $con = new Conexion();

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $datos = json_decode(file_get_contents('php://input'), true);

        if($datos != null){
            $nombre = $datos['user'];
            $pass = $datos['contraseña'];

            try{
                $sql = "SELECT * FROM clientes WHERE nombre_usuario = '$nombre'";
                $result = $con->query($sql);
                $usuario = $result->fetch_assoc();
        
                if($usuario && password_verify($pass, $usuario['contrasena'])){
                    $key = 'claveSecreta';
                    $alg = 'HS512';
                    $payload = [
                        'nombre' => $nombre,
                        'rol' => $usuario['tipo'],
                        'iat' => time(),
                        'exp' => time() + 3600,
                    ];

                    $jwt = JWT::encode($payload, $key, $alg);
                    $respuesta = [
                        'nombre' => $nombre,
                        'rol' => $usuario['tipo'],
                        'token' => $jwt,
                    ];
                    echo json_encode($respuesta);
                    header("HTTP/1.1 200 Ok");
                    header("Content-Type: Application/json");
                    exit;
                }else{
                    header("HTTP/1.1 401 Unauthorized");
                    exit;
                }
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 500 Interval Server Error");
                exit;
            }
        }
        header("http/1.1 400 Bad Request");
        exit;
    }


?>