import { HTMLAttributes } from "react";

interface CallyChangeEvent extends Event {
  target: HTMLElement & { value: string };
}

declare global {
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
