<?php
// Import classes
include_once("../classes/courses.php");

// Instance class
$courses = new Courses();
$result = $courses -> select_all_courses();
?>
