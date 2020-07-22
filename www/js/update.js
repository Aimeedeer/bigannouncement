'use strict'

console.assert(contractAbi);
console.assert(contractAddress);
console.assert(Ipfs);
console.assert(Web3);

document.addEventListener('DOMContentLoaded', async () => {
    if (typeof Web3 == "undefined") {
        // todo
    }

    console.log("Web3:");
    console.log(Web3);
    console.log("Web3.givenProvider:");
    console.log(Web3.givenProvider);

    enableInputs();
})

async function submit() {
    disableInputs();

    var msginput = document.getElementById("msg-input");
    console.assert(msginput);
    var message = msginput.value;

    await storeMessage(contractAbi, contractAddress, message);
}

async function storeMessage(contractAbi, contractAddress, message) {

    console.assert(contractAbi);
    console.assert(contractAddress);
    console.assert(message);


    uiBeginProcess();

    if (Web3.givenProvider == null) {
        // todo
    }


    uiBeginIpfsCreate();

    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });

    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);

    if (!node.isOnline()) {
        // todo
    }

    uiEndIpfsCreate();


    uiBeginIpfsStore();

    console.log('message:');
    console.log(message);

    var addedNode = node.add({
	    path: 'message.txt',
	    content: message
    });
    var addedNode = await addedNode;
    var cid = addedNode.cid.toString();
    
    console.log('Added file:', addedNode.path, addedNode.cid);

    uiEndIpfsStore(cid);
    

    uiBeginEthWalletConnect();
    
    var web3 = new Web3(Web3.givenProvider);

    console.log('web3:');
    console.log(web3);
    
    var contract = new web3.eth.Contract(contractAbi, contractAddress);
    console.log("contract:");
    console.log(contract);


    var accounts = await web3.eth.requestAccounts();

    console.log("accounts:");
    console.log(accounts);

    if (accounts.length < 1) {
        // todo
    }

    var account = accounts[0];
    console.log("account:");
    console.log(account);

    uiEndEthWalletConnect(account);


    uiBeginEthTransaction();

    contract.methods
        .setMessage(cid)
        .send({from: account})
	    .on('transactionHash', function(hash){
	        console.log('transactionHash');
	        console.log(hash);
            uiUpdateEthTransactionHash(hash);
	    })
	    .on('receipt', function(receipt){
	        console.log('receipt');
	        console.log(receipt);
            // todo
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
	        console.log('confirmation');
	        console.log(confirmationNumber);
	        console.log(receipt);
            uiUpdateEthTransactionConfirmation(confirmationNumber);

            if (confirmationNumber == 0) {
                uiEndProcessSuccess();
            }
	    })
	    .on('error', function(error){
	        console.log('error');
	        console.log(error);
            uiUpdateEthTransactionError(error);
	    });

    console.log("waiting on Ethereum");
}

function disableInputs() {
    let button = document.getElementById("submit-button");
    console.assert(button);
    button.disabled = true;
    let msginput = document.getElementById("msg-input");
    console.assert(msginput);
    msginput.disabled = true;
}

function enableInputs() {
    let button = document.getElementById("submit-button");
    console.assert(button);
    button.disabled = false;
    let msginput = document.getElementById("msg-input");
    console.assert(msginput);
    msginput.disabled = false;
}

function deactivateStatusElement(el) {
    el.classList.add("inactive");
}

function activateStatusElement(el) {
    el.classList.remove("inactive");
}

function uiBeginProcess() {
    let statusContainer = document.getElementById("status-messages");
    console.assert(statusContainer);

    statusContainer.style.display = "block";

    for (let statusItem of statusContainer.children) {
        console.log(statusItem);
        deactivateStatusElement(statusItem);
    }
}

function uiBeginIpfsCreate() {
    let statusEl = document.getElementById("status-ipfs-create");
    console.assert(statusEl);

    activateStatusElement(statusEl);
}

function uiEndIpfsCreate() {
}

function uiBeginIpfsStore() {
    let statusEl = document.getElementById("status-ipfs-store");
    console.assert(statusEl);

    activateStatusElement(statusEl);
}

function uiEndIpfsStore(cid) {
}

function uiBeginEthWalletConnect() {
    let statusEl = document.getElementById("status-eth-wallet-connect");
    console.assert(statusEl);

    activateStatusElement(statusEl);
}

function uiEndEthWalletConnect(account) {
}

function uiBeginEthTransaction() {
    let statusEl = document.getElementById("status-eth-transaction");
    console.assert(statusEl);

    activateStatusElement(statusEl);
}

function uiUpdateEthTransactionHash(hash) {
}

function uiUpdateEthTransactionConfirmation(number) {
}

function uiUpdateEthTransactionError(error) {
}

function uiEndProcessSuccess() {
    let statusEl = document.getElementById("status-eth-complete");
    console.assert(statusEl);

    activateStatusElement(statusEl);

    let reloadButton = document.getElementById("reload-button");
    console.assert(reloadButton);
    reloadButton.disabled = false;
}

function loadMain() {
    window.location.href = "index.html";
}
