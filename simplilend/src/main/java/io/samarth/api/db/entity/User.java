package io.samarth.api.db.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

	@Id	
	private String email;
	
	private long mobile;
	
	private String name;
	
	

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

	public long getMobile() {
		return mobile;
	}

	public void setMobile(long mobile) {
		this.mobile = mobile;
	}

	@Override
	public String toString() {
		return "User [email=" + email + ", mobile=" + mobile + "]";
	}

	
	
}
