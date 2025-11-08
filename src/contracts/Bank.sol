// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// 对已有的合约进行二次存款操作
// 相当于把usdt转到了我的质押协议中
contract Bank {
    // 键值对
    mapping (address => uint) public BankList;

    // 静态变量
    // 当前token 代币合约地址
    address public immutable token;

    constructor(address _token) {
        token = _token;
    }

    // 公共校验
    modifier requireBanlan (uint amount) {
        amount = amount * 10 ** 18;

        uint256 banlan = BankList[msg.sender];

        require(banlan >= amount, "error amount");

        // 代表函数代码写在之后执行
        _;
    }

    // 查询余额信息
    function getBalance () public view returns (uint balace) {
        // 采用的方式是直接赋值给返回值
        balace = BankList[msg.sender] / (10 ** 18);
        // BankList[msg.sender] / (10**18); // 也是可以使用这种方式转账
    }

    // 存款
    function setBalance (uint amount) public {
        // 不是银行中项目转账 是我把另外一个代币合约 给这个合约进行存储
        // require(getBalance() >= amount, "error Balance");

        amount = amount * 10 ** 18;

        // address(this) 就是当前这个合约地址
        // 从 我的地址 ===> 转给这个银行多少钱
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "transferFrom Error");

        BankList[msg.sender] += amount;
    }

    // 取款函数
    function withdrawal(uint amount) external requireBanlan(amount) {
        amount = amount * 10 ** 18;

        // require(SafeERC20.safeTransfer(IERC20(token), msg.sender, amount), "error no");
        SafeERC20.safeTransfer(IERC20(token), msg.sender, amount);

        BankList[msg.sender] -= amount;
    }

    // 转账函数
    // 只是金额从A ===》 B
    function transfer (address to, uint amount) public requireBanlan(amount) {
        amount = amount * 10 ** 18;

        BankList[msg.sender] -= amount;

        BankList[to] += amount;
    }
}