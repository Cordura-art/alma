export interface ApplyThemeOptions {
  /** Element that receives data-theme. Default document.documentElement. */
  root?: Element;
  /** Force a base theme instead of following prefers-color-scheme. */
  base?: 'dark' | 'light';
  /** Force high contrast on or off instead of following prefers-contrast: more. */
  highContrast?: boolean;
  /** Keep following system changes. Default true. */
  watch?: boolean;
}
/** Sets data-theme to "dark" | "light" (prefers-color-scheme) plus "-hc" when prefers-contrast: more. Returns the applied theme id. */
export declare function applyTheme(opts?: ApplyThemeOptions): 'dark' | 'light' | 'dark-hc' | 'light-hc';

/** IBM Carbon icon name, e.g. 'arrow--right'. 896 are bundled; register the rest from assets/Icons/carbon-icons.json. */
export type AlmaIconName = string;
/** Adds icons ({ name: '<path …/>' } or the carbon-icons.json object). Only plain SVG shapes are accepted. Returns the icon count. */
export declare function registerIcons(map: Record<string, string> | { icons: Record<string, string> }): number;
/** Names of every available icon. */
export declare function iconNames(): string[];

export interface ButtonProps {
  /** Prominence, per Apple HIG: filled (lime, the most likely action; 1–2 per view) > tinted > gray > plain.
   *  ghost / inverse are for brand grounds. "primary" = filled and "secondary" = gray (aliases). Default "filled". */
  variant?: 'filled' | 'tinted' | 'gray' | 'plain' | 'tertiary' | 'ghost' | 'inverse' | 'primary' | 'secondary';
  /** Meaning, per Apple HIG. primary = the default action (submits on Enter); cancel = dismisses;
   *  destructive = system red and never the lime accent, whatever the variant. Default "normal". */
  role?: 'normal' | 'primary' | 'cancel' | 'destructive';
  /** sm = 44px (default) · md = 56px · lg = 72px. Never below 44px (size-touch-min). Use style, not size, to rank options side by side. */
  size?: 'sm' | 'md' | 'lg';
  /** Arrow before the label. */
  iconBefore?: string;
  /** Arrow after the label. */
  iconAfter?: string;
  /** Icon-only button (circle). Requires aria-label, which is also shown as a tooltip. */
  icon?: string;
  /** Shows an activity indicator in place of the leading icon and blocks repeat clicks. */
  loading?: boolean;
  /** Toggle behaviour (Apple: outside lists, a button that toggles instead of a switch). Sets aria-pressed; on = filled, off = tinted. */
  selected?: boolean;
  /** Label while loading, e.g. "Pagando…". */
  loadingLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent) => void;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: 'dialog' | 'menu' | 'listbox' | boolean;
  children?: any;
}
export declare function Button(props: ButtonProps): any;

export interface TextInputProps {
  /** Visible label; floats into a chip when the field has a value or focus. */
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, e: Event) => void;
  placeholder?: string;
  /** Helper line under the field, e.g. "Mínimo 4 caracteres". */
  helper?: string;
  /** Shows the "n/max" counter. */
  maxLength?: number;
  /** true, or a message that replaces the helper. */
  error?: boolean | string;
  required?: boolean;
  disabled?: boolean;
  /** Visible and copyable but not editable: dashed border, full contrast, still focusable. */
  readOnly?: boolean;
  /** "password" adds the eye toggle. */
  type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url';
  id?: string;
  name?: string;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url' | 'search';
  autoComplete?: string;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
}
export declare function TextInput(props: TextInputProps): any;

export interface IconProps {
  /** IBM Carbon icon name, e.g. "arrow--right". Material names from before 2026-09-29 still resolve, with a console warning. */
  name: AlmaIconName;
  /** outlined (default) · filled: uses the "--filled" version when Carbon has one. */
  variant?: 'outlined' | 'filled';
  /** px: 16 · 20 · 24 (default) · 32. Rendered in rem, so it scales with text. */
  size?: 16 | 20 | 24 | 32;
  color?: string;
  /** Accessible name; omit for decorative icons. */
  label?: string;
  className?: string;
}
export declare function Icon(props: IconProps): any;

export interface SegmentedOption { value: string; label: string; }
export interface SegmentedControlProps {
  options: Array<SegmentedOption | string>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Accessible group name. */
  label?: string;
}
export declare function SegmentedControl(props: SegmentedControlProps): any;

export interface StepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  /** Carbon icon shown next to the value, e.g. "ticket". */
  icon?: string;
  label?: string;
}
export declare function Stepper(props: StepperProps): any;

export interface ProductCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  /** Body copy. */
  children?: any;
  /** Tag color family for the card ground: red (default), yellow, magenta, purple, blue, cyan, teal, green, warmgray, gray, coolgray. */
  tone?: string;
  open?: boolean;
  defaultOpen?: boolean;
  /** false = always open, no toggle. */
  collapsible?: boolean;
  onToggle?: (open: boolean) => void;
}
export declare function ProductCard(props: ProductCardProps): any;

export interface PaymentCardProps {
  /** pending (red) → activating (red digits, yellow chip) → enabled (green) → active (full number shown). */
  status?: 'pending' | 'activating' | 'enabled' | 'active';
  brand?: string;
  last4?: string;
  /** Full number, shown only when status = active. */
  number?: string;
  expiry?: string;
  onCopy?: () => void;
}
export declare function PaymentCard(props: PaymentCardProps): any;

export interface ProgressLineProps {
  status?: 'loading' | 'success';
  label?: string;
}
export declare function ProgressLine(props: ProgressLineProps): any;

export interface SwitchProps {
  /** The setting it controls. Use a Switch only in list rows (Apple HIG). */
  label?: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  /** Required when there is no visible label. */
  'aria-label'?: string;
}
export declare function Switch(props: SwitchProps): any;

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  /** Mixed state (dash) for a parent whose children are partly checked. */
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}
export declare function Checkbox(props: CheckboxProps): any;

export interface RadioGroupProps {
  /** Group legend. */
  label?: string;
  options: Array<{ value: string; label: string } | string>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  help?: string;
  disabled?: boolean;
  name?: string;
}
export declare function RadioGroup(props: RadioGroupProps): any;

export interface MenuOption { value: string; label: string; icon?: string; disabled?: boolean; role?: 'destructive'; onSelect?: () => void; }
export interface PopUpButtonProps {
  /** Introductory label that predicts the options (Apple HIG). */
  label?: string;
  /** Flat list of mutually exclusive options. Include "Personalizado…" if some need extra input. */
  options: Array<MenuOption | string>;
  value?: string;
  /** A useful default: the option most people want. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Explanatory text under the list. */
  help?: string;
  disabled?: boolean;
  id?: string;
}
export declare function PopUpButton(props: PopUpButtonProps): any;

export interface PullDownButtonProps {
  label?: string;
  icon?: string;
  'aria-label'?: string;
  /** Actions, not choices. role "destructive" paints the item red; put it last. */
  actions: Array<MenuOption | string>;
  onAction?: (value: string) => void;
  disabled?: boolean;
  id?: string;
}
export declare function PullDownButton(props: PullDownButtonProps): any;

export interface AlertAction {
  label: string;
  /** default = the likely choice (trailing / top); cancel = always titled "Cancelar" (leading / bottom), never default;
   *  destructive = only for a destructive action the person did not deliberately choose. */
  role?: 'default' | 'cancel' | 'destructive' | 'normal';
  onPress?: () => void;
}
export interface AlertProps {
  open: boolean;
  /** Says what happened, specific, at most two lines. Never just "Error". */
  title: string;
  /** Only if it adds value; complete sentences. */
  message?: string;
  /** Up to 3. Two go in a row; three stack. */
  actions: AlertAction[];
  /** Esc with no cancel action. */
  onDismiss?: () => void;
  /** Optional text field when input is needed to resolve the situation. */
  children?: any;
  stacked?: boolean;
  /** Render in place without overlay (documentation only). */
  inline?: boolean;
  id?: string;
}
export declare function Alert(props: AlertProps): any;

export interface TabItem { value: string; label: string; icon?: string; content?: any; }
export interface TabsProps {
  /** Related panes. Noun labels. At most 6 (Apple HIG); with more, choose the view with a PopUpButton. */
  tabs: Array<TabItem | string>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Accessible name of the tab list. */
  label?: string;
  /** Panel content when tabs carry no `content`. */
  children?: any;
  id?: string;
}
export declare function Tabs(props: TabsProps): any;

export interface NavItem {
  value: string;
  label: string;
  /** Carbon icon; shown filled when selected (if Carbon has a filled version). */
  icon: string;
  href?: string;
  /** Critical info only: a number, or true for "!" (Apple HIG). */
  badge?: number | boolean;
}
export interface TabBarProps {
  /** 3–5 top-level sections. Navigation only, never actions. Never hide or disable an item. */
  items: NavItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Fixed to the bottom of the viewport (respects the safe area). */
  fixed?: boolean;
  label?: string;
}
export declare function TabBar(props: TabBarProps): any;

export interface SidebarGroup { title?: string; items: NavItem[]; }
export interface SidebarProps {
  /** At most two levels: groups (collapsible) and their items (Apple HIG). */
  groups: SidebarGroup[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hidden?: boolean;
  /** Keep false: the sidebar should be discoverable. */
  defaultHidden?: boolean;
  onHiddenChange?: (hidden: boolean) => void;
  label?: string;
}
export declare function Sidebar(props: SidebarProps): any;

export interface ToolbarAction { label: string; icon?: string; text?: boolean; variant?: string; role?: string; onPress?: () => void; }
export interface ToolbarProps {
  /** Title of the current view. */
  title?: string;
  onBack?: () => void;
  backLabel?: string;
  /** A SearchField, if the view is searchable. */
  search?: any;
  /** A few frequent actions (plain icon buttons by default). */
  actions?: ToolbarAction[];
  /** Less important actions, in a More menu. */
  moreActions?: Array<MenuOption | string>;
  onMoreAction?: (value: string) => void;
  sticky?: boolean;
}
export declare function Toolbar(props: ToolbarProps): any;

export interface SearchFieldProps {
  /** Says what can be searched, e.g. "Buscar viajes, ciudades o terminales". */
  placeholder?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  /** Called on every keystroke: search as the person types. */
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  /** Recent or predictive suggestions (max 8 shown). */
  suggestions?: Array<string | { label: string; icon?: string }>;
  suggestionsTitle?: string;
  /** Scope bar: broad scope first. */
  scopes?: Array<SegmentedOption | string>;
  scope?: string;
  defaultScope?: string;
  onScopeChange?: (value: string) => void;
  /** Filter tokens shown inside the field. */
  tokens?: string[];
  onRemoveToken?: (token: string) => void;
  id?: string;
}
export declare function SearchField(props: SearchFieldProps): any;

export interface TooltipProps {
  /** What the control does, verb first, sentence case, ≤ 75 characters. Don't repeat the control's name. */
  text: string;
  /** One focusable element. */
  children: any;
  placement?: 'top' | 'bottom';
  /** Hover delay in ms (focus shows at once). Default 500. */
  delay?: number;
  id?: string;
}
export declare function Tooltip(props: TooltipProps): any;

export interface TipProps {
  /** Short, action-oriented. */
  title: string;
  /** One or two sentences. No promotion. */
  message?: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}
export declare function Tip(props: TipProps): any;

export interface TableColumn {
  key: string;
  /** Noun or short noun phrase, sentence case, no ending punctuation (Apple HIG). */
  label: string;
  sortable?: boolean;
  sortValue?: (row: any) => any;
  align?: 'start' | 'end';
  render?: (row: any) => any;
  /** Shorten long text in the middle to keep start and end readable. */
  maxChars?: number;
}
export interface TableProps {
  columns: TableColumn[];
  rows: any[];
  rowKey?: string;
  title?: string;
  description?: string;
  caption?: string;
  selectable?: boolean;
  selected?: any[];
  defaultSelected?: any[];
  onSelectionChange?: (ids: any[]) => void;
  defaultSort?: { key: string; dir: 'asc' | 'desc' } | null;
  onSortChange?: (sort: { key: string; dir: 'asc' | 'desc' } | null) => void;
  /** Rows that navigate: the first cell becomes a button and the current row stays highlighted. */
  onRowClick?: (row: any) => void;
  activeRow?: any;
  /** 44px rows instead of 56px. */
  dense?: boolean;
  loading?: boolean;
  emptyText?: string;
  /** Usually a Pagination, flush below the table (Carbon). */
  footer?: any;
  /** Level of the title heading, to fit the page outline. Default 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}
export declare function Table(props: TableProps): any;

export interface SliderProps {
  label?: string;
  /** Minimum on the leading side, maximum on the trailing side (Apple HIG). */
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Icons that illustrate the min and max meaning, e.g. "volume--mute" / "volume--up". */
  minIcon?: string;
  maxIcon?: string;
  /** Adds a numeric field for an exact value (Apple HIG). */
  showField?: boolean;
  format?: (value: number) => string;
  disabled?: boolean;
  id?: string;
}
export declare function Slider(props: SliderProps): any;

export interface ProgressBarProps {
  /** 0–1. Omit for indeterminate; switch to determinate as soon as you can (Apple HIG). */
  value?: number | null;
  label?: string;
  /** Precise context, e.g. "Subiendo 3 de 12 fotos". Avoid vague words like "Cargando". */
  description?: string;
  status?: 'error' | 'success';
}
export declare function ProgressBar(props: ProgressBarProps): any;

export interface ActivityIndicatorProps { size?: number; label?: string; }
export declare function ActivityIndicator(props: ActivityIndicatorProps): any;

export interface PageControlProps {
  /** Pages in a flat list, e.g. carousel slides. */
  count: number;
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  label?: string;
}
export declare function PageControl(props: PageControlProps): any;

export interface InlineNotificationProps {
  status?: 'error' | 'success' | 'warning' | 'info';
  /** inline (default) · toast (floating, via AlmaDS.toast) · callout (guidance before a task, not dismissible). */
  kind?: 'inline' | 'toast' | 'callout';
  title: string;
  message?: string;
  timestamp?: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onClose?: () => void;
}
export declare function InlineNotification(props: InlineNotificationProps): any;

export interface ToastOptions extends InlineNotificationProps {
  /** ms. success/info default 5000; error/warning never auto-dismiss. 0 = persist. */
  duration?: number;
}
/** Shows a toast in the ToastRegion; returns its id. toast.dismiss(id) closes it. */
export declare const toast: ((options: ToastOptions) => number) & { dismiss: (id: number) => void };
/** Mount once near the root of the app. */
export declare function ToastRegion(props?: { inline?: boolean }): any;

export interface PaginationProps {
  totalItems: number;
  pageSizes?: number[];
  pageSize?: number;
  defaultPageSize?: number;
  page?: number;
  defaultPage?: number;
  onChange?: (state: { page: number; pageSize: number }) => void;
  /** Noun for the range, e.g. "viajes". */
  itemLabel?: string;
  label?: string;
}
export declare function Pagination(props: PaginationProps): any;

export interface UploadFile { id?: string; name: string; status?: 'uploading' | 'complete' | 'error'; error?: string; }
export interface FileUploaderProps {
  /** One line. Default "Subir archivos". */
  title?: string;
  /** Size and format limits, e.g. "PDF o JPG, hasta 5 MB". */
  description?: string;
  /** Button label. Default "Agregar archivos". */
  buttonLabel?: string;
  /** tinted by default so it doesn't compete with the view's primary action. */
  buttonVariant?: string;
  dropZone?: boolean;
  dropLabel?: string;
  multiple?: boolean;
  accept?: string;
  files?: UploadFile[];
  onAdd?: (files: File[]) => void;
  onRemove?: (file: UploadFile) => void;
  disabled?: boolean;
  id?: string;
}
export declare function FileUploader(props: FileUploaderProps): any;

export interface SkeletonProps {
  shape?: 'text' | 'block' | 'circle';
  lines?: number;
  width?: string | number;
  height?: string | number;
  label?: string;
}
export declare function Skeleton(props: SkeletonProps): any;

export interface LinkProps { href?: string; children?: any; external?: boolean; standalone?: boolean; current?: boolean; target?: string; rel?: string; onClick?: (e: MouseEvent) => void; className?: string; }
export declare function Link(props: LinkProps): any;

export type TagColor = 'red' | 'yellow' | 'magenta' | 'purple' | 'blue' | 'cyan' | 'teal' | 'green' | 'warmgray' | 'gray' | 'coolgray';
export interface TagProps {
  children?: any;
  /** Default "gray". The word informs; the color only groups. */
  color?: TagColor;
  /** sm = 24px (inside fields) · default 32px. */
  size?: 'sm';
  icon?: AlmaIconName;
  /** Dismissible tag: shows a "Quitar …" button. */
  onRemove?: (e: MouseEvent) => void;
  /** Accessible name for the remove button when children is not a string. */
  removeLabel?: string;
  /** Selectable filter tag (aria-pressed). */
  onClick?: (e: MouseEvent) => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}
export declare function Tag(props: TagProps): any;

export interface TextareaProps { label: string; value?: string; defaultValue?: string; onChange?: (value: string, e: Event) => void; placeholder?: string; helper?: string; error?: string | boolean; maxLength?: number; rows?: number; required?: boolean; disabled?: boolean; readOnly?: boolean; name?: string; id?: string; }
export declare function Textarea(props: TextareaProps): any;

export interface CardProps {
  title: any;
  eyebrow?: string;
  subtitle?: string;
  children?: any;
  media?: { src: string; alt?: string; ratio?: string; width?: number; height?: number };
  /** The whole card becomes one link (carried by the title). */
  href?: string;
  onClick?: (e: MouseEvent) => void;
  /** Buttons that sit above the card link. */
  actions?: any;
  /** Default 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  className?: string;
  id?: string;
}
export declare function Card(props: CardProps): any;

export interface ListItem { id?: string; title: any; subtitle?: string; icon?: AlmaIconName; trailing?: any; href?: string; onClick?: (e: MouseEvent) => void; chevron?: boolean; }
export interface ListProps { header?: string; footer?: string; items: ListItem[]; headingLevel?: 2 | 3 | 4 | 5 | 6; 'aria-label'?: string; id?: string; }
export declare function List(props: ListProps): any;

export interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: AlmaIconName;
  action?: { label: string; icon?: AlmaIconName; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  headingLevel?: 2 | 3 | 4;
  className?: string;
}
export declare function EmptyState(props: EmptyStateProps): any;

export interface BreadcrumbItem { label: string; href?: string; onClick?: (e: MouseEvent) => void; }
export interface BreadcrumbProps {
  /** From the top level to the current page; the last one is the current page (text, aria-current). */
  items: BreadcrumbItem[];
  /** Default 4; longer trails fold the middle levels into a menu. */
  maxItems?: number;
  /** nav name. Default "Ruta de navegación". */
  label?: string;
}
export declare function Breadcrumb(props: BreadcrumbProps): any;

export interface AccordionItem { id?: string; title: any; content: any; disabled?: boolean; }
export interface AccordionProps { items: AccordionItem[]; defaultOpen?: string[]; allowMultiple?: boolean; onChange?: (open: string[]) => void; headingLevel?: 2 | 3 | 4 | 5 | 6; id?: string; }
export declare function Accordion(props: AccordionProps): any;

export interface ProgressStep { label: string; description?: string; error?: boolean; }
export interface ProgressIndicatorProps { steps: ProgressStep[]; current: number; onSelect?: (index: number) => void; vertical?: boolean; label?: string; }
export declare function ProgressIndicator(props: ProgressIndicatorProps): any;

export interface PopoverProps {
  /** The trigger: one element (usually a Button). Receives aria-expanded, aria-controls and aria-haspopup. */
  children: any;
  title?: string;
  content: any;
  placement?: 'bottom' | 'top';
  align?: 'start' | 'end';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  'aria-label'?: string;
  id?: string;
}
export declare function Popover(props: PopoverProps): any;

export interface ModalAction { label: string; onClick?: () => void; destructive?: boolean; disabled?: boolean; loading?: boolean; loadingLabel?: string; }
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  eyebrow?: string;
  description?: string;
  children?: any;
  primaryAction?: ModalAction;
  secondaryAction?: { label: string; onClick?: () => void };
  /** sm 400px · md 560px (default) · lg 768px. */
  size?: 'sm' | 'md' | 'lg';
  /** false = no close button and no Esc. */
  dismissible?: boolean;
  /** Close on outside click. Default: true without primaryAction, false with it. */
  closeOnOverlay?: boolean;
  /** Selector of the element to focus first. */
  initialFocus?: string;
  variant?: 'dialog' | 'sheet';
  id?: string;
}
export declare function Modal(props: ModalProps): any;
/** Modal that rises from the bottom on phones and centers from bp-md. */
export declare function Sheet(props: Omit<ModalProps, 'variant'>): any;

export interface ComboboxProps {
  label: string;
  options: Array<string | { value?: any; label: string; disabled?: boolean }>;
  multiple?: boolean;
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  helper?: string;
  error?: string | boolean;
  emptyText?: string;
  tagColor?: TagColor;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
}
export declare function Combobox(props: ComboboxProps): any;

export interface DatePickerProps {
  label: string;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  min?: Date;
  max?: Date;
  helper?: string;
  error?: string | boolean;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
}
export declare function DatePicker(props: DatePickerProps): any;

export interface TimePickerProps { label: string; value?: string; defaultValue?: string; onChange?: (value: string) => void; helper?: string; error?: string | boolean; required?: boolean; disabled?: boolean; name?: string; id?: string; }
/** 24-hour time; returns "HH:MM". */
export declare function TimePicker(props: TimePickerProps): any;
