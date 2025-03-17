import Avatar from "boring-avatars";
import type { ComponentProps } from "react";

import { cn, headAddress } from "@/lib/utils";

export const UserAvatar = ({ name, className, props }: ComponentProps<typeof Avatar>) => {
  return (
    <div className={cn("w-10 h-10", className)}>
      <Avatar name={headAddress(name ?? "")} {...props} />
    </div>
  );
};
