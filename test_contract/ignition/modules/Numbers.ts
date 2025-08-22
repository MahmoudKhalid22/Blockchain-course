import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("NumberModule", (m) => {
  const number = m.contract("Number");

  m.call(number, "getArray");

  return { number };
});
