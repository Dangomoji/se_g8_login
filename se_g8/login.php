<?php
include 'db_connection.php';

$json = file_get_contents('php://input');


$data = json_decode($json, true);

if(isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    $sql = "SELECT * FROM nurse WHERE usename = '$username' AND password = '$password'";
    $result = mysqli_query($conn, $sql);

    if($result && mysqli_num_rows($result) > 0) {
        $response = array("success" => true, "message" => "Login successful");
        echo json_encode($response);
    } else {
        $response = array("success" => false, "message" => "Invalid username or password");
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "message" => "Username or password not provided");
    echo json_encode($response);
}

mysqli_close($conn);
?>
