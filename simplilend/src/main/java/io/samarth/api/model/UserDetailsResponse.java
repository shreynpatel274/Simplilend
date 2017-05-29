package io.samarth.api.model;

public class UserDetailsResponse {

	private String email;
	
	private long mobile;
	
	private String Name;
	
	private int statusCode;
	

	
	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public long getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getMobile() {
		return mobile;
	}

	public void setMobile(long mobile) {
		this.mobile = mobile;
	}

	@Override
	public String toString() {
		return "UserDetailsResponse [email=" + email + ", mobile=" + mobile + "]";
	}
	
	
}
