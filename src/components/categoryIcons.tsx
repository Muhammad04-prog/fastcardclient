import type { JSX } from "react";

const iconCls =
  "w-12 h-12 mx-auto text-black group-hover:text-white transition-all duration-300";

export const CATEGORY_ICONS: Record<string, JSX.Element> = {
  Fashion: (
    <svg
      className={iconCls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4a3 3 0 0 1 3 3v1h-6V7a3 3 0 0 1 3-3Zm-3 5h6m-7.5 0h9l1.5 11.5H3L4.5 9Z"
      />
    </svg>
  ),
  Women: (
    <svg
      className={iconCls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 21h6l-.813-5.096A3.001 3.001 0 0 0 12 15a3 3 0 0 0-2.187.904ZM12 3v1m0 0a3 3 0 0 1 3 3v1.5a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3Zm0 11.25V9"
      />
    </svg>
  ),
  Electronics: (
    <svg
      className={iconCls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="4" width="18" height="11" rx="2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 19h4M12 15v4m-9 1h18"
      />
    </svg>
  ),
  Home: (
    <svg
      className={iconCls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  ),
  Medicine: (
    <svg
      className={iconCls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect
        x="4"
        y="9"
        width="16"
        height="6"
        rx="3"
        transform="rotate(-45 12 12)"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
    </svg>
  ),
  Sports: (
    <svg
      className={iconCls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.2 6.2a8 8 0 0 0 11.6 11.6M17.8 6.2a8 8 0 0 0-11.6 11.6"
      />
    </svg>
  ),
  Toys: (
    <svg
      className={iconCls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <circle cx="17" cy="17" r="3" />
    </svg>
  ),
  Groceries: (
    <svg
      className={iconCls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  ),
  Beauty: (
    <svg
      className={iconCls}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  ),
};
