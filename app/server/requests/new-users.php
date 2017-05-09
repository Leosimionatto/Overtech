<?php
// Import user class
include_once("../classes/user.php");

// Set condition and params
$fields    = "`id`,`name`,`course`,`semester`,`creation_date`";
$condition = "`creation_date` > DATE_SUB(NOW(), INTERVAL 1 WEEK)";

$user = new User();
$user->find_all_users($fields,$condition);

?>
