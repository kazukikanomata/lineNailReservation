import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  interface CallyChangeEvent extends Event {
    target: HTMLElement & { value: string };
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "calendar-date": HTMLAttributes<HTMLElement> & {
        onchange?: (event: CallyChangeEvent) => void;
        className?: string;
      };
      "calendar-month": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};
