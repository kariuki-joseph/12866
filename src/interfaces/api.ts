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
  phone_number: string;
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
  county: County;
  sub_county: SubCounty;
  school_owner_payment_methods: SchoolOwnerPaymentMethods[];
  creation_time: string;
}

interface Qualification {
  id: number;
  name: string;
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
}
