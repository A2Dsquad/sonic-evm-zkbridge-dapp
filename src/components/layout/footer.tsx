import { IconLogo, IconTelegram, IconX } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-neutral-900">
      <div className="container py-8 flex justify-between items-start">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <IconLogo className="h-10 w-10" />
            <span className="text-xl font-semibold">Sentra Bridge</span>
          </div>
          <p className="text-xs text-foreground">Sentra Bridge</p>
        </div>
        <div>
          <ul className="space-y-2">
            <li>
              <a
                href="https://t.me/sentra-bridge"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "py-[6px] pl-2 pr-4 bg-white/[0.05]",
                  "border border-solid border-white/[0.03] rounded-[8px]",
                  "flex items-center gap-2",
                  "text-white text-sm leading-[20px] font-semibold",
                )}
              >
                <div className="w-8 h-8 p-[2px]">
                  <div className=" bg-white rounded-full flex items-center justify-center w-7 h-7">
                    <IconTelegram className="text-app-black w-5 h-5" />
                  </div>
                </div>
                Telegram
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/sentra-bridge"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "py-[6px] pl-2 pr-4 bg-white/[0.05]",
                  "border border-solid border-white/[0.03] rounded-[8px]",
                  "flex items-center gap-2",
                  "text-white text-sm leading-[20px] font-semibold",
                )}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <IconX className="w-7 h-7" />
                </div>
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
