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
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;

    const status = node.isOnline() ? 'online' : 'offline';

    console.log(`Node status: ${status}`);

    console.log(`Web3: ${Web3}`);
    console.log(`Web3.givenProvider: ${Web3.givenProvider}`);

    var web3 = new Web3(Web3.givenProvider);

    console.log(`web3: ${web3}`);
    
    window.web3 = web3;

})

async function submit() {
    let node = window.node;

    var ethinput = document.getElementById("eth-input").value;
    var msginput = document.getElementById("msg-input").value;
    
    console.log(ethinput);
    console.log(msginput);

    for await (const file of await node.add({
	path: 'message.txt',
	content: msginput
    })) {
	console.log('Added file:', file.path, file.cid.toString())
    }
}

