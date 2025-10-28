export interface JobListProps {
  id?: number;
  slug: string;
  title: string;
  status: string;
  salary_range: SalaryRange;
  job_description: string;
  list_card: ListCard;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  display_text: string;
}

export interface ListCard {
  badge: string;
  started_on_text: string;
  cta: string;
}
