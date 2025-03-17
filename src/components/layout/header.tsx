import { Link } from "@tanstack/react-router";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

import {
  IconChevronDown,
  IconCopy,
  IconLink,
  IconWallet,
} from "@/components/icons";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { shortAddress } from "@/lib/utils";

function Header() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { copyToClipboard } = useCopyToClipboard();

  return (
    <header className="text-white bg-black/30">
      <div className="p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo-typo.png" alt="Sentra Bridge" className="h-10" />
            </Link>
          </div>
          <div className="flex items-center">
            {!isConnected && (
              <Button
                variant="secondary"
                onClick={() => open()}
                className="flex items-center gap-2 rounded-full py-2 px-4 bg-white"
              >
                <IconWallet className="w-6 h-6 text-app-black" />
                <span className="text-app-black font-semibold text-sm tracking-[0.07px] leading-[20px]">
                  Connect Wallet
                </span>
              </Button>
            )}

            {isConnected && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent text-primary border border-solid border-primary py-2 px-4 flex items-center gap-2 rounded-full"
                  >
                    <UserAvatar name={address} className="w-5 h-5" />
                    <span>{shortAddress(String(address))}</span>
                    <IconChevronDown className="w-4 h-4 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px] bg-[#262626]/70 mt-4 border-none p-0 rounded-[8px]">
                  <DropdownMenuItem
                    onClick={() => address && copyToClipboard(address)}
                    className="py-3 px-4 backdrop-blur-[15px] flex items-center gap-2 rounded-none hover:cursor-pointer"
                  >
                    <IconCopy className="w-5 h-5 text-foreground" />
                    <span className="text-xs text-foreground">
                      Copy Address
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => disconnect()}
                    className="py-3 px-4 backdrop-blur-[15px] flex items-center gap-2 rounded-none hover:cursor-pointer"
                  >
                    <IconLink className="w-5 h-5 text-foreground" />
                    <span className="text-xs text-foreground">Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
