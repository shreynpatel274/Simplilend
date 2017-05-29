package io.samarth.api.model;

public class NewUserRequest {

	private String name;
	
	private String email;
	
	private String password;
	
	private int mobile;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getMobile() {
		return mobile;
	}

	public void setMobile(int mobile) {
		this.mobile = mobile;
	}

	@Override
	public String toString() {
		return "NewUserRequest [name=" + name + ", email=" + email + ", password=" + password + ", mobile=" + mobile
				+ "]";
	}
	
	
	
}
