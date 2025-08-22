import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("InboxModule", (m) => {
  const inbox = m.contract("Inbox", ["hi there"]);

  m.call(inbox, "getMessage", []);
  return { inbox };
});
