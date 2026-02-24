<?php

    require_once('Conexion.php');

    $con = new Conexion();

    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        if(isset($_GET['id'])){
            $id = intval($_GET['id']);
            try{    
                $sql = "DELETE FROM tapas WHERE id_tapa = '$id'";
                $result = $con->query($sql);
                if($result){
                    header("HTTP/1.1 200 Ok");
                    echo json_encode($id);
                    exit;
                }
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 400 Bad Request");
                exit;
            }
        }
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

?>