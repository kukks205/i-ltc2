<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


include 'includes/conf.audit.php';
include 'includes/DBConn2.php';


$postData = json_decode(file_get_contents("php://input"));


$token = $postData->token;


 // $user = 'kukks';
 // $pass = '112233445';


$sql ="select l.user_id,l.username,l.token,l.level_userid,l.hospcode,l.create_at,l.expire 
from i_ltc_session as l
where token='$token'";

$stm =  $db2->prepare($sql);

$stm->execute();

$count = $stm->rowCount();


if($count>0):


$obj = $stm->fetchAll(PDO::FETCH_ASSOC);
$json_data = [];

array_push($json_data,['status'=>'Success']);

foreach ($obj as $k) {
    array_push($json_data, $k);
}

$txt = json_encode($json_data);

print_r($txt);

else:

	$json_data = [];

array_push($json_data,['status'=>'Fail']);
$txt = json_encode($json_data);

print_r($txt);

endif;

?>