import React from "react";

export interface OrganizationJsonLdProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  address?: string;
  email?: string;
  phone?: string;
}

export function OrganizationJsonLd({
  name,
  url,
  logo = "/logo.PNG",
  description,
  sameAs = [],
  address,
  email,
  phone,
}: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${url}#organization`,
    name,
    url,
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    image: logo,
    description,
    priceRange: "$$$$",
    address: address
      ? {
          "@type": "PostalAddress",
          streetAddress: address,
        }
      : undefined,
    contactPoint: email || phone
      ? {
          "@type": "ContactPoint",
          email,
          telephone: phone,
          contactType: "customer service",
        }
      : undefined,
    sameAs: sameAs.filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface WebSiteJsonLdProps {
  name: string;
  url: string;
  description?: string;
}

export function WebSiteJsonLd({ name, url, description }: WebSiteJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    url,
    name,
    description,
    publisher: {
      "@id": `${url}#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface ArticleJsonLdProps {
  url: string;
  title: string;
  description: string;
  images: string[];
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName: string;
  publisherLogo?: string;
}

export function ArticleJsonLd({
  url,
  title,
  description,
  images,
  datePublished,
  dateModified,
  authorName,
  publisherName,
  publisherLogo = "/logo.PNG",
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description,
    image: images,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface CreativeWorkJsonLdProps {
  url: string;
  name: string;
  description: string;
  image: string;
  category?: string;
  authorName?: string;
}

export function CreativeWorkJsonLd({
  url,
  name,
  description,
  image,
  category = "Software Application",
  authorName = "DIGITAL THREE",
}: CreativeWorkJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image,
    applicationCategory: category,
    operatingSystem: "Web, iOS, Android, Cloud",
    author: {
      "@type": "Organization",
      name: authorName,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
