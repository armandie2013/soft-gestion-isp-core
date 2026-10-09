/* Clases completas y estáticas para que Tailwind las detecte al compilar. */
const panel =
  "min-w-0 overflow-hidden rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-panel)]";
const title =
  "m-0 flex items-center gap-2 text-[length:13px] !font-[500] leading-[1.5] before:h-[13px] before:w-[3px] before:shrink-0 before:rounded-[2px] before:bg-[var(--overview-blue-accent)] before:content-['']";
const header =
  "flex items-center justify-between gap-[10px] border-b border-[var(--overview-border)] bg-[var(--overview-header)] px-[14px] py-[11px]";
const muted = "text-[var(--overview-muted)]";
const money = "whitespace-nowrap text-right tabular-nums !font-[500]";
const badge =
  "inline-flex max-w-full items-center gap-1 rounded-[4px] px-[6px] py-[3px] text-[length:11px] leading-[1.35]";
const iconButton =
  "inline-flex size-[30px] shrink-0 items-center justify-center rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-button)] text-[var(--overview-text)] [&_svg]:size-[14px]";
const button =
  "inline-flex min-h-[34px] items-center justify-center gap-[6px] whitespace-nowrap rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-button)] px-[11px] py-[7px] !text-[length:12px] text-[var(--overview-text)] hover:border-[var(--overview-blue)] hover:bg-[var(--overview-soft)] hover:text-[var(--overview-blue)] [&_svg]:size-[14px]";

export const overviewStyles = {
  shell:
    "flex min-h-screen bg-[var(--overview-bg)] text-[length:14px] font-normal leading-[1.5] text-[var(--overview-text)] lg:text-[length:13px] [&_h1]:m-0 [&_h2]:m-0 [&_p]:m-0 [&_svg]:size-[18px] [&_svg]:shrink-0 lg:[&_svg]:size-4",
  sidebar:
    "sticky top-0 hidden h-screen w-[220px] shrink-0 flex-col gap-5 overflow-y-auto border-r border-[var(--overview-border)] bg-[var(--overview-panel)] px-3 pt-[18px] pb-[14px] lg:flex",
  brand: "flex items-center gap-[9px] px-[6px]",
  brandIcon: "flex rounded-[7px] bg-[#2563eb] p-2 text-white",
  brandText:
    "min-w-0 [overflow-wrap:anywhere] [&>span]:text-[length:13px] [&>span]:font-[500] [&_small]:mt-[2px] [&_small]:block [&_small]:text-[length:11px] [&_small]:text-[var(--overview-muted)]",
  accountText:
    "min-w-0 [overflow-wrap:anywhere] [&_small]:mt-[2px] [&_small]:block [&_small]:text-[length:11px] [&_small]:text-[var(--overview-muted)]",
  navLabel:
    "px-[9px] pt-[13px] pb-[5px] text-[length:11px] tracking-[.07em] text-[var(--overview-muted)] uppercase",
  navLink:
    "my-[2px] flex items-center gap-[9px] rounded-[7px] px-[9px] py-2 text-[length:12px] hover:bg-[var(--overview-bg)]",
  activeLink:
    "!bg-[var(--overview-soft)] font-[500] text-[var(--overview-blue)] shadow-[inset_3px_0_0_var(--overview-blue-accent)]",
  account:
    "mt-auto flex items-center gap-[9px] border-t border-[var(--overview-border)] px-[6px] pt-3",
  avatar:
    "grid size-[30px] shrink-0 place-items-center rounded-full bg-[var(--overview-soft)] text-[length:11px] text-[var(--overview-blue)]",
  workspace: "min-w-0 flex-1",
  topbar:
    "sticky top-0 z-30 flex min-h-[64px] items-center justify-between gap-[10px] border-b border-[var(--overview-border)] bg-[var(--overview-panel)] px-[14px] py-[10px] lg:min-h-[54px] lg:gap-4 lg:px-5 lg:py-2",
  breadcrumb:
    "hidden text-[length:12px] text-[var(--overview-muted)] lg:inline [&>span]:mx-[9px]",
  headerActions:
    "flex shrink-0 items-center gap-[7px] lg:gap-[10px] max-lg:[&>button]:size-11",
  desktopLogout: "hidden lg:block",
  mobileBrand:
    "flex min-w-0 items-center gap-[9px] text-[length:14px] font-[500] lg:hidden [&_span]:[overflow-wrap:anywhere] [&_svg]:text-[var(--overview-blue)]",
  mobileMenuButton:
    "grid size-11 shrink-0 place-items-center rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-panel)] text-[var(--overview-text)] lg:hidden",
  mobileMenu:
    "border-b border-[var(--overview-border)] bg-[var(--overview-panel)] p-[14px] scroll-mt-[68px] [&[hidden]]:hidden lg:hidden",
  mobileMenuHeader:
    "flex items-center justify-between gap-3 text-[length:13px]",
  iconButton:
    "grid size-11 shrink-0 place-items-center rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-panel)] text-[var(--overview-text)]",
  menuGrid: "grid grid-cols-2 gap-2",
  menuLink:
    "flex min-h-11 items-center gap-2 rounded-[7px] border border-[var(--overview-border)] px-[10px] py-3 text-[length:13px] [overflow-wrap:anywhere] hover:bg-[var(--overview-bg)] aria-[current=page]:bg-[var(--overview-soft)] aria-[current=page]:text-[var(--overview-blue)]",
  menuLogout: "mt-[18px]",
  main: "px-[14px] pt-[18px] pb-[calc(90px+env(safe-area-inset-bottom))] lg:px-5 lg:py-[18px]",
  bottomNav:
    "fixed inset-x-0 bottom-0 z-40 grid gap-1 border-t border-[var(--overview-border)] bg-[var(--overview-panel)] px-[10px] pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] lg:hidden [&>a]:flex [&>a]:min-h-12 [&>a]:flex-col [&>a]:items-center [&>a]:justify-center [&>a]:gap-1 [&>a]:rounded-[7px] [&>a]:px-[2px] [&>a]:py-2 [&>a]:text-[length:11px] [&>a]:text-[var(--overview-muted)] [&>button]:flex [&>button]:min-h-12 [&>button]:flex-col [&>button]:items-center [&>button]:justify-center [&>button]:gap-1 [&>button]:rounded-[7px] [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-[2px] [&>button]:py-2 [&>button]:!text-[length:11px] [&>button]:text-[var(--overview-muted)]",
  bottomActive:
    "!bg-[var(--overview-soft)] !text-[var(--overview-blue)] shadow-[inset_0_2px_0_var(--overview-blue-accent)]",
  dashboard: "mx-auto max-w-[1720px]",
  heading:
    "mb-4 flex flex-wrap items-center justify-between gap-3 lg:mb-[15px] lg:gap-[10px] [&_h1]:text-[length:24px] [&_h1]:font-[500] [&_h1]:tracking-[-.4px] lg:[&_h1]:text-[length:22px]",
  subtitle:
    "hidden text-[length:12px] text-[var(--overview-muted)] lg:!mt-[2px] lg:block",
  greeting:
    "mb-[2px] block text-[length:12px] text-[var(--overview-muted)] lg:hidden",
  date: "text-[length:12px] text-[var(--overview-muted)]",
  muted: "text-[length:11px] text-[var(--overview-muted)]",
  desktopMetrics: "mb-[14px] hidden grid-cols-3 gap-3 lg:grid",
  metric:
    "relative block min-w-0 overflow-hidden rounded-[8px] border border-[var(--overview-border)] px-[15px] py-[13px] [--metric-accent:var(--overview-blue-accent)] [--metric-tint:var(--overview-blue-tint)] bg-[linear-gradient(130deg,var(--metric-tint),var(--overview-panel)_78%)] first:[--metric-accent:var(--overview-green-accent)] first:[--metric-tint:var(--overview-green-tint)] [&:nth-child(2)]:[--metric-accent:var(--overview-amber-accent)] [&:nth-child(2)]:[--metric-tint:var(--overview-amber-tint)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[var(--metric-accent)] before:content-[''] hover:border-[var(--metric-accent)] motion-safe:transition-colors",
  metricLabel:
    "flex items-center justify-between gap-2 pr-[34px] text-[length:12px] text-[var(--overview-muted)] [&_svg]:absolute [&_svg]:top-3 [&_svg]:right-[14px] [&_svg]:!size-7 [&_svg]:rounded-[7px] [&_svg]:bg-[var(--metric-tint,var(--overview-green-tint))] [&_svg]:p-[6px] [&_svg]:text-[var(--metric-accent,var(--overview-green-accent))]",
  metricValue:
    "mt-[6px] mb-[3px] text-[length:24px] font-[500] tracking-[-.4px] tabular-nums [overflow-wrap:anywhere]",
  mobileMetrics:
    "mb-[14px] grid gap-3 min-[640px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:hidden",
  balance:
    "relative overflow-hidden rounded-[10px] border border-[var(--overview-border)] bg-[linear-gradient(130deg,var(--overview-green-tint),var(--overview-panel)_78%)] p-4 shadow-[inset_0_3px_0_var(--overview-green-accent)]",
  balanceValue:
    "mt-[7px] mb-1 block text-[length:30px] font-[500] tracking-[-.5px] tabular-nums [overflow-wrap:anywhere]",
  pendingBalance:
    "mt-[14px] flex items-center justify-between gap-3 border-t border-[var(--overview-border)] pt-3",
  pendingValue:
    "mt-[3px] block text-[length:20px] font-[500] text-[var(--overview-amber)] tabular-nums [overflow-wrap:anywhere]",
  mobileClientMetric:
    "flex items-center justify-between gap-3 rounded-[10px] border border-[var(--overview-border)] bg-[linear-gradient(130deg,var(--overview-blue-tint),var(--overview-panel)_78%)] p-[14px] shadow-[inset_3px_0_0_var(--overview-blue-accent)] min-[640px]:flex-col min-[640px]:justify-center min-[640px]:text-center",
  clientValue: "text-[length:23px] font-[500] tabular-nums",
  mobileShortcuts:
    "mb-[14px] grid grid-cols-2 gap-[10px] lg:hidden [&_a]:flex [&_a]:min-h-11 [&_a]:items-center [&_a]:gap-[9px] [&_a]:rounded-[8px] [&_a]:border [&_a]:border-[var(--overview-border)] [&_a]:bg-[var(--overview-blue-tint)] [&_a]:px-3 [&_a]:py-[14px] [&_a]:text-[length:13px] [&_a]:text-[var(--overview-blue)]",
  columns:
    "grid grid-cols-1 items-start gap-[14px] min-[1320px]:grid-cols-[minmax(0,1fr)_250px]",
  stack: "grid min-w-0 gap-[14px]",
  secondary: "hidden grid-cols-2 gap-[14px] lg:grid min-[1320px]:grid-cols-1",
  panel,
  panelHeader: `${header} [&_h2]:text-[length:13px] [&_h2]:font-[500] [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2 [&_h2]:before:h-[13px] [&_h2]:before:w-[3px] [&_h2]:before:shrink-0 [&_h2]:before:rounded-[2px] [&_h2]:before:bg-[var(--overview-blue-accent)] [&_h2]:before:content-['']`,
  textLink:
    "shrink-0 text-[length:11px] text-[var(--overview-blue)] hover:underline",
  desktopTable: "hidden lg:block",
  table:
    "w-full table-fixed border-collapse text-[length:12px] [&_th]:bg-[var(--overview-bg)] [&_th]:text-left [&_th]:font-normal [&_th]:text-[var(--overview-muted)] [&_td]:border-b [&_td]:border-[var(--overview-border)] [&_td]:px-3 [&_td]:py-[9px] [&_td]:[overflow-wrap:anywhere] [&_th]:border-b [&_th]:border-[var(--overview-border)] [&_th]:px-3 [&_th]:py-[9px] [&_th]:[overflow-wrap:anywhere] [&_tbody_tr:last-child_td]:border-b-0 [&_tbody_tr:hover]:bg-[var(--overview-bg)]",
  money: "!text-right tabular-nums",
  collectorName: "w-[30%]",
  collectorMoney: "w-[24%]",
  collectorDate: "w-[22%]",
  collectorState: "w-[15%]",
  collectorAction: "w-[9%] !text-right",
  person: "flex min-w-0 items-center gap-2",
  initials:
    "grid size-7 shrink-0 place-items-center rounded-[6px] bg-[var(--overview-soft)] text-[length:11px] text-[var(--overview-blue)]",
  personText:
    "min-w-0 [overflow-wrap:anywhere] [&_small]:mt-[2px] [&_small]:block [&_small]:text-[length:11px] [&_small]:text-[var(--overview-muted)]",
  badge,
  success: "bg-[var(--overview-green-bg)] text-[var(--overview-green)]",
  warning: "bg-[var(--overview-amber-bg)] text-[var(--overview-amber)]",
  primary: "bg-[var(--overview-soft)] text-[var(--overview-blue)]",
  empty: "px-[14px] py-5 text-[length:12px] text-[var(--overview-muted)]",
  mobileCollectors: "block min-[640px]:grid min-[640px]:grid-cols-2 lg:hidden",
  collectorCard:
    "flex items-center justify-between gap-3 border-b border-[var(--overview-border)] p-[14px] last:border-b-0 hover:bg-[var(--overview-bg)] min-[640px]:border min-[640px]:border-[var(--overview-border)] [&>div:first-child]:flex-1",
  collectorRight:
    "max-w-[47%] text-right [&_p]:!mb-[5px] [&_p]:text-[length:14px] [&_p]:[overflow-wrap:anywhere]",
  movementDate: "w-[16%]",
  movementDetail: "w-[39%]",
  movementMoney: "w-[26%]",
  movementState: "w-[19%]",
  movementLabel: "block font-[500]",
  movementConcept:
    "mt-[2px] block text-[length:11px] text-[var(--overview-muted)] [overflow-wrap:anywhere]",
  mobileMovements: "block lg:hidden",
  movementCard:
    "border-b border-[var(--overview-border)] p-[14px] last:border-b-0",
  movementTop: "flex justify-between gap-3 text-[length:13px]",
  movementBottom:
    "mt-[7px] flex items-center justify-between gap-3 text-[length:11px] text-[var(--overview-muted)]",
  summaryBody: "px-[14px] pt-[3px] pb-2",
  summaryRow:
    "flex justify-between gap-[10px] border-b border-[var(--overview-border)] py-[9px] text-[length:12px] last:border-b-0 [&>span:first-child]:text-[var(--overview-muted)] [&>a]:text-right [&>a]:tabular-nums",
  shortcut:
    "my-[7px] flex min-h-10 items-center gap-2 rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-button)] px-[10px] py-[9px] text-[length:12px] text-[var(--overview-blue)] hover:border-[var(--overview-blue-accent)] hover:bg-[var(--overview-soft)] [&_svg]:text-[var(--overview-blue-accent)]",
  mobileSummary:
    "mt-[14px] rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-panel)] lg:hidden [&_summary]:min-h-11 [&_summary]:cursor-pointer [&_summary]:p-[14px] [&_summary]:text-[length:13px]",
};

export const cajaStyles = {
  page: "grid min-w-0 gap-[14px] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-[var(--overview-blue)] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-[var(--overview-blue)]",
  heading:
    "flex items-center justify-between gap-4 [&_h1]:text-[length:22px] [&_h1]:font-[500] [&_h1]:leading-[1.5]",
  description:
    "!mt-[2px] text-[length:12px] leading-[1.5] text-[var(--overview-muted)]",
  layout:
    "grid min-w-0 gap-[14px] min-[1500px]:grid-cols-[minmax(0,1fr)_250px]",
  main: "grid min-w-0 content-start gap-[14px]",
  aside:
    "grid min-w-0 content-start gap-[14px] min-[700px]:grid-cols-3 min-[1500px]:grid-cols-1",
  panel,
  panelHeader: header,
  panelTitle: `${title} [&_svg]:hidden`,
  count:
    "whitespace-nowrap rounded-[5px] border border-[var(--overview-border)] px-[6px] py-[2px] text-[length:10px] leading-[14px] text-[var(--overview-muted)]",
  button,
  iconButton,
  toolbar:
    "flex flex-col gap-2 border-b border-[var(--overview-border)] px-[14px] py-3 min-[700px]:flex-row min-[700px]:items-center min-[700px]:justify-between min-[700px]:gap-3 [&>span]:text-[length:11px] [&>span]:text-[var(--overview-muted)]",
  search:
    "relative min-w-0 flex-1 min-[700px]:max-w-[430px] [&>svg]:pointer-events-none [&>svg]:absolute [&>svg]:top-[11px] [&>svg]:left-[10px] [&>svg]:!size-[14px] [&>svg]:text-[var(--overview-muted)] [&_input]:h-9 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-[7px] [&_input]:border [&_input]:border-[var(--overview-border)] [&_input]:bg-[var(--overview-bg)] [&_input]:py-[7px] [&_input]:pr-[35px] [&_input]:pl-8 [&_input]:!text-[length:16px] min-[700px]:[&_input]:!text-[length:12px] [&_input]:text-[var(--overview-text)] [&_input]:placeholder:text-[var(--overview-muted)] [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-[var(--overview-blue)] [&_button]:absolute [&_button]:top-1 [&_button]:right-1 [&_button]:size-7 [&_button]:border-0 [&_button]:bg-transparent",
  muted,
  desktopTable: "hidden overflow-x-auto min-[1200px]:block",
  table:
    "w-full min-w-[800px] border-collapse text-left text-[length:12px] [&_th]:whitespace-nowrap [&_th]:bg-[var(--overview-bg)] [&_th]:px-3 [&_th]:py-[9px] [&_th]:font-normal [&_th]:text-[var(--overview-muted)] [&_th:first-child]:w-[24%] [&_td]:h-14 [&_td]:border-t [&_td]:border-[var(--overview-border)] [&_td]:px-3 [&_td]:py-[9px] [&_td]:align-middle [&_tbody_tr:nth-child(even)]:bg-[var(--overview-bg)] [&_tbody_tr:hover]:bg-[var(--overview-soft)]",
  right: "!text-right",
  money,
  person: "flex min-w-0 items-center gap-[9px] [&>div]:min-w-0",
  avatar:
    "grid size-7 shrink-0 place-items-center rounded-[6px] bg-[var(--overview-soft)] text-[length:11px] text-[var(--overview-blue)]",
  personName: "block text-[length:12px] font-[500] [overflow-wrap:anywhere]",
  email:
    "mt-[2px] block text-[length:11px] text-[var(--overview-muted)] [overflow-wrap:anywhere]",
  badge: `${badge} bg-[var(--overview-button)]`,
  green: "text-[var(--overview-green)]",
  amber: "text-[var(--overview-amber)]",
  blue: "text-[var(--overview-blue)]",
  greenBadge: "!bg-[var(--overview-green-bg)] text-[var(--overview-green)]",
  amberBadge: "!bg-[var(--overview-amber-bg)] text-[var(--overview-amber)]",
  blueBadge: "!bg-[var(--overview-soft)] text-[var(--overview-blue)]",
  codeButton:
    "inline-flex items-center justify-center gap-[6px] rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-amber-bg)] px-[7px] py-[5px] font-mono !text-[length:12px] tracking-[.06em] text-[var(--overview-amber)] hover:border-[var(--overview-amber)] [&_svg]:!size-[14px]",
  codeMeta:
    "mt-[5px] block text-[length:10px] leading-[1.5] text-[var(--overview-muted)]",
  footer:
    "border-t border-[var(--overview-border)] px-[14px] py-[9px] text-[length:11px] text-[var(--overview-muted)]",
  cards: "grid gap-[10px] p-3 min-[700px]:grid-cols-2 min-[1200px]:hidden",
  card: "min-w-0 rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-panel)] p-3",
  cardTop: "flex items-start justify-between gap-2",
  cardBalance:
    "mt-3 flex items-center justify-between gap-[10px] rounded-[6px] bg-[var(--overview-amber-tint)] p-[10px] text-[length:12px] [&_strong]:text-right [&_strong]:text-[length:17px] [&_strong]:!font-[500] [&_strong]:[overflow-wrap:anywhere]",
  totals:
    "my-[11px] grid grid-cols-2 gap-[10px] [&_span]:block [&_span]:text-[length:10px] [&_span]:text-[var(--overview-muted)] [&_strong]:mt-1 [&_strong]:block [&_strong]:text-[length:12px] [&_strong]:!font-normal [&_strong]:[overflow-wrap:anywhere]",
  cardCode:
    "flex flex-wrap items-center justify-between gap-2 border-t border-[var(--overview-border)] pt-[10px] text-[length:11px]",
  generate: "mt-[10px]",
  empty:
    "grid justify-items-center gap-[6px] px-4 py-[30px] text-center text-[length:12px] [&_svg]:!size-6 [&_svg]:text-[var(--overview-blue)] [&_p]:leading-[1.6] [&_p]:text-[var(--overview-muted)]",
  sideBody: "px-[14px] py-3 text-[length:12px]",
  sideRow:
    "flex items-center justify-between gap-2 border-b border-[var(--overview-border)] py-[9px] last:border-b-0 [&_span]:text-[var(--overview-muted)] [&_strong]:!font-[500]",
  activeCode:
    "border-b border-[var(--overview-border)] py-[11px] first:pt-0 last:border-b-0 last:pb-0 [&_p]:!mb-2 [&_p]:[overflow-wrap:anywhere] [&_div]:flex [&_div]:items-center [&_div]:justify-between [&_div]:gap-2 [&_code]:rounded-[5px] [&_code]:bg-[var(--overview-amber-bg)] [&_code]:px-[6px] [&_code]:py-1 [&_code]:text-[length:12px] [&_code]:tracking-[.06em] [&_code]:text-[var(--overview-amber)]",
  shortcuts:
    "grid gap-2 [&_a]:min-h-10 [&_a]:justify-start [&_a]:px-[10px] [&_a]:py-[9px] [&_a]:text-[var(--overview-blue)] [&_svg:last-child]:ml-auto",
  dialog:
    "m-auto max-h-[calc(100dvh-32px)] w-[min(420px,calc(100%_-_24px))] overflow-y-auto rounded-[12px] border border-[var(--overview-border)] bg-[var(--overview-panel)] p-0 text-[length:12px] text-[var(--overview-text)] backdrop:bg-[rgb(5_12_24_/_0.65)] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-[var(--overview-blue)]",
  dialogBody:
    "p-[18px] [&>p]:!mb-3 [&>p]:text-[var(--overview-muted)] [&>p]:[overflow-wrap:anywhere] [&>button]:w-full",
  bigCode:
    "block rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-amber-bg)] px-[10px] py-[17px] text-center text-[length:32px] tracking-[.15em] text-[var(--overview-amber)] [overflow-wrap:anywhere]",
  dialogFacts:
    "my-[15px] grid gap-[9px] [&_div]:flex [&_div]:flex-wrap [&_div]:justify-between [&_div]:gap-[6px] [&_dt]:text-[var(--overview-muted)] [&_dd]:m-0 [&_dd]:tabular-nums",
  copyFeedback: "mt-2 block leading-[1.5] text-[var(--overview-muted)]",
};

export const movementStyles = {
  scroll:
    "min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--overview-blue)]",
  table:
    "w-full min-w-[1060px] table-fixed border-collapse text-left text-[length:12px] [&_th]:whitespace-nowrap [&_th]:bg-[var(--overview-bg)] [&_th]:px-3 [&_th]:py-[9px] [&_th]:font-normal [&_th]:text-[var(--overview-muted)] [&_td]:h-[46px] [&_td]:border-t [&_td]:border-[var(--overview-border)] [&_td]:px-3 [&_td]:py-[7px] [&_td]:align-middle [&_td]:whitespace-nowrap [&_tbody_tr:nth-child(even)]:bg-[var(--overview-bg)] [&_tbody_tr:hover]:bg-[var(--overview-soft)]",
  right: "!text-right",
  ellipsis: "block truncate",
  date: "text-[length:11px] text-[var(--overview-muted)]",
  actions: "grid grid-cols-[repeat(4,30px)] items-center justify-end gap-[5px]",
  action:
    "inline-flex h-[30px] w-[30px] min-w-[30px] cursor-pointer items-center justify-center gap-[5px] rounded-[6px] border p-0 !text-[length:11px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current [&_svg]:!size-[13px]",
  detailAction:
    "col-start-1 border-blue-200 bg-blue-50 !text-blue-700 hover:border-blue-300 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50 dark:!text-blue-300 dark:hover:border-blue-600 dark:hover:bg-blue-900/60",
  receiptAction:
    "col-start-2 border-violet-200 bg-violet-50 !text-violet-700 hover:border-violet-300 hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950/50 dark:!text-violet-300 dark:hover:border-violet-600 dark:hover:bg-violet-900/60",
  downloadAction:
    "col-start-3 border-emerald-200 bg-emerald-50 !text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:!text-emerald-300 dark:hover:border-emerald-600 dark:hover:bg-emerald-900/60",
  correctionAction:
    "col-start-4 border-amber-200 bg-amber-50 !text-amber-800 hover:border-amber-300 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/50 dark:!text-amber-300 dark:hover:border-amber-600 dark:hover:bg-amber-900/60",
  dialog:
    "!w-[min(540px,calc(100%_-_24px))] [&_dd]:max-w-full [&_dd]:[overflow-wrap:anywhere]",
  detailBlock:
    "mt-4 border-t border-[var(--overview-border)] pt-3 [&_h3]:m-0 [&_h3]:mb-[6px] [&_h3]:text-[length:12px] [&_h3]:font-[500] [&_p]:m-0 [&_p]:text-[length:12px] [&_p]:leading-[1.6] [&_p]:whitespace-pre-wrap [&_p]:[overflow-wrap:anywhere]",
};
