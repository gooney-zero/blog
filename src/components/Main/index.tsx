import React, { PropsWithChildren } from "react";
import { BlogHeader } from 'src/components/Header';
import { BlogFooter } from 'src/components/Footer';
import './index.less';

export default function BlogMain({ children }: PropsWithChildren<{}>) {

  return (
    <div className="main">
      <BlogHeader />
      <main className="main-wrap">
        {children}
      </main>
      <BlogFooter />
    </div>

  )
}