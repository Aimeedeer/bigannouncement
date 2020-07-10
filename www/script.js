
function submit() {

    var confirmmsg = "OK!";

    var ethinput = document.getElementById("eth-input").value;
    var msginput = document.getElementById("msg-input").value;
    console.log(ethinput);
    console.log(msginput);

    if (confirm(ethinput + " Ether for the message: " + msginput)) {
	confirmmsg = "Great! Let's make it!";
    } else {
	confirmmsg = "Tx canceled.";
    }

    confirm(confirmmsg);
}




