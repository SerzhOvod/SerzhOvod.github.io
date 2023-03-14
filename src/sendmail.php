<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('en', 'phpmailer/language/');
$mail->IsHTML(true);

/*
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'user@example.com';                     //SMTP username
	$mail->Password   = 'secret';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 
	*/

//Від кого лист
$mail->setFrom($_POST['email'], 'New customer'); // Вказати потрібний E-mail
//Кому відправити
$mail->addAddress('dynasty.renovat@gmail.com'); // Вказати потрібний E-mail
//Тема листа
$mail->Subject = 'Customer\'s request';

//Тіло листа
$body = '<h1>Hello! I need your help.</h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Name:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
    $body .= '<p><strong>Phone:</strong> ' . $phone . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['service']))) {
    $body .= '<p><strong>Service:</strong> ' . $_POST['service'] . '</p>';
}

if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong>Message:</strong> ' . $_POST['message'] . '</p>';
}

/*
		//Прикрепить файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//путь загрузки файла
		$filePath = __DIR__ . "/files/" . $_FILES['image']['name']; 
		//грузим файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото в приложении</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	*/

$mail->Body = $body;

//Відправляємо
if (!$mail->send()) {
    $message = 'Something wrong';
} else {
    $message =
        'Your request is send successfully! We will send you back a response as soon as we can.';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
