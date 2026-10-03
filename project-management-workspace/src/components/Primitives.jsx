import styled from 'styled-components';

export const IconButton = styled.button`
  width: 38px;
  height: 38px;
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 10px;
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
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 15px;
  border: 1px solid
    ${({ $secondary, theme }) => ($secondary ? theme.colors.line : theme.colors.accent)};
  border-radius: 10px;
  background: ${({ $secondary, theme }) => ($secondary ? theme.colors.surface : theme.colors.accent)};
  color: ${({ $secondary, theme }) => ($secondary ? theme.colors.ink : '#ffffff')};
  font-weight: 650;
  cursor: pointer;
  transition:
    background 140ms ease,
    transform 140ms ease;
  &:hover {
    background: ${({ $secondary, theme }) => ($secondary ? theme.colors.surfaceMuted : theme.colors.accentHover)};
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
  width: ${({ $small }) => ($small ? '29px' : '36px')};
  height: ${({ $small }) => ($small ? '29px' : '36px')};
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  border-radius: 50%;
  background: ${({ $color, theme }) => theme.colors[$color] || theme.colors.accent};
  color: white;
  font-size: ${({ $small }) => ($small ? '9px' : '10px')};
  font-weight: 750;
`;

export const Field = styled.input`
  width: 100%;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  &::placeholder {
    color: ${({ theme }) => theme.colors.inkFaint};
  }
`;
