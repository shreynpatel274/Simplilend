package io.samarth.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.samarth.api.db.entity.Login;
import io.samarth.api.db.repository.LoginRepository;
import io.samarth.api.db.repository.UserRepository;
import io.samarth.api.model.ApplyLoanResponse;
import io.samarth.api.model.GetLoanDetailsResponse;
import io.samarth.api.model.GetUserRequest;
import io.samarth.api.model.NewLoanRequest;
import io.samarth.api.model.NewUserRequest;
import io.samarth.api.model.UserDetailsResponse;
import io.samarth.api.service.UserService;

@CrossOrigin(allowedHeaders="*",allowCredentials="true")
@RestController
public class UserController {
		
	@Autowired
	UserService userService;
	
	@RequestMapping(value="Dev/createuser", method=RequestMethod.POST, consumes="application/json")
	public void createUser(@RequestBody NewUserRequest request){	
		System.out.println(request.toString());
		userService.createUser(request);
	}
	
	@RequestMapping(value="Dev/auth", method=RequestMethod.POST, consumes="application/json")
	public UserDetailsResponse getUser(@RequestBody GetUserRequest request){	
		System.out.println(request.toString());
		return userService.getUser(request);
	}
	
	@RequestMapping(value="Dev/loan", method=RequestMethod.POST, consumes="application/json")
	public ApplyLoanResponse applyLoan(@RequestBody NewLoanRequest request){	
		System.out.println(request.toString());
		return userService.applyLoan(request);
	}
	
	@RequestMapping(value="Dev/loan", method=RequestMethod.GET, consumes="application/json", produces="application/json")
	@ResponseBody
	public GetLoanDetailsResponse applyLoan(@RequestParam(value="id",required=false) String id){	
		System.out.println(id);
		return userService.getLoanDetails(id);
	}
	
}
