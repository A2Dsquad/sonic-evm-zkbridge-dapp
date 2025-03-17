import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import type { ReadMinterOrderDto } from "@/services/models";
import { HistoryCard } from "./transfer-history";

interface Props {
  onViewInHistory: () => void;
  order: ReadMinterOrderDto;
}

export const SuccessModal = NiceModal.create(({ onViewInHistory, order }: Props) => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible} onOpenChange={modal.hide}>
      <DialogContent className="flex flex-col items-center justify-center">
        <CheckCircle className="w-16 h-16 text-success" />
        <h2 className="text-2xl">Bridging Successful</h2>
        <HistoryCard history={order} />
        <Button onClick={onViewInHistory}>View in History</Button>
      </DialogContent>
    </Dialog>
  );
});
