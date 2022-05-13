import React, { useState, useEffect, createContext } from "react";
import "./styles.css";
import VideoList from "./Components/VideoList.js";

import Form from "./Components/Form.js";
//#endregion
export const TitleContext = createContext();
export const LinkContext = createContext();
export const EndContext = createContext();

const App = () => {
  const [videoList, setVideoList] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");
  // const nftCollection = useNFTCollection(
  //   "0x94cDDd0f2191F4c84d092713ae9024A9CCd476D4"
  // );
  // const { data: nfts } = useNFTs(nftCollection);
  // const { mutate: mintNFT } = useMintNFT(nftCollection);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [ended, setEnded] = useState(false);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };
  //#endregion
  const mintHandler = async () => {
    await fetch("http://localhost:9000", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title: title, account: currentAccount, url: url }),
    });
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion
  const mintNFTContainer = () => (
    <button onClick={mintHandler}>Mint NFT</button>
  );

  //#endregion
  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  );

  const addVideo = (video) => {
    console.log(video);
    setVideoList([video]);

    console.log("setState video", video);
  };
  //#endregion
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      <LinkContext.Provider value={{ url, setUrl }}>
        <EndContext.Provider value={{ ended, setEnded }}>
          <div className="App">
            {currentAccount === "" ? (
              renderNotConnectedContainer()
            ) : (
              <p>Wallet connected with address {currentAccount}</p>
            )}
            <Form addVideo={addVideo} />
            <VideoList videoList={videoList} />

            {ended ? mintNFTContainer() : ""}
            {console.log(ended)}
          </div>
        </EndContext.Provider>
      </LinkContext.Provider>
    </TitleContext.Provider>
  );
};

export default App;
