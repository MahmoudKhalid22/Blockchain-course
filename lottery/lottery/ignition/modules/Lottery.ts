import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("LotteryModule", (m) => {
  const lottery = m.contract("Lottery");

  // m.call(lottery, "incBy", [5n]);

  return { lottery };
});
