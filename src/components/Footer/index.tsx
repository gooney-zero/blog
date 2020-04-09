import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons'
import './index.less';

export default function Footer() {
  return (
    <footer className="blog-footer">
      <CopyrightOutlined /> {new Date().getFullYear()} 5guang Inc. All rights reserved.
    </footer>
  )
}


