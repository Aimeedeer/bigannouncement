'use strict'

console.assert(marked);

document.addEventListener('DOMContentLoaded', async () => {
    let web3 = new Web3(Web3.givenProvider);

    let contract = new web3.eth.Contract(contractAbi, contractAddress);
    console.log(contract);

    let message = await contract.methods.currentContent().call();
    console.log(message);

    //copied from update.js
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });

    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);

    if (!node.isOnline()) {
        // todo
    }
    
    const cid = message;

    for await (const file of node.get(cid)) {
	    console.log('file path');
	    console.log(file.path);

        if (typeof file.content == "undefined") continue;

	    let content = "";
	    for await (let chunk of file.content) {
	        content = content + chunk;
	    }

        console.log("message:");
	    console.log(content);

        let md = marked(content);

        document.getElementById("msg-announcement").innerHTML = md;
    }
})
