import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(50);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(50);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      
      <div className="button">
      
      
        <p>This is your Account: {account}</p>
        <p>This is your Balance: {balance}</p>
        <button onClick={deposit} className="button1">Deposit 50 ETH</button>
        <button onClick={withdraw} className="button1">Withdraw 50 ETH</button>
        <style jsx>{`
        .button1 {
          text-align: center;
          background-color: #43A5BE;
          font-family: Arial, sans-serif;
          border-radius: 5px;
          border-radius: 5px;
          cursor: pointer;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          justify-content: center;
          align-items: center;
          height: 5vh;
          width: 9vh;
          background-color: #f0f0f0;
        }
        .button{
          font-family: Arial, sans-serif;
        }
      `}
        </style>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header className="head"><h1>Aaron Galera's Wallet!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: gray;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          height: 40vh
        }
        .head{
          border: none;
          border-radius: 5px;
          background-color: #f07857;
          padding:5px;
          border-radius: 5px;
        }
      `}
      </style>
    </main>
  )
}
