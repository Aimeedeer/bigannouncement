pragma solidity >=0.4.0 <0.7.0;

contract BigAnnouncement {
    string public message;
    
    constructor() public {
        message = "The default message.";
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    
}