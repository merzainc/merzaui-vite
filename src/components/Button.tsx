import type { ReactElement } from 'react';
import React, { cloneElement, ForwardedRef, forwardRef } from 'react';

import {
  ButtonBase,
  ButtonBaseProps,
  mergeClasses,
  titleCase,
} from '@merzaui/react';
import { LinkBase, LinkBaseProps } from './Link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonTheme =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'danger'
  | 'danger-outline'
  | 'success';

export type ButtonProps = ButtonBaseProps &
  LinkBaseProps & {
    size?: ButtonSize;
    variant?: ButtonTheme;
    prefix?: ReactElement;
    suffix?: ReactElement;
    skipCapitalization?: boolean;
  };

function getSizeClasses(size: ButtonSize) {
  switch (size) {
    case 'xs':
      return 'h-8 px-3 text-xs';
    case 'sm':
      return 'h-9 px-4 text-sm';
    case 'md':
      return 'h-10 px-4 text-sm';
    case 'lg':
      return 'h-11 px-6 text-base';
    case 'xl':
      return 'h-12 px-6 text-base';
    case '2xl':
      return 'h-15 px-6 text-lg';
  }
}

function getThemeClasses(theme: ButtonTheme, disabled = false) {
  switch (theme) {
    case 'primary':
      return mergeClasses(
        'border-button-primary bg-button-primary text-button-primary shadow-xs',
        !disabled && 'hocus:bg-button-primary-hover active:scale-98',
        disabled &&
          'bg-button-primary-disabled border-button-primary-disabled text-button-primary-disabled'
      );
    case 'danger':
      return mergeClasses(
        'border-button-danger bg-button-danger bg-button-danger text-button-danger shadow-xs',
        !disabled && 'hocus:bg-button-danger-hover active:scale-98',
        disabled &&
          'bg-button-danger-disabled border-button-danger-disabled text-button-danger-disabled'
      );
    case 'secondary':
      return mergeClasses(
        'border-button-secondary bg-button-secondary text-button-secondary shadow-xs',
        !disabled && 'hocus:bg-button-secondary-hover active:scale-98',
        disabled &&
          'bg-button-secondary-disabled border-button-secondary-disabled text-button-secondary-disabled'
      );
    case 'danger-outline':
      return mergeClasses(
        'border-button-secondary-danger bg-button-secondary-danger text-button-secondary-danger shadow-xs',
        !disabled && 'hocus:bg-button-secondary-danger-hover active:scale-98',
        disabled &&
          'bg-button-secondary-danger-disabled border-button-secondary-danger-disabled text-button-secondary-danger-disabled'
      );
    case 'tertiary':
      return mergeClasses(
        'border-button-tertiary bg-button-tertiary text-button-tertiary shadow-none',
        !disabled && 'hocus:bg-button-tertiary-hover active:scale-98',
        disabled &&
          'bg-button-tertiary-disabled border-button-tertiary-disabled text-button-tertiary-disabled'
      );
    case 'quaternary':
      return mergeClasses(
        'border-button-quaternary bg-button-quaternary text-button-quaternary shadow-none',
        !disabled && 'hocus:bg-button-quaternary-hover active:scale-98',
        disabled &&
          'bg-button-quaternary-disabled border-button-quaternary-disabled text-button-quaternary-disabled'
      );
    case 'success':
      return mergeClasses(
        'border border-palette-green10 bg-palette-green10  text-white shadow-none',
        !disabled && 'hocus:bg-palette-green9 active:scale-98',
        disabled && 'bg-palette-green7 border border-palette-green7 text-white'
      );
  }
}

function getIconSizeClasses(size: ButtonSize) {
  switch (size) {
    case 'xs':
      return 'icon-xs';
    case 'sm':
      return 'icon-sm';
    case 'md':
      return 'icon-md';
    case 'lg':
      return 'icon-md';
    case 'xl':
      return 'icon-lg';
    case '2xl':
      return 'icon-lg';
  }
}

function getThemedIconClasses(theme: ButtonTheme) {
  switch (theme) {
    case 'primary':
      return 'text-button-primary-icon';
    case 'danger':
      return 'text-button-danger-icon';
    case 'secondary':
      return 'text-button-secondary-icon';
    case 'danger-outline':
      return 'text-button-secondary-danger-icon';
    case 'tertiary':
      return 'text-button-tertiary-icon';
    case 'quaternary':
      return 'text-button-quaternary-icon';
  }
}

function getButtonIconClasses(size: ButtonSize) {
  switch (size) {
    case 'xs':
      return 'px-0 w-8 justify-center items-center';
    case 'sm':
      return 'px-0 w-9 justify-center items-center';
    case 'md':
      return 'px-0 w-10 justify-center items-center';
    case 'lg':
      return 'px-0 w-11 justify-center items-center';
    case 'xl':
      return 'px-0 w-12 justify-center items-center';
    case '2xl':
      return 'px-0 w-15 justify-center items-center';
  }
}

function isIconElement(element: ReactElement) {
  if (React.isValidElement(element)) {
    // @ts-expect-error React Portal did not have `displayName` prop, but it is a valid element
    return element.type?.displayName?.endsWith('Icon') ?? false;
  }
  return false;
}

function getIconProps(element: ReactElement, classNames: string) {
  return {
    ...element.props,
    className: mergeClasses(classNames, element.props.className),
  };
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      children,
      size = 'sm',
      variant = 'primary',
      skipCapitalization = false,
      href,
      disabled,
      className,
      prefix,
      suffix,
      openInNewTab,
      ...rest
    },
    ref
  ) => {
    const isPrefixIcon = prefix && isIconElement(prefix);
    const isSuffixIcon = suffix && isIconElement(suffix);
    const iconClasses =
      (isPrefixIcon || isSuffixIcon) &&
      mergeClasses(
        getIconSizeClasses(size),
        getThemedIconClasses(variant),
        disabled && 'opacity-60'
      );
    const isSingleIconButton = (prefix || suffix) && !children;

    const twClasses = mergeClasses(
      `inline-flex border border-solid rounded-md font-medium gap-2 items-center whitespace-nowrap transition`,
      getSizeClasses(size),
      getThemeClasses(variant, disabled),
      isSingleIconButton && getButtonIconClasses(size),
      disabled && 'cursor-default opacity-80 pointer-event-none',
      className
    );

    const content = (
      <>
        {isPrefixIcon
          ? cloneElement(prefix, getIconProps(prefix, iconClasses))
          : prefix}
        {children && (
          <span
            className={mergeClasses(
              'flex self-center text-inherit leading-none',
              href && 'select-none'
            )}
          >
            {typeof children === 'string' && !skipCapitalization
              ? titleCase(children)
              : children}
          </span>
        )}
        {isSuffixIcon
          ? cloneElement(suffix, getIconProps(suffix, iconClasses))
          : suffix}
      </>
    );

    if (href) {
      return (
        <LinkBase
          href={href}
          className={twClasses}
          disabled={disabled}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          openInNewTab={openInNewTab}
          {...rest}
        >
          {content}
        </LinkBase>
      );
    } else {
      return (
        <ButtonBase
          className={twClasses}
          disabled={disabled}
          ref={ref as ForwardedRef<HTMLButtonElement>}
          {...rest}
        >
          {content}
        </ButtonBase>
      );
    }
  }
);

Button.displayName = 'Button';
