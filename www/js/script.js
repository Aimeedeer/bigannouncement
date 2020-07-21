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


const all = async (iterator) => {
    const arr = [];


    for await (const entry of iterator) {
	    arr.push(entry);
    }

    return arr;
}

const last = async (iterator) => {
    let res;

    for await (const entry of iterator) {
	    res = entry;
    }

    return res;
}

document.addEventListener('DOMContentLoaded', async () => {
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;

    const status = node.isOnline() ? 'online' : 'offline';

    console.log(`Node status: ${status}`);

    console.log(Web3);
    console.log(Web3.givenProvider);

    var web3 = new Web3(Web3.givenProvider);

    console.log('web3');
    console.log(web3);
    web3.eth.getAccounts(console.log);
    
    window.web3 = web3;

    var contract = new web3.eth.Contract(abi, address);
    console.log(contract);

    var message = await contract.methods.message().call();
    console.log(message);

    //test
    //web3.eth.contract.setMessage('testest hello world');

})

async function submit() {
    let node = window.node;

    var ethinput = document.getElementById("eth-input").value;
    var msginput = document.getElementById("msg-input").value;
    
    console.log(ethinput);
    console.log(msginput);

    var addedNode = node.add({
	path: 'message.txt',
	content: msginput
    });

    console.log(addedNode);
    var addedNode = await addedNode;
    
    console.log('Added file:', addedNode.path, addedNode.cid.toString());

    //test
    var contract = new web3.eth.Contract(abi, address);
    contract.methods.setMessage(addedNode.cid.toString());

    console.log('web3.eth.requestaccounts: ');
    var addresses = await web3.eth.requestAccounts();

    console.log('accounts[0] -- '+ addresses[0]);

    contract.methods.setMessage(addedNode.cid.toString()).send({from: addresses[0]})
	.on('transactionHash', function(hash){
	    console.log('transactionHash');
	    console.log(hash);
	})
	.on('receipt', function(receipt){
	    console.log('receipt');
	    console.log(receipt);
	})
	.on('confirmation', function(confirmationNumber, receipt){
	    console.log('confirmation');
	    console.log(confirmationNumber);
	    console.log(receipt);
	})
	.on('error', function(error){
	    console.log('error');
	    console.log(error);
	});
}
