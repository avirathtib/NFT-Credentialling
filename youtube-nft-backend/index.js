const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const express = require("express");
const cors = require("cors");
const ethers = require("ethers");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
//#endregion

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
  try {
    console.log("Hello");
    console.log(req.body);
    //#endregion
    // const textToPicture = require("text-to-picture");
    // textToPicture
    //   .convert({
    //     text: req.body.title,
    //     color: "white",
    //   })
    //   .then(async (result) => {
    const provider = ethers.getDefaultProvider("rinkeby", {
      infura: "https://rinkeby.infura.io/v3/53cdc3163c6c401395135b9122d92fb9",
    });
    const sdk = new ThirdwebSDK(
      new Wallet(
        "https://mainnet.infura.io/v3/53cdc3163c6c401395135b9122d92fb9",
        ethers.getDefaultProvider(rpcUrl)
      )
    );
    const contract = sdk.getNFTCollection(
      "0x94cDDd0f2191F4c84d092713ae9024A9CCd476D4"
    );
    const metadata = {
      name: "hello",
      description:
        "The owner of this NFT has watched a Youtube Video with the associated name fully",
      image: "./image.jpg", // This can be an image url or file
    };
    const tx = await contract.mintTo(req.body.account, metadata);
    const receipt = tx.receipt;
    const tokenId = tx.id;
    const nft = await tx.data();
    console.log(nft);
    //   })
    //   .then((str) => {
    //     console.log(str); // data:image/png;base64,iVBORw0KGgoA...
    //   });
  } catch (error) {
    console.log(error);
  }
});

app.listen("9000", (req, res) => {
  console.log("Server is listening on 3000");
});
