import NiceModal from "@ebay/nice-modal-react";
import { delay } from "es-toolkit";
import { useState } from "react";
import { animateScroll } from "react-scroll";
import SegmentedControl from "../ui/segmented-control";
import { SuccessModal } from "./success-modal";
import { TransferForm } from "./transfer-form";
import { TransferHistory } from "./transfer-history";

type Tab = "transfer" | "history";

export const BridgeForm = () => {
  const [tab, setTab] = useState<Tab>("transfer");
  const [focusedHash, setFocusedHash] = useState<string>();

  return (
    <div className="flex flex-col items-center gap-6 min-h-screen" id="ContainerElementID">
      <SegmentedControl
        items={[
          { label: "Transfer", value: "transfer" },
          { label: "History", value: "history" },
        ]}
        value={tab}
        onChange={(value) => setTab(value as Tab)}
      />

      {tab === "transfer" && (
        <TransferForm
          onSuccess={(order) =>
            NiceModal.show(SuccessModal, {
              onViewInHistory: async () => {
                NiceModal.remove(SuccessModal);
                setTab("history");
                await delay(500);
                animateScroll.scrollToBottom({ smooth: true, duration: 1500 });
                await delay(1500);
                setFocusedHash(order.srcTxHash);
                await delay(500);
                setFocusedHash(undefined);
              },
              order,
            })
          }
        />
      )}
      {tab === "history" && <TransferHistory focusedHash={focusedHash} />}
    </div>
  );
};
