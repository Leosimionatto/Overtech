<?php
class Queries{
  private $sql;

  function select($fields="*",$table,$condition=1){
    if(isset($condition)){
      $sql = "SELECT $fields FROM $table WHERE $condition";
    }else{
      $sql = "SELECT $fields FROM $table";
    }
    return $sql;
  }
  function insert($table_fields,$insert_values,$table){
    $sql = "INSERT INTO $table $table_fields VALUES $insert_values";
    return $sql;
  }
  function update($fields,$table,$condition=1){
    $sql = "UPDATE $table SET $fields WHERE $condition";
    return $sql;
  }
  function delete($table,$condition){
    $sql = "DELETE FROM $table WHERE $condition";
    return $sql;
  }
  function register_count($table,$condition=1){
    $sql = "SELECT COUNT(*) FROM $table WHERE $condition";
    return $sql;
  }
}



?>
