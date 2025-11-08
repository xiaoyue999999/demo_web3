import React, {useState} from "react";
import './App.less';
import {Button, Input, message} from 'antd';
import { Web3 } from 'web3';
import ABI from "./ABI.json";

const App = () => {
    const [address, setAddress] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [bankContract, setBankContract] = useState(null);
    const [mount, setMount] = useState(0);
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [number3, setNumber3] = useState(0);
    const [transferAdderss, setTransferAdderss] = useState(0);

    // 初始化获取钱包的信息 以及合约的实例
    const connectWallet = async () => {
        // 1、获取钱包地址
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        setAddress(accounts[0]);

        // 2、链接web3
        const web3 = new Web3(window.web3.currentProvider);
        setWeb3(web3);

        // 3、获取智能合约 ABI + address
        const _bankContract = new web3.eth.Contract(ABI, '0xd847CaB66291F5fBAA38d7A2B464853C3f942D18');
        console.log('_bankContract', _bankContract)
        setBankContract(_bankContract);
    }

    // 查询
    const getBalance = async () => {
        const _mount = await bankContract.methods.getBalance().call({
            from: address
        });

        setMount(_mount);
    }

    // 存钱调用
    const bankDeposit = async () => {
        // 塞入参数
        await bankContract.methods.setBalance(number1).send({
            from: address
        });
    }

    // 取钱
    const withdrawal = async () => {
        await bankContract.methods.withdrawal(number2).send({
            from: address
        });
    }

    // 转账
    const transfer = async () => {
        await bankContract.methods.transfer(transferAdderss, number3).send({
            from: address
        });

    }

    return <div className="app">
        <div className="container">
            <h2>Bank 系统</h2>

            <div>
                <Button onClick={connectWallet}>connect Wallet</Button>

                <h2>账户地址:{address}</h2>
                <span>银行余额：{mount}</span>
                <Button onClick={getBalance}>查询</Button>

                <div>
                    金额：<Input onChange={(e) => setNumber1(e.target.value)} /> <Button onClick={bankDeposit}>存钱</Button>
                </div>

                <div>
                    金额：<Input onChange={(e) => setNumber2(e.target.value)} /> <Button onClick={withdrawal}>取钱</Button>
                </div>

                <div>
                    转账地址：<Input onChange={(e) => setTransferAdderss(e.target.value)} />
                </div>

                <div>
                    金额：<Input onChange={(e) => setNumber3(e.target.value)} /> <Button onClick={transfer}>转账</Button>
                </div>

            </div>
        </div>
    </div>
}

export default App;