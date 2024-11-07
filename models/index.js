class User {
    constructor(id, name, birthdate, email, password) {
        this.id = id;
        this.name = name;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
    }
}

class Account {
	constructor(id, userId, accountCode, balance = 0.00) {
		this.id = id;
		this.userId = userId;
		this.accountCode = accountCode;
		this.balance = balance;
	}
}

class Order {
	constructor(id, userId, startPoint, endPoint, arrivedIndicator = false) {
		this.id = id;
		this.userId = userId;
		this.startPoint = startPoint;
		this.endPoint = endPoint;
		this.arrivedIndicator = arrivedIndicator;
	}
}

class OnRideOrder extends Order {
	constructor(id, userId, startPoint, endPoint, arrivedIndicator = false) {
		super(id, userId, startPoint, endPoint, arrivedIndicator);
	}
}

class OnCarOrder extends Order {
	constructor(id, userId, startPoint, endPoint, arrivedIndicator = false, capacity) {
		super(id, userId, startPoint, endPoint, arrivedIndicator);
		this.capacity = capacity;
	}
}

export { User, Account, Order, OnRideOrder, OnCarOrder };