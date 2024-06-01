<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST")
{
    die('Nothing to see here.');
}

function sanitize_string($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$form_fields = array(
    'name'      => sanitize_string($_POST["name"]),
    'email'     => filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL),
    'message'   => sanitize_string($_POST["message"]),
);
$valid_email = filter_var($form_fields['email'], FILTER_VALIDATE_EMAIL);
$errors = array();

// Check for errors
foreach($form_fields as $field => $value)
{
    if ( empty($value) )
    {
        $errors['empty'][] = $field;
    }
}

if ( ! $valid_email )
{
    $errors['invalidEmail'] = true;
}

if (strlen($message) > 1000)
{
    $errors['lengthExceeded'] = true;
}

// Return errors if any
if ( ! empty($errors) )
{
    header("Content-Type: application/json");
    echo json_encode($errors);
    exit;
}

// Send email
$my_email = "contato@filduarte.com.br";
$subject = "Contato pelo site";
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: Fil Duarte <" . $my_email . ">\r\n";
$headers .= "Reply-To: " . $valid_email . "\r\n";

$message_html = "<html>\n<body>\n";
$message_html .= "<p><strong>Nome:</strong> " . $form_fields['name'] . "</p>\n";
$message_html .= "<p><strong>Email:</strong> " . $valid_email . "</p>\n";
$message_html .= "<p><strong>Mensagem:</strong><br>" . nl2br($form_fields['message']) . "</p>\n";
$message_html .= "</body>\n</html>";

if (mail($my_email, $subject, $message_html, $headers)) {
    $response = array("success" => true);
} else {
    $response = array("fail" => true);
}

// Return success or fail
header("Content-Type: application/json");
echo json_encode($response);

?>