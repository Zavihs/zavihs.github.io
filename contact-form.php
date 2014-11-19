<?php
require_once 'phpmailer/PHPMailerAutoload.php'


if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['message'])) {

    //check if any of the inputs are empty
    if (empty($_POST['username']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['message'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->From = $_POST['email'];
    $mail->FromName = $_POST['username'];
    $mail->AddAddress('test@gmail.com'); //recipient 
    $mail->Subject = $_POST['phone'];
    $mail->Body = "Name: " . $_POST['username'] . "\r\n\r\nMessage: " . stripslashes($_POST['message']);

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}