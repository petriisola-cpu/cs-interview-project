// Description: Type definitions for the Contentstack API

// PublishDetails object - Represents the details of publish functionality 
export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

// File object - Represents a file in Contentstack
export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[] | object;
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  _metadata?: object;
  publish_details: PublishDetails;
  author?: string;
  //logo?: File | null;
  $: any;
}

// Link object - Represents a hyperlink in Contentstack
export interface Link {
  title: string;
  href: string;
}

// Taxonomy object - Represents a taxonomy in Contentstack
export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

// Block object - Represents a modular block in Contentstack
export interface Block {
  _version?: number;
  _metadata: any;
  $: any;
  title?: string;
  copy?: string;
  image?: File | null;
  layout?: ("image_left" | "image_right") | null;
}

export interface Blocks {
  block: Block;
}

// NavigationItem object - Represents a navigation menu item
export interface NavigationItem {
  title: string;
  url: string;
  _metadata?: any;
  $?: any;
}

// Header object - Represents the global page header
export interface Header {
  uid: string;
  title: string;
  logo?: File | null;
  navigation_menu?: NavigationItem[];
  _version?: number;
  _metadata?: any;
  announcement_text?: string;
  $?: any;
}

// Page object - Represents a page in Contentstack
export interface Page {
  uid: string;
  $: any;
  _version?: number;
  title: string;
  url?: string;
  logo?: File | null;
  description?: string;
  image?: File | null;
  cloudinary?: File | null;
  rich_text?: string;
  json_rte?: any;
  blocks?: Blocks[];
  author?: string;
}