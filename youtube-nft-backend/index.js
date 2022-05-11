const express = require("express");
const cors = require("cors");
const { ThirdwebSDK } = require("@3rdweb/sdk");
const ethers = require("ethers");

const fs = require("fs");

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
//#endregion

const MODULE_ADDRESS = "0x94cDDd0f2191F4c84d092713ae9024A9CCd476D4";
const PRIVATE_KEY =
  "762c011fd78d2f1e5c25a5804e8a759fdc9e4ae93c2d5be5b0cb0254d75d60e3";
function dataUriToURL(dataURI) {
  dataURI = dataURI.toString();
  //   var byteString = atob(dataURI.split(",")[1]);
  //   var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  //   var ab = new ArrayBuffer(byteString.length);
  //   var ia = new Uint8Array(ab);
  //   for (var i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   var blob = new Blob([ab], { type: mimeString });
  //   // return blob;
  //   const imageUrl = URL.createObjectURL(blob);
  imageUrl = encodeURI(dataURI);

  console.log(imageUrl);
}

app.post("/", async function (req, res) {
  const walletAddress = "0x4fBe07b5c6973d69ED80729e33f47b7Eb3999744";
  const rpcUrl = "https://polygon-rpc.com";
  const wallet = new ethers.Wallet(
    PRIVATE_KEY,
    ethers.getDefaultProvider(rpcUrl)
  );
  const sdk = new ThirdwebSDK(wallet);
  const module = sdk.getNFTModule(
    MODULE_ADDRESS
    // The address of you the module you created in ThirdWeb
  );
  const image = fs.readFileSync("./test.jpg");
  const nftData = {
    name: "NFT Youtube",
    description:
      "The owner of this NFT has watched a Youtube Video successfully",
    image: image,
  };

  console.log("Hello");
  try {
    await module.mintTo(walletAddress, nftData);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.json(error);
    res.status(500);
  }
});

app.listen("9000", (req, res) => {
  console.log("Server is listening on 9000");
});
