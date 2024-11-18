// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";

contract LotteryContract is VRFConsumerBaseV2Plus {
    uint32 private totalRolls = 0;
    uint256 private minEthAmount = 0.0005 ether;
    uint256 private minParticipants = 3;
    address[] private currentParticipants;
    address private i_owner;
    bool private s_isDrawInProgress;
    bool private paymentSwitch = true;
    uint256 private distGasFee = (21000 * 4) * tx.gasprice;

    uint256 private r_requestId;

    event DepositReceived(uint64 rollId, address indexed sender, uint256 indexed amount);
    event LotteryRolled(uint64  rollId , address indexed winner, uint256 indexed reward);
    event RequestID(uint256 requestId);

    uint256 private s_subscriptionId;
    address private vrfCoordinator;
    bytes32 private s_keyHash;
    uint32 private callbackGasLimit = 200000;
    uint16 private requestConfirmations = 3;
    uint32 private numWords = 1;

    constructor(uint256 subscriptionId, address _vrfCoordinator, bytes32 _keyhash)
        VRFConsumerBaseV2Plus(_vrfCoordinator)
    {
        s_subscriptionId = subscriptionId;
        vrfCoordinator = _vrfCoordinator;
        s_keyHash = _keyhash;
        i_owner = msg.sender;
    }

    // Funding to the contract
    function fund() public payable {
        require(msg.value >= minEthAmount, "You need to spend more ETH!");
            currentParticipants.push(msg.sender);
            emit DepositReceived (totalRolls, msg.sender, msg.value);
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

    // Request randomness from Chainlink VRF
    function rollDraw() public {
        require(!s_isDrawInProgress, "Draw already in progress");
        require(currentParticipants.length >= minParticipants, "Not enough participants yet!");
        s_isDrawInProgress = true;
        r_requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                // Set nativePayment to true to pay for VRF requests with ETH instead of LINK
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: paymentSwitch}))
            })
        );
    }

    // Callback function for Chainlink VRF
    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        address[3] memory winners = selectWinners(randomWords[0]);
        emit RequestID(requestId);
        distributeRewards(winners);
        s_isDrawInProgress = false;
    }

    function selectWinners(uint256 randomSeed) private view returns (address[3] memory) {
        require(currentParticipants.length >= 3, "Not enough participants");

        address[] memory tempParticipants = currentParticipants;
        address[3] memory winners;

        uint256 participantCount = tempParticipants.length;

        for (uint256 i = 0; i < 3; i++) {
            uint256 randomIndex = uint256(keccak256(abi.encode(randomSeed, i))) % participantCount;

            winners[i] = tempParticipants[randomIndex];
            participantCount--;
            tempParticipants[randomIndex] = tempParticipants[participantCount];
        }


        return winners;
    }

    function distributeRewards(address[3] memory winners) private {
        currentParticipants = new address[](0);
        uint256 Eth = address(this).balance;
        uint256 totalPrize = Eth - distGasFee; // Reserve estimated gas fee for distribution
        uint256[3] memory rewards;
        rewards[0] = (totalPrize * 50) / 100;
        rewards[1] = (totalPrize * 20) / 100;
        rewards[2] = (totalPrize * 15) / 100;
        uint256 protocolFee = (totalPrize * 15) / 100;

        for (uint256 i = 0; i < 3; i++) {
            (bool success, ) = winners[i].call{value: rewards[i]}("");
            emit LotteryRolled(totalRolls, winners[i] ,rewards[i]);
            require(success, "Winner transfer failed");
        }

         

        // Protocol Fee
        (bool ownerSuccess, ) = payable(i_owner).call{value: protocolFee}("");
        require(ownerSuccess, "Owner transfer failed");

        ++totalRolls;
    }

    // Public getter functions for private variables

    function getTotalRolls() public view returns (uint32) {
        return totalRolls;
    }

    function getMinEthAmount() public view returns (uint256) {
        return minEthAmount;
    }

    function getMinParticipants() public view returns (uint256) {
        return minParticipants;
    }

    function getCurrentParticipants() public view returns (address[] memory) {
        return currentParticipants;
    }


    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getDrawInProgress() public view returns (bool) {
        return s_isDrawInProgress;
    }

    // Updator Functions
    function updateMinEthAmount(uint256 _amountInWei) public onlyOwner {
        minEthAmount = _amountInWei;
    }

    function updateMinParticipants(uint8 _minParticipants) public onlyOwner {
        minParticipants = _minParticipants;
    }

    function updatePaymentSwitcher(bool _link0Eth1) public onlyOwner {
        paymentSwitch = _link0Eth1;
    }

    function updateDistGasFee(uint256 _amountInWei) public onlyOwner {
        distGasFee = _amountInWei;
    }

    function updatesIsDrawInProgress(bool _state) public onlyOwner {
        s_isDrawInProgress = _state;
    }


}