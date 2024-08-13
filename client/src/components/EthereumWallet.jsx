import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const EthereumWallet = ({address}) => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);

    const getBalance = async (address) => {
        try {
            // Initialize web3
            const web3 = new Web3(Web3.givenProvider);

            // Check if the address is valid
            if (!web3.utils.isAddress(address)) {
                setError("Invalid Ethereum address.");
                setBalance(null);
                return;
            }

            // Fetch balance
            const balanceInWei = await web3.eth.getBalance(address);

            // Convert balance from wei to ether
            const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
            setBalance(balanceInEther);
            setError(null);
        } catch (err) {
            console.error("Error fetching balance:", err);
            setError("Failed to fetch balance. Please check the wallet address.");
            setBalance(null);
        }
    };

    useEffect(() => {
        getBalance()
    }, [address])

    return (
        <div>
            {balance !== null && <p>Balance: {balance} ETH</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default EthereumWallet;