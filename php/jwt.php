<?php

    require_once('../vendor/autoload.php');
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
        $datos = json_decode(file_get_contents('php://input'),true);

        if (isset($datos['token'])){ 
            $jwt = $datos['token']; 
            $secret = "claveSecreta"; 
            $alg = "HS512"; 
            try {    
                $payload = JWT::decode($jwt, new Key($secret, $alg));    
                if ($payload->rol === $datos['tipo'] && $payload->nombre === $datos['nombre']) {       
                    header("HTTP/1.1 200 ok");
                } else {       
                    header("HTTP/1.1 401 Unauthorized");        
                }     
            } catch (Exception $e) {   
                 header("HTTP/1.1 401 Unauthorized"); 
                }     
        } else {       
                header("HTTP/1.1 401 Unauthorized");        
        }    
            exit; 
        } 
?>