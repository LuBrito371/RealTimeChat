package com.chat.realtime;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.chat.realtime.config.Message;

@Controller
public class App {

    @MessageMapping("/chatMessage")
    @SendTo("/chat")
    public Message sendMessage(Message message){
        return message;
    }
}
