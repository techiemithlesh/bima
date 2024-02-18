import React, { Children } from 'react';

import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import { Helmet } from 'react-helmet';
import BreadCrumb from './BreadCrumb';
import './Layout.css';

function Layout({
  children,
  title,
  description,
  keywords,
  author,
  breadcrumbData
}) {
  
  const dynamicBreadcrumbData = typeof breadcrumbData === 'function'
    ? breadcrumbData()
    : breadcrumbData;
  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <meta charSet='utf-8'/>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
      
        <Header />
        <BreadCrumb {...dynamicBreadcrumbData} />
        <div className="flex flex-row my-2">
            
          <Sidebar />
          <main className="flex-grow" style={{ minHeight: '90vh' }}>{children}</main>
        </div>
        <Footer />
      
    </div>
  );
}

Layout.defaultProps = {
  title: "Bima Insurance",
  description: "",
  keywords: "",
  author: "",
  dynamicBreadcrumbData: {}
}

export default Layout;