import { forwardRef } from 'react';

import { mergeClasses } from '@merzaui/react';
import { LinkBase, LinkBaseProps } from './LinkBase';

export const Link = forwardRef<HTMLAnchorElement, LinkBaseProps>(
  ({ className, disabled, ...rest }, ref) => {
    return (
      <LinkBase
        className={mergeClasses(
          'text-link transition-opacity',
          !disabled && 'hocus:opacity-80',
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);

Link.displayName = 'Link';
