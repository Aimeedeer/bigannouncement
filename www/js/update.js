'use strict'

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
    if (typeof Web3 == "undefined") {
        // todo
    }

    console.log("Web3:");
    console.log(Web3);
    console.log("Web3.givenProvider:");
    console.log(Web3.givenProvider);

    enableSubmitButton();
})

function disableSubmitButton() {
    let button = document.getElementById("submit-button");
    console.assert(button);
    button.disabled = true;
}

function enableSubmitButton() {
    let button = document.getElementById("submit-button");
    console.assert(button);
    button.disabled = false;
}

async function submit() {
    console.assert(contractAddress);
    console.assert(contractAbi);
    console.assert(Ipfs);
    console.assert(Web3);

    disableSubmitButton();

    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });

    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);

    if (!node.isOnline()) {
        // todo
    }

    if (Web3.givenProvider == null) {
        // todo
    }

    var web3 = new Web3(Web3.givenProvider);

    console.log('web3:');
    console.log(web3);
    
    var contract = new web3.eth.Contract(contractAbi, contractAddress);
    console.log("contract:");
    console.log(contract);

    var message = await contract.methods.message().call();
    console.log(message);

    var msginput = document.getElementById("msg-input");
    console.assert(msginput);
    var msginput = msginput.value;
    
    var addedNode = node.add({
	    path: 'message.txt',
	    content: msginput
    });
    var addedNode = await addedNode;
    var cid = addedNode.cid.toString();
    
    console.log('Added file:', addedNode.path, addedNode.cid);

    var accounts = await web3.eth.requestAccounts();

    console.log("accounts:");
    console.log(accounts);

    if (accounts.length < 1) {
        // todo
    }

    var account = accounts[0];
    console.log("account:");
    console.log(account);

    contract.methods
        .setMessage(cid)
        .send({from: account})
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

    console.log("waiting on ethereum");
}
