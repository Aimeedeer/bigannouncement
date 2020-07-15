const last = async (iterator) => {
    let res

    for await (const entry of iterator) {
	res = entry
    }

    return res
}

function submit() {
    console.log(Ipfs);
    
    var ethinput = document.getElementById("eth-input").value;
    var msginput = document.getElementById("msg-input").value;
    console.log(ethinput);
    console.log(msginput);
}


document.addEventListener('DOMContentLoaded', async () => {
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() })
    window.node = node

    const status = node.isOnline() ? 'online' : 'offline'

    console.log(`Node status: ${status}`)
})
