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

interface County {
  id: number;
  name: string;
}

interface SubCounty {
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
