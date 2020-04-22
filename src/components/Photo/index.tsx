import React, { PropsWithChildren } from 'react';
import Avatar from 'antd/es/avatar';
import 'antd/es/avatar/style/index.less';

interface AvatarProp {
  size?: number | 'large' | 'small' | 'default'
}

export function Photo({ size = 'default' }: PropsWithChildren<AvatarProp>) {
  return (
    <Avatar size={size} src='/me.png' />
  )
}