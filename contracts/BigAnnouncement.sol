pragma solidity >=0.4.0 <0.7.0;

contract BigAnnouncement {
    string public currentContent;
    uint public currentPrice;

    constructor() public {
        currentContent = "";
        currentPrice = 0;
    }

    function setContent(string memory newContent) public payable {
        require(msg.value > currentPrice, "Your price shoule be greater than the current price.");
        
        currentContent = newContent;
        currentPrice = msg.value;
    }  
}
