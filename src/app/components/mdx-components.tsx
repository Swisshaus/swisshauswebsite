'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyInfo from './PropertyInfo';

// Define custom components with proper typing
interface MDXComponentProps {
  [key: string]: any;
}

export const mdxComponents = {
  PropertyInfo,
  h1: ({ children, ...props }: MDXComponentProps) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: MDXComponentProps) => (
    <h2 className="text-3xl font-bold mt-6 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: MDXComponentProps) => (
    <h3 className="text-2xl font-bold mt-5 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: MDXComponentProps) => (
    <p className="my-4" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: MDXComponentProps & { href?: string }) => 
    href?.startsWith('/') || href?.startsWith('#') ? (
      <Link href={href} className="text-blue-600 hover:underline" {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" {...props}>
        {children}
      </a>
    ),
  ul: ({ children, ...props }: MDXComponentProps) => (
    <ul className="list-disc ml-6 my-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: MDXComponentProps) => (
    <ol className="list-decimal ml-6 my-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: MDXComponentProps) => (
    <li className="my-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: MDXComponentProps) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: MDXComponentProps) => (
    <code className="bg-gray-100 rounded p-1 font-mono text-sm" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: MDXComponentProps) => (
    <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4" {...props}>
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }: MDXComponentProps & { src?: string, alt?: string }) => (
    <img
      src={src}
      alt={alt || ''}
      className="rounded-md shadow-md my-4 max-w-full"
      {...props}
    />
  ),
  table: ({ children, ...props }: MDXComponentProps) => (
    <table className="w-full text-left my-4 border-collapse" {...props}>
      {children}
    </table>
  ),
  thead: ({ children, ...props }: MDXComponentProps) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: MDXComponentProps) => (
    <th className="p-2 border border-gray-300 font-bold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: MDXComponentProps) => (
    <td className="p-2 border border-gray-300" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }: MDXComponentProps) => (
    <tr {...props}>
      {children}
    </tr>
  ),
  hr: (props: MDXComponentProps) => (
    <hr className="my-6 border-t border-gray-300" {...props} />
  ),
};