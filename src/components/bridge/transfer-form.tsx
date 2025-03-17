import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { MintOnBridgeResponseDto } from "@/services/models";
import { useBridgeControllerMintOnBridge } from "@/services/queries";
import { ZKBridgeAbi, ZKBridgeAddresses } from "@/smart-contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { delay } from "es-toolkit";
import { useForm, useWatch } from "react-hook-form";
import { parseEther } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import * as z from "zod";
import { Button as MovingBorder } from "../aceternity/moving-border";
import { IconArrow, IconEthereum } from "../icons";
import { Input } from "../ui/input";

const formSchema = z.object({
  amount: z.coerce
    .number({ message: "Amount must be a number" })
    .gt(0, "Amount is required"),
  recipient: z.string().min(1, "Recipient address is required"),
});

export function TransferForm({
  onSuccess,
}: {
  onSuccess: (order: MintOnBridgeResponseDto) => void;
}) {
  const { isConnected, address, chainId } = useAccount();
  const { data: ethBalance } = useBalance({ address });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      recipient: "",
    },
  });

  const values = useWatch({ control: form.control });

  const {
    writeContractAsync,
    isPending: isWriteContractPending,
    isSuccess,
    reset,
  } = useWriteContract();
  const { mutateAsync: createOrder, isPending: isOrderPending } =
    useBridgeControllerMintOnBridge();

  async function onSubmit({ amount, recipient }: z.infer<typeof formSchema>) {
    if (!chainId || !address) return;

    const value = parseEther(amount.toString());

    const srcTxHash = await writeContractAsync({
      abi: ZKBridgeAbi,
      address: ZKBridgeAddresses[chainId],
      functionName: "transferETH",
      args: [1n, address],
      value,
    });

    await delay(10_000);
    reset();
    if (srcTxHash) {
      try {
        const res = await createOrder({
          data: {
            dst: recipient,
            amount: amount,
            src: address,
            srcTxHash,
          },
        });

        onSuccess(res.data);
      } catch (err) {}
    }
  }

  return (
    <div className="container px-6 z-10 pb-20">
      <div className="bg-background relative max-w-xl mx-auto bg-[rga(18, 18, 17, 1)] border-[1px] border-white/10 rounded-[40px] overflow-hidden">
        <CardHeader className="gap-10 items-center md:items-start">
          <CardTitle className="text-lg font-bold text-white flex flex-row items-center gap-2">
            Token: ETH <IconEthereum className="w-5 h-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <MovingBorder
                as="div"
                containerClassName="w-full h-auto"
                duration={6_000}
                className="grid grid-cols-7 gap-4"
              >
                <div className="col-span-3 py-4 px-6 flex flex-col gap-2 items-start">
                  <p className="text-gray-500">From</p>
                  <span className="flex flex-row items-center gap-2">
                    <IconEthereum className="w-8 h-8" /> Ethereum
                  </span>
                </div>
                <IconArrow className="w-8 h-8 m-auto -rotate-90" />
                <div className="col-span-3 py-4 px-6 flex  flex-col gap-2 items-start">
                  <p className="text-gray-500">To</p>
                  <span className="flex flex-row items-center gap-2">
                    <img
                      src="/sonic-svm.png"
                      alt="Sonic SVM"
                      className="w-8 h-8"
                    />{" "}
                    Sonic SVM
                  </span>
                </div>
              </MovingBorder>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormDescription>
                      Balance: {ethBalance?.formatted || 0}{" "}
                      {ethBalance?.symbol || ""}
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="0"
                        {...field}
                        className="text-app-white placeholder:text-app-gray py-[10px] px-4 border border-solid border-white/[0.05] bg-neutral-900 rounded-[12px] h-11 focus-visible:ring-0 focus:border-primary-light"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-gray-400">
                      Fee: 1%
                    </FormDescription>
                    <FormDescription className="text-gray-400">
                      Expected amount out: {(values.amount || 0) * 0.99} senETH
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the recipient address"
                        {...field}
                        className="text-app-white placeholder:text-app-gray py-[10px] px-4 border border-solid border-white/[0.05] bg-neutral-900 rounded-[12px] h-11 focus-visible:ring-0 focus:border-primary-light"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary font-semibold text-[18px] py-4 h-[56px] rounded-[16px]"
                disabled={!isConnected}
                loading={isWriteContractPending || isOrderPending || isSuccess}
              >
                {isSuccess || isOrderPending ? "Bridging..." : "Transfer"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </div>
    </div>
  );
}
