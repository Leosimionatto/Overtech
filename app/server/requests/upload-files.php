<?php
// Import Upload Class
include_once("../classes/upload.php");

// Set database configurations
$table_fields = "(`id_user`,`id_category`,`name`,`matter`,`type`,`path`,`creation_date`)";
$insert_fields = "(:id_user,:id_category,:name,:matter,:type,:path,:creation_date)";

if(isset($_FILES["file"]) AND isset($_POST["matter"]) AND isset($_POST["id_user"]) AND isset($_POST["id_category"])){
  $_UP['pasta'] = '../../uploads/';
  $_UP['tamanho'] = 1024 * 1024 * 4; // 4Mb
  $_UP['extensoes'] = array('pdf', 'docx', 'pptx');

  $_UP['erros'][0] = 'Não houve erro';
  $_UP['erros'][1] = 'O arquivo no upload é maior do que o limite do PHP';
  $_UP['erros'][2] = 'O arquivo ultrapassa o limite de tamanho especifiado no HTML';
  $_UP['erros'][3] = 'O upload do arquivo foi feito parcialmente';
  $_UP['erros'][4] = 'Não foi feito o upload do arquivo';

  if($_FILES['file']['error'] != 0){
    echo "Não foi possível fazer o upload, erro: " . $_UP['erros'][$_FILES['file']['error']];
    exit;
  }

  $extensao = strtolower(end(explode('.', $_FILES['file']['name'])));

  if(array_search($extensao, $_UP['extensoes']) === false){
    echo "Por favor, envie arquivos com as seguintes extensões: docx, pdf ou pptx";
    exit;
  }
  if($_UP['tamanho'] < $_FILES['file']['size']){
    echo "O arquivo enviado é muito grande, envie arquivos de até 4Mb.";
    exit;
  }
  $file_name = preg_replace( '/[`^~\'"]/', null, iconv( 'UTF-8', 'ASCII//TRANSLIT', $_FILES['file']["name"] ));

  if(move_uploaded_file($_FILES['file']['tmp_name'], $_UP['pasta'] . $extensao . "/" . $_POST["id_user"] . "-" . $file_name)){
    $path = "uploads/" . $extensao . "/" . $_POST["id_user"] . "-" . $file_name;

    $params = array(
      "id_user"      => $_POST["id_user"],
      "id_category"  => $_POST["id_category"],
      "matter"       => $_POST["matter"],
      "type"         => $extensao,
      "file-name"    => $_POST["id_user"] . "-" . $file_name,
      "file-path"    => $path,
      "creation_date" => date('Y-m-d')
    );
    $upload = new Upload();
    $insert = $upload->upload_file($table_fields,$insert_fields,$params);
    echo json_encode($insert);
  }else{
    echo "Não foi possível enviar o arquivo, tente novamente";
  }
}else{
  echo "Parâmetros inválidos!Confira eles e tente novamente";
}

?>
