'use strict'

console.assert(contractAbi);
console.assert(contractAddress);
console.assert(Ipfs);
console.assert(Web3);

document.addEventListener('DOMContentLoaded', async () => {
    let web3 = new Web3(Web3.givenProvider);

    console.log('web3:');
    console.log(web3);
    window.web3 = web3;
    
    let contract = new web3.eth.Contract(contractAbi, contractAddress);
    console.log("contract:");
    console.log(contract);
    window.contract = contract;
    
    let currentPriceWei = await contract.methods.currentPrice().call();
    let currentPriceEth = web3.utils.fromWei(currentPriceWei, 'ether');
    window.currentPriceWei = currentPriceWei;

    let suggestPriceWei = web3.utils.toBN(currentPriceWei).add(web3.utils.toBN(5000000000));
    let suggestPriceEth = web3.utils.fromWei(suggestPriceWei, 'ether');
    
    document.getElementById("show-current-price").innerText = currentPriceEth;
    document.getElementById("price-input").value = suggestPriceEth;
    
    let accounts = await web3.eth.requestAccounts();

    console.log("accounts:");
    console.log(accounts);
    
    if (accounts.length < 1) {
        // todo
    }

    let account = accounts[0];
    console.log("account:");
    console.log(account);
    window.account = account;
    
    if (typeof Web3 == "undefined") {
        // todo
    }

    console.log("Web3:");
    console.log(Web3);
    console.log("Web3.givenProvider:");
    console.log(Web3.givenProvider);

    enableInputs();
        
    console.log(web3.utils.toWei(currentPriceEth, 'ether'));
})

async function submit() {
    disableInputs();

    let msginput = document.getElementById("msg-input");
    console.assert(msginput);
    let message = msginput.value;
    let priceinput = document.getElementById("price-input").value;
    console.assert(priceinput);
    
    if (!validNumber(priceinput)) {
	document.getElementById("price-alarming").innerText = " * Please fill in number.";
	enableInputs();
    } else {
	let price = web3.utils.toWei(priceinput, 'ether');

	if (price <= currentPriceWei) {
	    document.getElementById("price-alarming").innerText = " * Your price shall be greater than the current";
	    enableInputs();
	} else {	
	    await storeMessage(contractAbi,
			       contractAddress,
			       message,
			       price);
	} 
    }
}

function validNumber(inputNumber) {
    let regular = /^[0-9]+.?[0-9]*$/;
    console.log(inputNumber);
    
    if (regular.test(inputNumber)) {
	return true;
    } else {
	return false;
    }
} 

async function storeMessage(contractAbi, contractAddress, message, priceinput) {

    console.assert(contractAbi);
    console.assert(contractAddress);
    console.assert(typeof message != "undefined");
    console.assert(priceinput);
    
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

    let addedNode = node.add({
	path: 'message.txt',
	content: message
    });
    addedNode = await addedNode;
    let cid = addedNode.cid.toString();
    
    console.log('Added file:', addedNode.path, addedNode.cid);

    uiEndIpfsStore(cid);

    uiBeginEthWalletConnect();
    
    uiEndEthWalletConnect(account);

    uiBeginEthTransaction();

    contract.methods
        .setContent(cid)
        .send({from: account, value: priceinput})
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
    let priceinput = document.getElementById("price-input");
    console.assert(priceinput);
    priceinput.disabled = true;
}

function enableInputs() {
    let button = document.getElementById("submit-button");
    console.assert(button);
    button.disabled = false;
    let msginput = document.getElementById("msg-input");
    console.assert(msginput);
    msginput.disabled = false;
    let priceinput = document.getElementById("price-input");
    console.assert(priceinput);
    priceinput.disabled = false;
}

function deactivateStatusElement(el) {
    el.classList.add("inactive");

    // Find the "status-progress" item
    for (let progress of el.querySelectorAll(".status-progress")) {
        // Hide all the subitems
        for (let progressChild of progress.children) {
            progressChild.style.display = "none";
        }
    }
}

function activateStatusElement(el) {
    el.classList.remove("inactive");
}

function toggleStatusWorking(el) {
    // Find the "status-progress" item
    for (let progress of el.querySelectorAll(".status-progress")) {
        // Hide all the subitems
        for (let progressChild of progress.children) {
            progressChild.style.display = "none";
        }
        // Show the "waiting" item
        for (let waitingChild of progress.querySelectorAll(".status-waiting")) {
            waitingChild.style.display = "inline";
        }
    }
}

function toggleStatusSuccess(el) {
    // Find the "status-progress" item
    for (let progress of el.querySelectorAll(".status-progress")) {
        // Hide all the subitems
        for (let progressChild of progress.children) {
            progressChild.style.display = "none";
        }
        // Show the "success" item
        for (let waitingChild of progress.querySelectorAll(".status-success")) {
            waitingChild.style.display = "inline";
        }
    }
}

function uiBeginProcess() {
    let statusContainer = document.getElementById("status-messages");
    console.assert(statusContainer);

    statusContainer.style.display = "block";

    for (let statusItem of statusContainer.children) {
        console.log(statusItem);
        deactivateStatusElement(statusItem);
    }

    let reloadButton = document.getElementById("reload-button");
    console.assert(reloadButton);
    reloadButton.disabled = true;
}

function uiBeginIpfsCreate() {
    let statusEl = document.getElementById("status-ipfs-create");
    console.assert(statusEl);

    activateStatusElement(statusEl);
    toggleStatusWorking(statusEl);
}

function uiEndIpfsCreate() {
    let statusEl = document.getElementById("status-ipfs-create");
    console.assert(statusEl);

    toggleStatusSuccess(statusEl);
}

function uiBeginIpfsStore() {
    let statusEl = document.getElementById("status-ipfs-store");
    console.assert(statusEl);

    activateStatusElement(statusEl);
    toggleStatusWorking(statusEl);
}

function uiEndIpfsStore(cid) {
    console.assert(cid);
    
    let statusEl = document.getElementById("status-ipfs-store");
    console.assert(statusEl);

    toggleStatusSuccess(statusEl);

    let cidEl = document.getElementById("status-ipfs-cid");
    console.assert(cidEl);
    cidEl.textContent = cid;
}

function uiBeginEthWalletConnect() {
    let statusEl = document.getElementById("status-eth-wallet-connect");
    console.assert(statusEl);

    activateStatusElement(statusEl);
    toggleStatusWorking(statusEl);
}

function uiEndEthWalletConnect(account) {
    console.assert(account);

    let statusEl = document.getElementById("status-eth-wallet-connect");
    console.assert(statusEl);

    toggleStatusSuccess(statusEl);

    let accountEl = document.getElementById("status-eth-account");
    console.assert(accountEl);
    accountEl.textContent = account;
}

function uiBeginEthTransaction() {
    let statusEl = document.getElementById("status-eth-transaction");
    console.assert(statusEl);

    activateStatusElement(statusEl);
    toggleStatusWorking(statusEl);
}

function uiUpdateEthTransactionHash(hash) {
    console.assert(hash);

    let hashEl = document.getElementById("status-eth-tx-hash");
    console.assert(hashEl);
    hashEl.textContent = hash;
}

function uiUpdateEthTransactionConfirmation(number) {
    console.assert(typeof number == "number");
    
    let statusEl = document.getElementById("status-eth-transaction");
    console.assert(statusEl);

    toggleStatusSuccess(statusEl);

    let confEl = document.getElementById("status-eth-confirmations");
    console.assert(confEl);
    confEl.textContent = number + 1;
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
