<?php
include 'db_connection.php';
$sql = "SELECT usename, password FROM nurse";
$result = mysqli_query($conn, $sql);
if ($result) {
    $nurses = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $nurses[] = array(
            'username' => $row['usename'],
            'password' => $row['password']
        );
    }

    mysqli_free_result($result);


    mysqli_close($conn);

    header('Content-Type: application/json');
    echo json_encode($nurses);
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>