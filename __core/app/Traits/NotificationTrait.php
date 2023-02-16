<?php

namespace App\Traits;
use Illuminate\Http\Request;
use DB, Mail;

trait NotificationTrait {

    public function sendEmail($emailData){        
        try {
            Mail::send($emailData['template'], $emailData['data'], function ($message) use ($emailData) {
                $message->to($emailData['email'], $emailData['name']);
                
                if (isset($emailData['ccEmail']) && !empty($emailData['ccEmail'])) {
                    $message->cc($emailData['ccEmail']);
                }
                
                if (isset($emailData['allBcc']) && !empty($emailData['allBcc']) && count($emailData['allBcc']) > 0) {
                    foreach ($emailData['allBcc'] as $bccEmail) {
                        $message->bcc($bccEmail);
                    }
                }
                if (isset($emailData['attachments']) && !empty($emailData['attachments']) && count($emailData['attachments']) > 0) {
                    foreach ($emailData['attachments'] as $filePath) {
                        if(file_exists(storage_path($filePath))){
                            $message->attach(storage_path($filePath));
                        }
                    }
                 }
                $message->from($emailData['from_email']);
                $message->subject($emailData['subject']);
            });
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

}

