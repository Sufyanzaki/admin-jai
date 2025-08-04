// components/Breadcrumbs.tsx
"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/client/ux/breadcrumb";

type Crumb = {
  label: string;
  href?: string; // if not provided, it’s the current page
};

interface Props {
  items: Crumb[];
}

export default function CustomBreadcrumbs({ items }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="font-semibold text-sm lg:text-lg">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <p key={index}>
            {item.href ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbLink href={item.href} className="font-semibold text-sm lg:text-lg">
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbPage className="text-gray-600 text-sm lg:text-lg">
                    {item.label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </p>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
