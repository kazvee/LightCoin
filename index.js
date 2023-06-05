class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  getTransactionHistory() {
    let transactionHistory = "Account Transaction History: \n";
    for (let t of this.transactions) {
      transactionHistory += `→ ${t.constructor.name} → Amount: ${t.amount}\n`;
    }
    return transactionHistory;
  }
}

class Transaction {
  constructor(account, amount) {
    this.account = account;
    this.amount = amount;
  }
  commit() {
    if (!this.isAllowed()) {
      console.log("Insufficient funds. Transaction cannot be processed. 💸");
      return false;
    }

    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    // Always allowed to deposit money
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

const myAccount = new Account("gudetama");

console.log("Starting account balance: ", myAccount.balance);
console.log("Trying to withdraw from empty account... 🤔");
const t1 = new Withdrawal(myAccount, 20);
console.log("Transaction processing... ", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Depositing paycheque... 💰");
const t2 = new Deposit(myAccount, 8000);
console.log("Transaction processing... ", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Trying to withdraw more than is in the account... 🤔");
t3 = new Withdrawal(myAccount, 8000.01);
console.log("Transaction processing... ", t3.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Empty the account because I'm changing banks... 😡");
t4 = new Withdrawal(myAccount, 8000);
console.log("Transaction processing... ", t4.commit());
console.log("Account Balance: ", myAccount.balance);

console.log(myAccount.getTransactionHistory());
