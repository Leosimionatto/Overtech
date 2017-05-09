<?php
include_once("../classes/user.php");

// Set values
$fields = " id,name,course,age,email,creation_date,last_login ";

// Instance User class
$user = new User();
$user -> find_all_users($fields);

?>
