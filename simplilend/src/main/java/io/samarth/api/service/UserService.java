package io.samarth.api.service;

import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.samarth.api.db.entity.LoanDetails;
import io.samarth.api.db.entity.Login;
import io.samarth.api.db.entity.User;
import io.samarth.api.db.repository.LoanDetailsRepository;
import io.samarth.api.db.repository.LoginRepository;
import io.samarth.api.db.repository.UserRepository;
import io.samarth.api.model.ApplyLoanResponse;
import io.samarth.api.model.GetLoanDetailsResponse;
import io.samarth.api.model.GetUserRequest;
import io.samarth.api.model.NewLoanRequest;
import io.samarth.api.model.NewUserRequest;
import io.samarth.api.model.UserDetailsResponse;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private LoginRepository loginRepository;
	
	@Autowired
	private LoanDetailsRepository loanDetailsRepository;
	
	public void createUser(NewUserRequest request) {
		
		try {
			String generatedSecuredPasswordHash = generateStorngPasswordHash(request.getPassword());
			Login login =new Login();
			User user = new User();
			
			Login IfPresentEntity = loginRepository.findOne(request.getEmail());
			System.out.println(IfPresentEntity);
			if(IfPresentEntity==null) {
				login.setEmail(request.getEmail());
				login.setPassword(generatedSecuredPasswordHash);
				//login.setPassword(request.getPassword());
				System.out.println(login.toString());
				loginRepository.save(login);
				
				user.setEmail(request.getEmail());
				user.setMobile(request.getMobile());
				user.setName(request.getName());
				userRepository.save(user);
			} else {
				
				System.out.println("user already exist");
			}
			
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	public UserDetailsResponse getUser(GetUserRequest request) {
		
		UserDetailsResponse response= new UserDetailsResponse();
		Login login = loginRepository.findOne(request.getEmail());
		boolean matched=false;
		try {
			matched = validatePassword(request.getPassword() , login.getPassword());
			if(matched) {
				User user = userRepository.findOne(login.getEmail());
				response.setEmail(user.getEmail());
				response.setMobile(user.getMobile());
				response.setName(user.getName());
				response.setStatusCode(200);
			}
			else {
				response.setStatusCode(404);
			}
		} catch (NoSuchAlgorithmException e) {
			response.setStatusCode(400);		
		} catch (InvalidKeySpecException e) {
			response.setStatusCode(400);
		} catch (Exception e) {
			response.setStatusCode(400);
		}
		
		return response;
	}
	
	public ApplyLoanResponse applyLoan(NewLoanRequest request) {
		
		ApplyLoanResponse response = new ApplyLoanResponse();
		LoanDetails loanDetails = loanDetailsRepository.findOne(request.getEmail());
		if(loanDetails == null) {
			loanDetails = new LoanDetails();
		
			loanDetails.setAmount(request.getAmount());
			loanDetails.setCity(request.getCity());
			loanDetails.setEmail(request.getEmail());
			loanDetails.setPincode(request.getPincode());
			loanDetails.setPurpose(request.getPurpose());
			loanDetails.setResidence(request.getResidence());
			loanDetails.setState(request.getState());
			loanDetails.setStreetName(request.getStreetName());
			loanDetails.setTenureMonth(request.getTenureMonth());
			loanDetails.setTenureYear(request.getTenureYear());
			
			loanDetailsRepository.save(loanDetails);
			response.setStatusCode(200);
			response.setData("Successfully Created");
		} else {
			response.setStatusCode(403);
			response.setData("Loan Already Applied");
		}
		return response;
	}
	
	public GetLoanDetailsResponse getLoanDetails(String id) {
		
		GetLoanDetailsResponse response = new GetLoanDetailsResponse();
		LoanDetails loanDetails =loanDetailsRepository.findOne(id);
		if(loanDetails !=null) {
			response.setAmount(loanDetails.getAmount());
			response.setCity(loanDetails.getCity());
			response.setEmail(loanDetails.getEmail());
			response.setPincode(loanDetails.getPincode());
			response.setPurpose(loanDetails.getPurpose());
			response.setResidence(loanDetails.getResidence());
			response.setState(loanDetails.getState());
			response.setStreetName(loanDetails.getStreetName());
			response.setTenureMonth(loanDetails.getTenureMonth());
			response.setTenureYear(loanDetails.getTenureYear());
			response.setStatusCode(200);
		}
		else
			response.setStatusCode(404);
		
		return response;
		
		
	}
	
	
	private static boolean validatePassword(String originalPassword, String storedPassword) throws NoSuchAlgorithmException, InvalidKeySpecException
	{
		String[] parts = storedPassword.split(":");
		int iterations = Integer.parseInt(parts[0]);
		byte[] salt = fromHex(parts[1]);
		byte[] hash = fromHex(parts[2]);

		PBEKeySpec spec = new PBEKeySpec(originalPassword.toCharArray(), salt, iterations, hash.length * 8);
		SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
		byte[] testHash = skf.generateSecret(spec).getEncoded();

		int diff = hash.length ^ testHash.length;
		for(int i = 0; i < hash.length && i < testHash.length; i++)
		{
			diff |= hash[i] ^ testHash[i];
		}
		return diff == 0;
	}
	private static byte[] fromHex(String hex) throws NoSuchAlgorithmException
	{
		byte[] bytes = new byte[hex.length() / 2];
		for(int i = 0; i<bytes.length ;i++)
		{
			bytes[i] = (byte)Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
		}
		return bytes;
	}
	private static String generateStorngPasswordHash(String password) throws NoSuchAlgorithmException, InvalidKeySpecException
	{
		int iterations = 20*1000;
		char[] chars = password.toCharArray();
		byte[] salt = getSalt();

		PBEKeySpec spec = new PBEKeySpec(chars, salt, iterations, 64 * 8);
		SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
		byte[] hash = skf.generateSecret(spec).getEncoded();
		return iterations + ":" + toHex(salt) + ":" + toHex(hash);
	}
	private static byte[] getSalt() throws NoSuchAlgorithmException
	{
		SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
		byte[] salt = new byte[16];
		sr.nextBytes(salt);
		return salt;
	}

	private static String toHex(byte[] array) throws NoSuchAlgorithmException
	{
		BigInteger bi = new BigInteger(1, array);
		String hex = bi.toString(16);
		int paddingLength = (array.length * 2) - hex.length();
		if(paddingLength > 0)
		{
			return String.format("%0"  +paddingLength + "d", 0) + hex;
		}else{
			return hex;
		}
	}
	
	
	
}
