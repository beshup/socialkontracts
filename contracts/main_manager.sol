pragma solidity ^0.6.6;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "https://github.com/aave/flashloan-box/blob/Remix/contracts/aave/ILendingPoolAddressesProvider.sol";
import "https://github.com/aave/flashloan-box/blob/Remix/contracts/aave/ILendingPool.sol";
        //import ERC20 functionality ... DAI stuff

contract MainManager {
    // how I will do things later!! for now, directly write in addresses

    // =========================================================================
    /*
    ERC20 public token;

    //@param _token the address of the DAI smart contract

    constructor(ERC20 _token) public {
        token = ERC20(_token);
    }
    */
    // =========================================================================

    LendingPoolAddressesProvider public provider;
    LendingPool public lendingPool;
    address daiAddress;
    ERC20 public token;

    constructor() public {
        // Retrieve LendingPool address

        // kovan addy
        provider = LendingPoolAddressesProvider(address(0x88757f2f99175387ab4c6a4b3067c77a695b0349)); 
        lendingPool = LendingPool(provider.getLendingPool());

        // Input variable
        daiAddress = address(0xc4375b7de8af5a38a93548eb8453a498222c4ff2); // kovan DAI
        token = ERC20(daiAddress);
    }

    function getBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function withdraw(uint256 amount) public {
        uint256 amount_actual = amount * 1e18;
        // Approve LendingPool contract to move your DAI
        IERC20(daiAddress).approve(provider.getLendingPoolCore(), amount_actual);
        lendingPool.withdraw(daiAddress, amount_actual, msg.sender);
    }

    function stake(uint256 amount) public {
        uint256 amount_actual = amount * 1e18;
        // Approve LendingPool contract to move your DAI
        IERC20(daiAddress).approve(provider.getLendingPoolCore(), amount_actual);
        lendingPool.deposit(daiAddress, amount_actual);
    }
}