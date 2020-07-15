'use strict'

const all = async (iterator) => {
    const arr = []

    for await (const entry of iterator) {
	arr.push(entry)
    }

    return arr
}

const last = async (iterator) => {
    let res

    for await (const entry of iterator) {
	res = entry
    }

    return res
}

document.addEventListener('DOMContentLoaded', async () => {
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() })
    window.node = node

    const status = node.isOnline() ? 'online' : 'offline'

    console.log(`Node status: ${status}`)

    for await (const file of await node.add({
	path: 'hello.txt',
	content: 'The Big Announcement'
    })) {
	console.log('Added file:', file.path, file.cid.toString())
    }
})

function submit() {
    console.log(Ipfs);
    
    var ethinput = document.getElementById("eth-input").value;
    var msginput = document.getElementById("msg-input").value;
    console.log(ethinput);
    console.log(msginput);
}

