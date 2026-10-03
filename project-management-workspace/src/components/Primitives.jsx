import styled from 'styled-components';
import { avatarVariants, buttonVariants } from '../theme.js';

export const IconButton = styled.button`
  width: ${({ $size, theme }) => theme.sizes.control[$size] || theme.sizes.control.icon};
  height: ${({ $size, theme }) => theme.sizes.control[$size] || theme.sizes.control.icon};
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.sizes.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.inkMuted};
  cursor: pointer;
  transition:
    color 140ms ease,
    background 140ms ease,
    border-color 140ms ease;
  &:hover {
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.surfaceMuted};
    border-color: ${({ theme }) => theme.colors.lineStrong};
  }
`;

export const ActionButton = styled.button`
  min-height: ${({ $size, theme }) =>
    $size === 'compact' ? theme.sizes.control.compact : theme.sizes.control.default};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.sizes.space[2]};
  padding: 0 ${({ theme }) => theme.sizes.space[4]};
  border: 1px solid
    ${({ $variant = 'primary', theme }) => theme.colors[buttonVariants[$variant].border]};
  border-radius: ${({ theme }) => theme.sizes.radius.lg};
  background: ${({ $variant = 'primary', theme }) => theme.colors[buttonVariants[$variant].background]};
  color: ${({ $variant = 'primary', theme }) => theme.colors[buttonVariants[$variant].foreground]};
  font-weight: 650;
  cursor: pointer;
  transition:
    background 140ms ease,
    transform 140ms ease;
  &:hover {
    background: ${({ $variant = 'primary', theme }) =>
      theme.colors[buttonVariants[$variant].hoverBackground]};
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const Eyebrow = styled.span`
  color: ${({ theme }) => theme.colors.inkFaint};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Avatar = styled.span`
  width: ${({ $small, theme }) => ($small ? theme.sizes.avatar.small : theme.sizes.avatar.default)};
  height: ${({ $small, theme }) => ($small ? theme.sizes.avatar.small : theme.sizes.avatar.default)};
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  border-radius: 50%;
  background: ${({ $color = 'accent', theme }) => theme.colors[avatarVariants[$color] || 'accent']};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: ${({ $small }) => ($small ? '9px' : '10px')};
  font-weight: 750;
`;

export const Field = styled.input`
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.control.field};
  padding: 0 ${({ theme }) => theme.sizes.space[3]};
  border-radius: ${({ theme }) => theme.sizes.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  &::placeholder {
    color: ${({ theme }) => theme.colors.inkFaint};
  }
`;
