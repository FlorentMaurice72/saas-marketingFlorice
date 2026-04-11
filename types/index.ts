// ─── Campaign Types ────────────────────────────────────────────────────────────

export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "paused"
  | "completed"
  | "archived";

export type CampaignType = "email" | "sms" | "push" | "social";

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  audienceId?: string;
  subject?: string;
  content?: string;
  scheduledAt?: Date;
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  stats?: CampaignStats;
}

export interface CampaignStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  unsubscribed: number;
  bounced: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
}

// ─── Audience Types ────────────────────────────────────────────────────────────

export type AudienceStatus = "active" | "archived";

export type FilterOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "not_contains"
  | "greater_than"
  | "less_than"
  | "is_set"
  | "is_not_set";

export interface AudienceFilter {
  field: string;
  operator: FilterOperator;
  value?: string | number | boolean;
}

export interface Audience {
  id: string;
  name: string;
  description?: string;
  status: AudienceStatus;
  contactCount: number;
  filters?: AudienceFilter[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Contact Types ─────────────────────────────────────────────────────────────

export interface Contact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Automation Types ──────────────────────────────────────────────────────────

export type TriggerType =
  | "contact_created"
  | "contact_tag_added"
  | "campaign_opened"
  | "campaign_clicked"
  | "form_submitted"
  | "date_trigger";

export interface Automation {
  id: string;
  name: string;
  status: "active" | "inactive" | "draft";
  trigger: TriggerType;
  steps: AutomationStep[];
  createdAt: Date;
  updatedAt: Date;
}

export type StepType = "send_email" | "send_sms" | "wait" | "condition" | "add_tag" | "remove_tag";

export interface AutomationStep {
  id: string;
  type: StepType;
  order: number;
  config: Record<string, unknown>;
}

// ─── User / Auth Types ─────────────────────────────────────────────────────────

export type UserRole = "owner" | "admin" | "member";
export type PlanType = "free" | "starter" | "pro" | "enterprise";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  plan: PlanType;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: PlanType;
  ownerId: string;
  createdAt: Date;
}

// ─── API Response Types ────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ─── Navigation Types ──────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
}
