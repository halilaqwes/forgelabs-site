import { navigate } from "./router";
export default function SiteLink({ href, children, onClick, ...props }) {
  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target ||
          props.download
        )
          return;
        const target = new URL(href, window.location.href);
        if (target.origin !== window.location.origin) return;
        event.preventDefault();
        navigate(target.pathname + target.search + target.hash);
      }}
    >
      {children}
    </a>
  );
}
