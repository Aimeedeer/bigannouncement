'use strict'

const contractAddress = '0x83bb257cad2746be26256ae359c306fefea4e2f7';
const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newContent",
				"type": "string"
			}
		],
		"name": "setContent",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "currentContent",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

