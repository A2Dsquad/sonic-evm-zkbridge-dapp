import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn, shortAddress } from "@/lib/utils";
import type { MintOnBridgeResponseDto } from "@/services/models";
import { useBridgeControllerQuery } from "@/services/queries";
import { ArrowBigRightDash } from "lucide-react";
import { zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { IconAptos, IconCopy, IconEthereum } from "../icons";

export function TransferHistory({ focusedHash }: { focusedHash?: string }) {
  const { isConnected, address = zeroAddress } = useAccount();

  const { data: histories } = useBridgeControllerQuery(
    { src: address },
    { query: { enabled: isConnected && Boolean(address) } }
  );

  return (
    <div className="container px-6 z-10 pb-20 flex flex-col gap-4">
      {histories?.data?.map((history) => (
        <div
          key={history.srcTxHash}
          className="bg-background relative w-full max-w-xl mx-auto border-[1px] border-white/10 rounded-3xl overflow-hidden p-4 flex flex-col gap-2"
        >
          <HistoryCard history={history} focusedHash={focusedHash} />
        </div>
      ))}
    </div>
  );
}

export const HistoryCard = ({
  history,
  focusedHash,
}: {
  history: MintOnBridgeResponseDto;
  focusedHash?: string;
}) => {
  const { copyToClipboard } = useCopyToClipboard();

  return (
    <>
      <div
        className={cn(
          "absolute top-0 bottom-0 left-0 right-0 pointer-events-none bg-white/30",
          "transition-opacity duration-500",
          focusedHash === history.srcTxHash ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row items-center gap-2">
          <p className="flex flex-row items-center gap-2 text-lg font-medium">
            {Number(history.amount)}
            <IconEthereum className="w-5 h-5" />
            <span className="font-normal text-base">ETH</span>
          </p>
          <ArrowBigRightDash className="w-6 h-6" />
          <p className="flex flex-row items-center gap-2 text-lg font-medium">
            {Number(history.amount) * 0.99}
            <IconAptos className="w-5 h-5" />
            <span className="font-normal text-base">sendETH</span>
          </p>
        </div>
      </div>
      <div className="border-[1px] border-white/10 w-full" />
      <div className="w-full flex flex-row items-center justify-between">
        <p className="flex flex-row items-center gap-2 text-gray-400 font-medium">
          From
          <span className="text-gray-500 text-sm">
            {shortAddress(history.src)}
          </span>
        </p>
        <p className="flex flex-row items-center gap-1">
          <IconEthereum className="w-6 h-6" />
          Ethereum
        </p>
      </div>
      <div className="w-full flex flex-row items-center justify-between mt-4">
        <p className="flex flex-row items-center gap-2 text-gray-400 font-medium">
          To
          <span className="text-gray-500 text-sm">
            {shortAddress(history.dst)}
          </span>
        </p>
        <p className="flex flex-row items-center gap-1">
          <img src="/sonic-svm.png" alt="Sonic SVM" className="w-6 h-6" />
          Sonic SVM
        </p>
      </div>
      <div className="bg-white/5 w-full p-4 rounded-2xl mt-4 flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <p>Sender Transaction Hash:</p>
          <p
            className="cursor-pointer underline text-white flex flex-row gap-2 items-center active:opacity-50 transition-opacity"
            onClick={() => copyToClipboard(history.srcTxHash)}
          >
            {shortAddress(history.srcTxHash)} <IconCopy className="w-4 h-4" />
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p>Receiver Transaction Hash:</p>
          <p
            className="cursor-pointer underline text-white flex flex-row gap-2 items-center active:opacity-50 transition-opacity"
            onClick={() => copyToClipboard(history.dstTxHash)}
          >
            {shortAddress(history.dstTxHash)} <IconCopy className="w-4 h-4" />
          </p>
        </div>
        {/* <span className="text-xs text-gray-500 ml-auto">
          {DateTime.fromISO(history.).toLocaleString(
            DateTime.DATETIME_FULL
          )}
        </span> */}
      </div>
    </>
  );
};
