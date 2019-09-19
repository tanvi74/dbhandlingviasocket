<?php
$Name = $_POST['Name'];
$phone_no = $_POST['phone_no'];

if(!empty($name) || !empty($Phone))
{
    $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "toor";
    $dbname = "customer"

    //creating connection

    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

    if(mysqli_connect_error()){
        die('Connect Error('.mysqli_connect_errno().')'.mysqli_connect_error());
    }

    else
    {
        $SELECT = "SELECT email From contact_info Where email = ? Limit 1";
        $INSERT = "INSERT Into contact_info(Name, phone_no) values(?,?)";

        //Prepare statement

        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($phone_no);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        if($rnum == 0)
        {
            $stmt->close();
            $stmt = $conn->prepare($INSERT);
            $stmt->bindparam("si",$Name, $phone_no);
            $stmt->execute();
            echo "New Record Inserted Successfully";
        } 
        else
        {
            echo "Someone already registered with this phone no.";
        }
        $stmt->close();
        $stmt->close();
   }
}
else
{
    echo "All fields are required";
    die();
}
?>