package io.samarth.api.model;

public class ApplyLoanResponse {

	private int statusCode;
	
	private String data;

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "ApplyLoanResponse [statusCode=" + statusCode + ", data=" + data + "]";
	}
	
	
}
