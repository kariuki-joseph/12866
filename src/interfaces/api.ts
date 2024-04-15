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
export interface School {
  id: number;
  job_post_count: number;
  name: string;
  image: string;
  ward: string;
  phone_number: string;
  primary_email: string;
  institution_level: string;
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
  institution_level: string;
  latitude: string;
  longitude: string;
  formated_address: string;
  creation_time: string;
  last_updated_time: string;
  county: County;
  sub_county: SubCounty;
  qualifications: Qualification[];
  user: User;
}

interface TeacherRequirement {
  id: number;
  name: string;
}

interface PaymentRate {
  id: number;
  days: number;
  charges: number;
  creation_time: string;
}

export interface Job {
  id: number;
  title: string;
  duties_and_responsibilities: string;
  minimum_requirements: string;
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
