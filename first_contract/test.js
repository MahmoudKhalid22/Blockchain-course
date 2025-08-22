import { network } from "hardhat";

const { ethers } = await network.connect();
async function main() {
  const accounts = await ethers.getSigners();

  console.log("=== Hardhat Test Accounts ===\n");

  for (let i = 0; i < 10; i++) {
    const account = accounts[i];
    const balance = await ethers.provider.getBalance(account.address);

    console.log(`Account ${i}:`);
    console.log(`  Address: ${account.address}`);
    console.log(`  Balance: ${ethers.formatEther(balance)} ETH`);

    // For local hardhat network, we can access the private key
    if (account.privateKey) {
      console.log(`  Private Key: ${account.privateKey}`);
    }
    console.log("");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
