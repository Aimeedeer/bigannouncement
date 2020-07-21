'use strict'

const address = '0x2812bCb0f907111BFAe3af46d30f79Fd613d4F2a';
const abi = [
    {
	    "inputs": [
	        {
		        "internalType": "string",
		        "name": "newMessage",
		        "type": "string"
	        }
	    ],
	    "name": "setMessage",
	    "outputs": [],
	    "stateMutability": "nonpayable",
	    "type": "function"
    },
    {
	    "inputs": [],
	    "stateMutability": "nonpayable",
	    "type": "constructor"
    },
    {
	    "inputs": [],
	    "name": "message",
	    "outputs": [
	        {
		        "internalType": "string",
		        "name": "",
		        "type": "string"
	        }
	    ],
	    "stateMutability": "view",
	    "type": "function"
    }
];
