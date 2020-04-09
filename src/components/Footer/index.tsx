import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons'
import './index.less';

export function BlogFooter() {
  return (
    <footer className="blog-footer">
      <CopyrightOutlined /> {new Date().getFullYear()} 5guang Inc. All rights reserved.
    </footer>
  )
}


