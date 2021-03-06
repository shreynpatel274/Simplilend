package io.samarth.api.model;

public class GetLoanDetailsResponse {

	private String email;
	
	private String purpose;
	
	private int amount;
	
	private String streetName;
	
	private String state;
	
	private String city;
	
	private int pincode;
	
	private int tenureMonth;
	
	private int tenureYear;
	
	private String residence;
	
	private int statusCode;

	
	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getStreetName() {
		return streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	public int getTenureMonth() {
		return tenureMonth;
	}

	public void setTenureMonth(int tenureMonth) {
		this.tenureMonth = tenureMonth;
	}

	public int getTenureYear() {
		return tenureYear;
	}

	public void setTenureYear(int tenureYear) {
		this.tenureYear = tenureYear;
	}

	public String getResidence() {
		return residence;
	}

	public void setResidence(String residence) {
		this.residence = residence;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "GetLoanDetailsResponse [email=" + email + ", purpose=" + purpose + ", amount=" + amount
				+ ", streetName=" + streetName + ", state=" + state + ", city=" + city + ", pincode=" + pincode
				+ ", tenureMonth=" + tenureMonth + ", tenureYear=" + tenureYear + ", residence=" + residence + "]";
	}

}
