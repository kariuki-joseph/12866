import { StringifiableRecord } from "query-string";

export interface PaginatedResponse<T> {
  data: {
    count: number;
    next: string;
    previous: string;
    results: T[];
  };
}

export interface AxiosResponse<T> {
  data: T;
}

export interface County {
  id: number;
  name: string;
}

export interface Ward {
  id: number;
  name: string;
}

export interface SubCounty {
  id: number;
  name: string;
  county: County;
}

interface SchoolOwnerPaymentMethods {
  id: number;
  title: string;
  phone_number: string;
}

interface Owner {
  id: number;
  name: string;
}

export interface InstitutionLevel {
  id: number;
  name: string;
}
export interface School {
  id: number;
  job_post_count: number;
  name: string;
  image: string;
  ward: StringifiableRecord;
  phone_number: string;
  primary_email: string;
  institution_level: InstitutionLevel[];
  accommodation: string;
  gender: string;
  web_site: string;
  about: string;
  formated_address: string;
  is_suspended: boolean;
  county: County | null;
  sub_county: SubCounty | null;
  school_owner_payment_methods: SchoolOwnerPaymentMethods[];
  owner: Owner;
  creation_time: string;
}

interface Qualification {
  id: number;
  name: string;
}
interface User {
  id: number;
  password: string;
  last_login: null;
  image: string;
  email: string;
  phone_number: string;
}
export interface Teacher {
  id: string;
  full_name: string;
  image: string;
  experience: number;
  institution_level: InstitutionLevel;
  latitude: string;
  longitude: string;
  formated_address: string;
  creation_time: string;
  last_updated_time: string;
  job_view_count: number;
  is_active: number;
  has_active_profile_post: number;
  county: County;
  sub_county: SubCounty;
  qualifications: Qualification[];
  user: User;
}

export interface TeacherRequirement {
  id: number;
  name: string;
}

export interface PaymentRate {
  id: number;
  days: number;
  charges: number;
  creation_time: string;
}
export interface ViewPaymentRate {
  id: number;
  charge: number;
}

export interface Job {
  id: number;
  title: string;
  duties_and_responsibilities: string;
  minimum_requirements: string;
  institution_level: InstitutionLevel;
  status: string;
  views: number;
  additional_requirements: string;
  how_to_apply: string;
  deadline: string;
  about: string;
  creation_time: string;
  expiry_time: string;
  school: School;
  teacher_requirements: TeacherRequirement[];
  payment_rate: PaymentRate;
  owner: Owner;
}

export interface Image {
  id: number;
  image: string;
  is_sensored: boolean;
  creation_time: string;
}

export interface Subject {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}

export interface JobViews {
  id: number;
}

export interface Payment {
  id: number;
  transaction_id: number;
  checkout_request_id: string;
  payment_status: string;
  payment_method: string;
  amount: 1.0;
  purpose: string;
  checked_out: boolean;
  creation_time: string;
  owner: User;
  rate: PaymentRate;
  job: Job;
}

export interface TeacherProfilePayment {
  id: number;
  views: number;
  creation_time: string;
  is_active: boolean;
  teacher: Teacher;
  payment: Payment;
}

export interface TeacherSave {
  id: number;
  creation_time: string;
  last_updated_time: string;
  owner: Owner;
  teacher_profile: TeacherProfilePayment;
}

export interface TeacherView {
  id: number;
  creation_time: string;
  last_updated_time: string;
  is_active: boolean;
  expiry_time: string;
  teacher: Teacher;
}

export interface JobView {
  teacher_profile: Teacher;
  created_at: string;
}
