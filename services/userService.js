import fs from 'fs/promises';
import path from 'path';
import { User } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

const dbPath = path.resolve('db', 'user.json');

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

async function getUsers() {
	try {
		const usersData = await readJsonFile(dbPath);
		return usersData.map(user => new User(user.id, user.name, user.birthdate, user.email, user.password));
	} catch (error) {
		console.error('Error fetching users:', error);
		throw new Error('Error fetching users');
	}
}

async function getUserById(userId) {
	try {
		const usersData = await readJsonFile(dbPath);
		const user = usersData.find(user => user.id === userId);
		return user ? new User(user.id, user.name, user.birthdate, user.email, user.password) : null;
	} catch (error) {
		console.error('Error fetching user by ID:', error);
		throw new Error('Error fetching user by ID');
	}
}

async function createUser(user) {
	if (!(user instanceof User)) {
		throw new Error('Expected a User instance');
	}
	try {
		const usersData = await readJsonFile(dbPath);
		const newUser = { ...user, id: uuidv4() };
		usersData.push(newUser);
		await writeJsonFile(dbPath, usersData);
		return new User(newUser.id, newUser.name, newUser.birthdate, newUser.email, newUser.password);
	} catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Error creating user');
	}
}

async function updateUserById(userId, updatedUser) {
	if (!(updatedUser instanceof User)) {
		throw new Error('Expected a User instance');
	}
	try {
		const usersData = await readJsonFile(dbPath);
		const userIndex = usersData.findIndex(user => user.id === userId);

		if (userIndex === -1) {
			throw new Error('User not found');
		}

		usersData[userIndex] = { ...usersData[userIndex], ...updatedUser };
		await writeJsonFile(dbPath, usersData);
		return usersData[userIndex];
	} catch (error) {
		console.error('Error updating user:', error);
		throw new Error('Error updating user');
	}
}

async function login(email, password) {
	try {
		const usersData = await readJsonFile(dbPath);
		const user = usersData.find(user => user.email === email && user.password === password);
		return user ? { id: user.id, email: user.email, name: user.name } : null;
	} catch (error) {
		console.error('Error during login:', error);
		throw new Error('Error during login');
	}
}

export default { createUser, getUserById, getUsers, login, updateUserById };
