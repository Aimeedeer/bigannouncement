pragma solidity >=0.4.0 <0.7.0;

contract BigAnnouncement {
    string public currentContent;
    uint public currentPrice;    
    
    address payable public contractOwner;
    uint public sendAmount;

    constructor() public {
	contractOwner =  0x3D30125Eb9FE2Fc3B34D394819054D7574aD7760;
        currentContent = "";
        currentPrice = 0;
    }

    function setContent(string memory newContent) public payable {
        require(msg.value > currentPrice, "Your price shoule be greater than the current price.");
        
        currentContent = newContent;
        currentPrice = msg.value;
    }  
    
    function withdraw() public payable {
        require(msg.sender == contractOwner, "You are not allowed withdrawal.");
        
        sendAmount = address(this).balance;
        if ( sendAmount > 100 ) {
            contractOwner.transfer(sendAmount - 100);
        }
    }
}

