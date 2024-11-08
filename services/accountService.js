import fs from 'fs/promises';
import path from 'path';
import { Account } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

const dbPath = path.resolve('db', 'account.json');

async function readJsonFile(filePath) {
	try {
		const data = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error(`Error reading file from disk: ${error}`);
		return [];
	}
}

async function writeJsonFile(filePath, data) {
	try {
		await fs.writeFile(filePath, JSON.stringify(data, null, 2));
	} catch (error) {
		console.error(`Error writing file to disk: ${error}`);
	}
}

async function getAccountById(userId) {
	try {
		const accountsData = await readJsonFile(dbPath);
		const accountData = accountsData.find(account => account.userId === userId);
		return accountData ? new Account(accountData.id, accountData.userId, accountData.accountCode, accountData.balance) : null;
	} catch (error) {
		console.error('Error fetching account by User ID:', error);
		throw new Error('Error fetching account by User ID');
	}
}

async function getAccountByCode(code) {
	try {
		const accountsData = await readJsonFile(dbPath);
		const accountData = accountsData.find(account => account.accountCode === code);
		return accountData ? new Account(accountData.id, accountData.userId, accountData.accountCode, accountData.balance) : null;
	} catch (error) {
		console.error('Error fetching account by Account Code:', error);
		throw new Error('Error fetching account by Account Code');
	}
}

async function createAccount(userId) {
	try {
		const accountsData = await readJsonFile(dbPath);
		const newId = uuidv4();
		const accountCode = "AC" + Math.random().toString(36).substr(2, 10).toUpperCase();
		const newAccount = { id: newId, userId: userId, accountCode: accountCode, balance: 0.0 };

		accountsData.push(newAccount);
		await writeJsonFile(dbPath, accountsData);

		return new Account(newAccount.id, newAccount.userId, newAccount.accountCode, newAccount.balance);
	} catch (error) {
		console.error('Error creating account:', error);
		throw new Error('Error creating account');
	}
}

async function updateAccountBalance(userId, balance) {
	try {
		const accountsData = await readJsonFile(dbPath);
		const accountIndex = accountsData.findIndex(account => account.userId === userId);

		if (accountIndex === -1) {
			throw new Error('No account found for the given user ID');
		}

		accountsData[accountIndex].balance = balance;
		await writeJsonFile(dbPath, accountsData);
		return accountsData[accountIndex];
	} catch (error) {
		console.error('Error updating account balance:', error);
		throw new Error('Error updating account balance');
	}
}

export default { getAccountById, getAccountByCode, createAccount, updateAccountBalance };
