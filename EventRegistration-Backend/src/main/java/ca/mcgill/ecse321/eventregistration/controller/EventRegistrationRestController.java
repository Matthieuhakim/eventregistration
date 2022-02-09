package ca.mcgill.ecse321.eventregistration.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import ca.mcgill.ecse321.eventregistration.service.EventRegistrationService;



@CrossOrigin(origins = "*")
@RestController
public class EventRegistrationRestController {

    @Autowired
    private EventRegistrationService service;
    
   

}