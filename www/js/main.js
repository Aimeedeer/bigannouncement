'use strict'

document.addEventListener('DOMContentLoaded', async () => {
    var web3 = new Web3(Web3.givenProvider);

    var contract = new web3.eth.Contract(contractAbi, contractAddress);
    console.log(contract);

    var message = await contract.methods.message().call();
    console.log(message);

    //copied from update.js
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });

    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);

    if (!node.isOnline()) {
        // todo
    }
    
    const cid = message;

    for await (const file of node.ls(cid)) {
	console.log(file.path)
    }

    for await (const file of node.get(cid)) {
	console.log('file path');
	console.log(file.path);

	if (!file.content) continue;

	var content = "";
	for await (var chunk of file.content) {
	    content = content + chunk;
	}

	console.log(content.trim());
    }
    document.getElementById("msg-announcement").innerText = content;
})
