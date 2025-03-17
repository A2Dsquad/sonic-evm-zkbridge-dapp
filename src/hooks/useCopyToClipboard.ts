import { useState } from 'react';

export interface useCopyToClipboardProps {
  timeout?: number;
  onSuccess?: () => void;
  onError?: () => void;
}

export function useCopyToClipboard({
  timeout = 2000,
  onSuccess,
  onError,
}: useCopyToClipboardProps = {}) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyImageToClipboard = async (value: string) => {
    if (!value) {
      return;
    }

    try {
      const res = await fetch(value);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setIsCopied(true);
      onSuccess?.();

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    } catch (error) {
      onError?.();
    }
  };

  const copyToClipboard = (value: string) => {
    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      onSuccess?.();

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard, copyImageToClipboard };
}
